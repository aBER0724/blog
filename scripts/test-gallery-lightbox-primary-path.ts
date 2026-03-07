import { strict as assert } from 'node:assert'
import { readdirSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const distDir = resolve(process.cwd(), 'dist')
const galleryIndexPaths = collectGalleryIndexPaths(distDir)

assert.notEqual(galleryIndexPaths.length, 0, 'should find built gallery index pages to verify')

for (const filePath of galleryIndexPaths) {
  const html = readFileSync(filePath, 'utf8')

  assert.doesNotMatch(
    html,
    /href="\/(?:[a-z-]+\/)?gallery\/[^"/]+\//,
    `gallery index should not link cards to standalone detail pages: ${filePath}`,
  )
}

function collectGalleryIndexPaths(directory: string): string[] {
  const entries = readdirSync(directory, { withFileTypes: true })
  const results: string[] = []

  for (const entry of entries) {
    const fullPath = join(directory, entry.name)

    if (entry.isDirectory()) {
      if (fullPath.endsWith(join('gallery', 'index.html'))) {
        results.push(fullPath)
        continue
      }

      results.push(...collectGalleryIndexPaths(fullPath))
      continue
    }

    if (fullPath.endsWith(join('gallery', 'index.html'))) {
      results.push(fullPath)
    }
  }

  return results
}
