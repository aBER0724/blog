import { strict as assert } from 'node:assert'
import { getGalleryImagePath } from '../src/utils/gallery.ts'

assert.equal(
  getGalleryImagePath('IMG_8234.jpg'),
  '/gallery-assets/IMG_8234.jpg/',
  'gallery image path should include a trailing slash so Astro dev routes resolve correctly',
)
