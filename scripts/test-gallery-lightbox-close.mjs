import { chromium } from 'playwright'
import assert from 'node:assert/strict'

const baseURL = process.env.GALLERY_BASE_URL || 'http://127.0.0.1:4321'
const pageURL = new URL('/gallery/', baseURL).toString()

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()

try {
  await page.goto(pageURL, { waitUntil: 'networkidle' })

  const firstCard = page.locator('[data-gallery-trigger]').first()
  const lightbox = page.locator('[data-gallery-lightbox]')
  const lightboxImage = page.locator('[data-gallery-lightbox-image]')
  const closeButton = page.locator('[data-gallery-lightbox-dialog] [data-gallery-lightbox-close]').first()

  await firstCard.click()

  await assertVisible(lightbox, 'lightbox should be visible after opening')
  await assertVisible(lightboxImage, 'lightbox image should be visible after opening')

  await closeButton.click()

  await waitForHidden(lightbox)
  await assertHidden(lightbox, 'lightbox should be hidden after closing')
  await assertNotVisible(lightboxImage, 'lightbox image should not remain visible after closing')

  const lightboxHidden = await lightbox.evaluate(node => node instanceof HTMLElement && node.hidden)
  const currentIndex = await lightbox.getAttribute('data-gallery-lightbox-current-index')
  const imageSrc = await lightboxImage.getAttribute('src')
  const imageAlt = await lightboxImage.getAttribute('alt')
  const bodyOverflow = await page.evaluate(() => document.body.style.overflow)
  const visibleCloseControls = await page.locator('[data-gallery-lightbox-close]:visible').count()
  const visibleZoomImages = await page.locator('.zoom-img:visible').count()
  const visibleZoomOverlays = await page.locator('.zoom-overlay:visible').count()

  assert.equal(lightboxHidden, true, 'lightbox hidden attribute should be restored after closing')
  assert.equal(currentIndex, '', 'lightbox current index should be cleared after closing')
  assert.equal(imageSrc ?? '', '', 'lightbox image src should be cleared after closing')
  assert.equal(imageAlt ?? '', '', 'lightbox image alt should be cleared after closing')
  assert.equal(bodyOverflow, '', 'body overflow lock should be removed after closing')
  assert.equal(visibleCloseControls, 0, 'no lightbox close control should remain visible after closing')
  assert.equal(visibleZoomImages, 0, 'no global zoom image should remain visible after closing')
  assert.equal(visibleZoomOverlays, 0, 'no global zoom overlay should remain visible after closing')

  console.log('PASS: gallery lightbox closes cleanly without overlay/image residue')
}
finally {
  await page.close()
  await browser.close()
}

async function assertVisible(locator, message) {
  const visible = await locator.isVisible()
  assert.equal(visible, true, message)
}

async function waitForHidden(locator) {
  await locator.waitFor({ state: 'hidden' })
}

async function assertHidden(locator, message) {
  const hidden = await locator.evaluate(node => node instanceof HTMLElement && node.hidden)
  assert.equal(hidden, true, message)
}

async function assertNotVisible(locator, message) {
  const visible = await locator.isVisible().catch(() => false)
  assert.equal(visible, false, message)
}
