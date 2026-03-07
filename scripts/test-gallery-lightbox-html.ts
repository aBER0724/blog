import { strict as assert } from 'node:assert'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const html = readFileSync(resolve(process.cwd(), 'dist/gallery/index.html'), 'utf8')

const requiredMarkers = [
  'data-gallery-lightbox',
  'data-gallery-lightbox-current-index',
  'data-gallery-lightbox-dialog',
  'data-gallery-lightbox-image-panel',
  'data-gallery-lightbox-image',
  'data-gallery-lightbox-navigation',
  'data-gallery-lightbox-previous',
  'data-gallery-lightbox-next',
  'data-gallery-lightbox-meta',
  'data-gallery-lightbox-meta-header',
  'data-gallery-lightbox-title',
  'data-gallery-lightbox-date',
  'data-gallery-lightbox-description',
  'data-gallery-lightbox-comments',
  'data-gallery-lightbox-comments-scroll',
  'data-gallery-lightbox-close',
]

for (const marker of requiredMarkers) {
  assert.match(
    html,
    new RegExp(`${marker}(?![-\\w])`),
    `gallery index should render ${marker}`,
  )
}

const removedMarkers = [
  'data-gallery-modal-sidebar',
  'data-gallery-modal-image',
  'data-gallery-modal-description',
  'data-gallery-modal-date',
  'data-gallery-modal-title',
  'data-gallery-dialog',
  'data-gallery-close',
  'data-gallery-previous',
  'data-gallery-next',
  'aria-label="Close gallery modal"',
]

for (const marker of removedMarkers) {
  assert.doesNotMatch(
    html,
    new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
    `gallery index should not render legacy marker ${marker}`,
  )
}

assert.match(
  html,
  /data-gallery-trigger-index(?:="0"|=0|\b)/,
  'gallery index should emit trigger index markers for lightbox state scaffolding',
)
assert.match(
  html,
  /data-gallery-lightbox-comment-index(?:="0"|=0|\b)/,
  'gallery index should emit comment thread index markers for lightbox migration scaffolding',
)
