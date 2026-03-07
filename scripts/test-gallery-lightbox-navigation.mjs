import { chromium } from 'playwright'
import assert from 'node:assert/strict'

const baseURL = process.env.GALLERY_BASE_URL || 'http://127.0.0.1:4321'
const pageURL = new URL('/gallery/', baseURL).toString()

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()

try {
  await page.goto(pageURL, { waitUntil: 'networkidle' })

  const firstCard = page.locator('[data-gallery-trigger]').first()
  const lightboxTitle = page.locator('[data-gallery-lightbox-title]')
  const lightboxImage = page.locator('[data-gallery-lightbox-image]')
  const nextButton = page.locator('[data-gallery-lightbox-next]')

  await firstCard.click()

  const initialTitle = (await lightboxTitle.textContent())?.trim() || ''
  const initialImageSrc = await lightboxImage.getAttribute('src') || ''

  assert.notEqual(initialTitle, '', 'lightbox title should be populated after opening')
  assert.notEqual(initialImageSrc, '', 'lightbox image src should be populated after opening')

  await nextButton.click()

  const nextTitle = (await lightboxTitle.textContent())?.trim() || ''
  const nextImageSrc = await lightboxImage.getAttribute('src') || ''

  assert.notEqual(nextTitle, initialTitle, 'lightbox title should change after clicking next')
  assert.notEqual(nextImageSrc, initialImageSrc, 'lightbox image src should change after clicking next')

  await page.keyboard.press('ArrowLeft')

  const returnedTitle = (await lightboxTitle.textContent())?.trim() || ''
  const returnedImageSrc = await lightboxImage.getAttribute('src') || ''

  assert.equal(returnedTitle, initialTitle, 'ArrowLeft should navigate back to the original title')
  assert.equal(returnedImageSrc, initialImageSrc, 'ArrowLeft should navigate back to the original image src')

  console.log('PASS: gallery lightbox supports next button and ArrowLeft navigation')
}
finally {
  await page.close()
  await browser.close()
}
