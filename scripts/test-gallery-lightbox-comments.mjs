import { chromium } from 'playwright'
import assert from 'node:assert/strict'

const baseURL = process.env.GALLERY_BASE_URL || 'http://127.0.0.1:4321'
const pageURL = new URL('/gallery/', baseURL).toString()

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()
const networkRequests = []
const consoleMessages = []

page.on('request', (request) => {
  networkRequests.push({
    url: request.url(),
    resourceType: request.resourceType(),
    method: request.method(),
  })
})

page.on('console', (message) => {
  consoleMessages.push({
    type: message.type(),
    text: message.text(),
  })
})

try {
  await page.goto(pageURL, { waitUntil: 'networkidle' })

  const firstCard = page.locator('[data-gallery-trigger]').first()
  await firstCard.click()

  const lightbox = page.locator('[data-gallery-lightbox]')
  await lightbox.waitFor({ state: 'visible' })

  const lightboxComments = page.locator('[data-gallery-lightbox-comments]').first()

  await page.waitForFunction(() => {
    const comments = document.querySelector('[data-gallery-lightbox-comments]')
    if (!(comments instanceof HTMLElement)) {
      return false
    }

    return !!comments.querySelector('iframe.giscus-frame, .giscus iframe')
  }, undefined, { timeout: 5000 })

  const renderedCommentNodeCount = await lightboxComments.locator('iframe.giscus-frame, .giscus iframe').count()
  assert.ok(renderedCommentNodeCount > 0, 'lightbox should initialize and render Giscus inside the fixed lightbox comment area after opening')

  const initialVisibleThreadKey = await firstCard.getAttribute('data-gallery-comment-key')
  const initialFrameSrc = await lightboxComments.locator('iframe.giscus-frame').first().getAttribute('src')
  const initialFrameTerm = initialFrameSrc ? new URL(initialFrameSrc).searchParams.get('term') : null

  assert.ok(initialVisibleThreadKey, 'lightbox should expose the initial visible comment thread key after opening')
  assert.equal(initialFrameTerm, initialVisibleThreadKey, 'initial Giscus iframe src term should match the initially visible comment thread key')

  const requestCountBeforeNavigation = networkRequests.length
  await page.locator('[data-gallery-lightbox-next]').click()

  const staleFrameVisibleAfterNavigation = await page.evaluate((previousTerm) => {
    const iframe = document.querySelector('[data-gallery-lightbox-comments] iframe.giscus-frame')
    if (!(iframe instanceof HTMLIFrameElement) || !iframe.src) {
      return false
    }

    return new URL(iframe.src).searchParams.get('term') === previousTerm
  }, initialVisibleThreadKey)

  assert.equal(
    staleFrameVisibleAfterNavigation,
    false,
    'lightbox should not keep showing the previous gallery item comment thread immediately after navigation begins',
  )

  await page.waitForFunction(() => {
    const comments = document.querySelector('[data-gallery-lightbox-comments]')
    if (!(comments instanceof HTMLElement)) {
      return false
    }

    return !!comments.querySelector('iframe.giscus-frame, .giscus iframe')
  }, undefined, { timeout: 5000 })

  const nextRenderedCommentNodeCount = await lightboxComments.locator('iframe.giscus-frame, .giscus iframe').count()
  assert.ok(nextRenderedCommentNodeCount > 0, 'lightbox should keep rendering Giscus inside the fixed lightbox comment area after navigation')

  const nextVisibleThreadKey = await page.locator('[data-gallery-trigger]').nth(1).getAttribute('data-gallery-comment-key')

  assert.ok(nextVisibleThreadKey, 'lightbox should expose the next visible comment thread key after navigation')
  assert.notEqual(nextVisibleThreadKey, initialVisibleThreadKey, 'lightbox should switch the visible comment thread key after navigation')

  await page.waitForFunction((expectedTerm) => {
    const iframe = document.querySelector('[data-gallery-lightbox-comments] iframe.giscus-frame')
    if (!(iframe instanceof HTMLIFrameElement) || !iframe.src) {
      return false
    }

    return new URL(iframe.src).searchParams.get('term') === expectedTerm
  }, nextVisibleThreadKey, { timeout: 5000 })

  const nextFrameSrc = await lightboxComments.locator('iframe.giscus-frame').first().getAttribute('src')
  const nextFrameTerm = nextFrameSrc ? new URL(nextFrameSrc).searchParams.get('term') : null
  const requestsAfterNavigation = networkRequests.slice(requestCountBeforeNavigation)
  const discussionApiRequestsAfterNavigation = requestsAfterNavigation.filter(request => request.url.includes('https://giscus.app/api/discussions'))
  const widgetDocumentRequestsAfterNavigation = requestsAfterNavigation.filter(request => request.resourceType === 'document' && request.url.includes('giscus.app/') && request.url.includes('/widget?'))
  const targetOriginMismatchWarnings = consoleMessages.filter(message => message.text.includes("target origin provided ('https://giscus.app') does not match the recipient window's origin"))

  assert.equal(nextFrameTerm, nextVisibleThreadKey, 'lightbox should eventually render the newly visible gallery item term in the active Giscus iframe after navigation')
  assert.equal(targetOriginMismatchWarnings.length, 0, 'lightbox should not send Giscus config messages before the iframe has navigated to the giscus.app origin')
  assert.ok(
    discussionApiRequestsAfterNavigation.some(request => new URL(request.url).searchParams.get('term') === nextVisibleThreadKey)
    || widgetDocumentRequestsAfterNavigation.some(request => new URL(request.url).searchParams.get('term') === nextVisibleThreadKey),
    'lightbox should request Giscus data for the newly visible gallery item term after navigation',
  )

  console.log('PASS: gallery lightbox initializes Giscus comments for visible threads after opening, updates the active Giscus iframe to the newly visible gallery item term, and avoids origin-mismatch postMessage warnings during navigation')
}
finally {
  await page.close()
  await browser.close()
}
