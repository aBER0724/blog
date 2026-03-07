import { strict as assert } from 'node:assert'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const html = readFileSync(resolve(process.cwd(), 'dist/gallery/index.html'), 'utf8')

function getBuiltGiscusScriptPath() {
  const match = html.match(/<script[^>]*type=module[^>]*src=([^>]+Giscus[^>]+\.js)[^>]*><\/script>/)

  assert.ok(match?.[1], 'gallery index should include the built Giscus module script')
  return match[1]
}

const builtGiscusScript = readFileSync(
  resolve(process.cwd(), `dist/${getBuiltGiscusScriptPath().replace(/^\//, '')}`),
  'utf8',
)

function getElementByMarker(marker: string) {
  const match = html.match(new RegExp(`<[^>]*${marker}(?![-\\w])[^>]*>`))

  assert.ok(match, `gallery index should render ${marker}`)
  return match[0]
}

function getSectionByMarker(marker: string) {
  const match = html.match(new RegExp(`<section[^>]*${marker}(?![-\\w])[^>]*>[\\s\\S]*?<\\/section>`))

  assert.ok(match, `gallery index should render a section for ${marker}`)
  return match[0]
}

function getDivByMarker(marker: string) {
  const match = html.match(new RegExp(`<div[^>]*${marker}(?![-\\w])[^>]*>[\\s\\S]*?<\\/div>`))

  assert.ok(match, `gallery index should render a div for ${marker}`)
  return match[0]
}

function escapeForRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function getClassTokens(elementMarkup: string, label: string) {
  const classMatch = elementMarkup.match(/class="([^"]*)"/)

  assert.ok(classMatch, `gallery index should render ${label} with a class attribute`)
  return classMatch[1].trim().split(/\s+/)
}

function getGalleryMasonryContainerElement() {
  const mtClass = escapeForRegExp('mt-10.5')
  const gapClass = escapeForRegExp('gap-8')
  const match = html.match(
    new RegExp(
      `<div[^>]*class="(?=[^"]*${mtClass})(?=[^"]*${gapClass})[^"]*"[^>]*>[\\s\\S]*?data-gallery-trigger[\\s\\S]*?<\\/div>`,
    ),
  )

  assert.ok(match, 'gallery index should render the gallery masonry container before the lightbox markup')
  return match[0]
}

function getButtonByMarker(marker: string) {
  const match = html.match(new RegExp(`<button[^>]*${marker}(?![-\\w])[^>]*>[\\s\\S]*?<\\/button>`))

  assert.ok(match, `gallery index should render a button for ${marker}`)
  return match[0]
}

function assertNavigationHighlightContract(buttonMarkup: string, label: string) {
  assert.match(
    buttonMarkup,
    /after:bottom-0\.15em/,
    `gallery index should render the ${label} lightbox navigation button with a highlight bar aligned to the bottom of the button text`,
  )

  assert.match(
    buttonMarkup,
    /hover:c-primary/,
    `gallery index should render the ${label} lightbox navigation button with the same hover color utility used by site navigation links in built output`,
  )

  assert.match(
    buttonMarkup,
    /hover:font-bold/,
    `gallery index should render the ${label} lightbox navigation button with the same hover font-weight utility used by site navigation links in built output`,
  )
}

const imagePanelElement = getSectionByMarker('data-gallery-lightbox-image-panel')
const masonryContainerElement = getGalleryMasonryContainerElement()
const lightboxOverlayElement = getElementByMarker('data-gallery-lightbox')
const lightboxDialogElement = getElementByMarker('data-gallery-lightbox-dialog')
const lightboxImageElement = getElementByMarker('data-gallery-lightbox-image')
const lightboxImageClassTokens = getClassTokens(lightboxImageElement, 'the lightbox image')
const imageTrackElement = getDivByMarker('data-gallery-lightbox-image-track')
const navigationElement = getDivByMarker('data-gallery-lightbox-navigation')
const previousNavigationButton = getButtonByMarker('data-gallery-lightbox-previous')
const nextNavigationButton = getButtonByMarker('data-gallery-lightbox-next')
const metaElement = getSectionByMarker('data-gallery-lightbox-meta')
const panelScrollElement = getElementByMarker('data-gallery-lightbox-panel-scroll')

const openLightboxStart = html.match(/function openLightbox\([^)]*\)\{/)
const closeLightboxStart = html.match(/function closeLightbox\(\)\{/)

assert.ok(openLightboxStart, 'gallery index should render the openLightbox function inline')
assert.ok(closeLightboxStart, 'gallery index should render the closeLightbox function inline')

assert.match(
  masonryContainerElement,
  /columns-2/,
  'gallery index should render the masonry container with two columns on small screens',
)

assert.match(
  masonryContainerElement,
  /md:columns-3/,
  'gallery index should render the masonry container with three columns on medium screens',
)

assert.match(
  masonryContainerElement,
  /lg:columns-3/,
  'gallery index should render the masonry container with three columns on large screens',
)

assert.match(metaElement, /data-gallery-lightbox-title/, 'gallery index should render the lightbox title inside the metadata panel')
assert.match(metaElement, /data-gallery-lightbox-date/, 'gallery index should render the lightbox date inside the metadata panel')
assert.match(
  metaElement,
  /data-gallery-lightbox-description/,
  'gallery index should render the lightbox description inside the metadata panel',
)

assert.match(
  html,
  /lg:grid-cols-\[minmax\(0,2fr\)_minmax\(20rem,1fr\)\]/,
  'gallery lightbox should use a desktop two-column layout',
)

assert.match(
  html,
  /data-gallery-lightbox-image-panel[\s\S]*data-gallery-lightbox-panel-scroll[\s\S]*data-gallery-lightbox-meta/,
  'gallery index should render metadata as a sibling of the image panel under the main grid container, after the image panel in layout order',
)

assert.doesNotMatch(
  lightboxOverlayElement,
  /\bflex\b/,
  'gallery index should not leave the lightbox overlay as a permanent flex container in the closed markup',
)

assert.match(
  html,
  /openLightbox[\s\S]*lightbox\.classList\.add\(["']flex["']\)/,
  'gallery index should make the overlay a flex container when opening the lightbox so the dialog is centered',
)

assert.match(
  html,
  /closeLightbox[\s\S]*lightbox\.classList\.remove\(["']flex["']\)/,
  'gallery index should remove the overlay flex class when closing the lightbox so the closed state does not leave a blocking layer behind',
)

assert.match(
  lightboxDialogElement,
  /bg-(?:background|secondary\/5)/,
  'gallery index should render the lightbox dialog with a generated theme background utility so the metadata panel remains visually separated from the page behind it',
)

assert.match(
  panelScrollElement,
  /bg-(?:background|secondary\/10|background\/95)/,
  'gallery index should render the right panel with a visibly distinct generated theme background utility',
)

assert.match(
  panelScrollElement,
  /lg:overflow-y-auto/,
  'gallery index should make the right panel itself scrollable on large screens',
)

assert.match(
  imagePanelElement,
  /lg:max-h-full/,
  'gallery index should constrain the left image panel to the dialog height on large screens',
)

assert.match(
  imagePanelElement,
  /h-full/,
  'gallery index should render the left image panel at full available height for the stable two-row layout',
)

assert.match(
  imageTrackElement,
  /min-h-0/,
  'gallery index should render a dedicated image-track wrapper that can shrink within the left panel',
)

assert.match(
  imageTrackElement,
  /flex-1/,
  'gallery index should render a dedicated image-track wrapper that fills the remaining space above navigation',
)

assert.match(
  imageTrackElement,
  /flex/,
  'gallery index should render a dedicated image-track wrapper as a flex container for stable image alignment',
)

assert.match(
  imageTrackElement,
  /justify-center/,
  'gallery index should center the lightbox image horizontally within the dedicated image track so portrait images do not stick to the left edge',
)

assert.match(
  imageTrackElement,
  /data-gallery-lightbox-image/,
  'gallery index should render the lightbox image inside the dedicated image-track wrapper',
)

assert.match(
  imagePanelElement,
  /data-gallery-lightbox-image-track[\s\S]*data-gallery-lightbox-navigation/,
  'gallery index should render the dedicated image-track wrapper before the navigation row inside the left image panel',
)

assert.ok(
  lightboxImageClassTokens.includes('w-auto'),
  'gallery index should render the lightbox image with w-auto so the intrinsic width is preserved inside the image track',
)

assert.ok(
  lightboxImageClassTokens.includes('h-auto'),
  'gallery index should render the lightbox image with h-auto so the intrinsic height is preserved inside the image track',
)

assert.ok(
  lightboxImageClassTokens.includes('max-w-full'),
  'gallery index should render the lightbox image with max-w-full so wide images stay constrained to the available track width',
)

assert.ok(
  lightboxImageClassTokens.includes('max-h-full'),
  'gallery index should render the lightbox image with max-h-full so tall images stay constrained to the available track height',
)

assert.ok(
  lightboxImageClassTokens.includes('object-contain'),
  'gallery index should preserve the full image inside the constrained lightbox area',
)

assert.match(
  imagePanelElement,
  /data-gallery-lightbox-image[\s\S]*data-gallery-lightbox-navigation/,
  'gallery index should render the navigation after the lightbox image inside the left image panel',
)

assert.doesNotMatch(
  navigationElement,
  /absolute/,
  'gallery index should not render the lightbox navigation row with absolute positioning in the stable two-row left panel layout',
)

assert.match(
  navigationElement,
  /shrink-0/,
  'gallery index should render the lightbox navigation row as a fixed-height flex item below the image track',
)

assert.match(
  previousNavigationButton,
  /←\s*上一张/,
  'gallery index should render the previous navigation copy as ← 上一张',
)

assert.match(
  nextNavigationButton,
  /下一张\s*→/,
  'gallery index should render the next navigation copy as 下一张 →',
)

assert.match(
  previousNavigationButton,
  /hover:text-foreground/,
  'gallery index should render the previous lightbox navigation button with the same hover text utility used by site navigation links',
)

assert.match(
  nextNavigationButton,
  /hover:text-foreground/,
  'gallery index should render the next lightbox navigation button with the same hover text utility used by site navigation links',
)

assertNavigationHighlightContract(previousNavigationButton, 'previous')
assertNavigationHighlightContract(nextNavigationButton, 'next')

assert.match(
  builtGiscusScript,
  /theme-dark\.css[\s\S]*theme-light\.css/,
  'gallery output should include both dark and light Giscus theme stylesheet URLs so runtime prewarming can choose the active theme stylesheet',
)

assert.match(
  builtGiscusScript,
  /createElement\(["']link["']\)/,
  'gallery output should create link elements at runtime so Giscus-related resources can be prewarmed before the widget mounts',
)

assert.match(
  builtGiscusScript,
  /\.rel\s*=\s*["']preload["']/,
  'gallery output should mark a runtime-created link as preload for the Giscus theme stylesheet warmup path',
)

assert.match(
  builtGiscusScript,
  /\.as\s*=\s*["']style["']/,
  'gallery output should mark the prewarmed Giscus theme link as a style resource',
)

assert.match(
  builtGiscusScript,
  /\.rel\s*=\s*["']preconnect["'][\s\S]*https:\/\/giscus\.app/,
  'gallery output should preconnect to https://giscus.app so the Giscus bootstrap origin is warmed before the lightbox mounts the discussion widget',
)

assert.match(
  builtGiscusScript,
  /\.rel\s*=\s*["']preconnect["'][\s\S]*https:\/\/github\.githubassets\.com/,
  'gallery output should preconnect to https://github.githubassets.com so Giscus asset fetches can reuse an already warmed connection',
)

assert.match(
  builtGiscusScript,
  /\.rel\s*=\s*["']preload["'][\s\S]*\.as\s*=\s*["']script["'][\s\S]*\.href\s*=\s*["']https:\/\/giscus\.app\/client\.js["']?/,
  'gallery output should preload https://giscus.app/client.js so the Giscus client is already downloading before the lightbox needs it',
)

assert.match(
  builtGiscusScript,
  /querySelectorAll\(["']\[data-gallery-trigger\]["']\)[\s\S]*addEventListener\(["']pointerenter["']\s*,/,
  'gallery output should prewarm Giscus-related resources from a gallery trigger pointerenter handler so the first lightbox open does not wait for the entire external bootstrap chain',
)

assert.match(
  builtGiscusScript,
  /window\.addEventListener\(["']load["']\s*,/,
  'gallery output should prewarm Giscus-related resources after page load so the external client can be cached before the user opens the lightbox',
)

assert.match(
  builtGiscusScript,
  /updateGiscusTerm/,
  'gallery output should define an updateGiscusTerm helper so the lightbox can reuse one Giscus instance instead of recreating it for every gallery item',
)

assert.match(
  builtGiscusScript,
  /cloneNode\((?:false|!1)\)/,
  'gallery output should clone the existing Giscus iframe shell when preparing the next lightbox discussion in the background',
)

assert.match(
  builtGiscusScript,
  /addEventListener\(["']load["']/,
  'gallery output should wait for the next Giscus iframe to finish loading before swapping it into the visible lightbox comment area',
)

assert.match(
  builtGiscusScript,
  /\.remove\(\)[\s\S]*\.removeAttribute\(["']aria-hidden["']\)/,
  'gallery output should keep the current Giscus iframe visible until the replacement iframe has loaded, then swap the frames in the lightbox comment area',
)

