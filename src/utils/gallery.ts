import fs from 'node:fs/promises'
import path from 'node:path'

const galleryDir = path.resolve(process.cwd(), 'src/content/gallery')
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])

export interface GalleryItem {
  slug: string
  fileName: string
  title: string
  metadataTitle?: string
  commentKey: string
  description: string
  date?: string
  imagePath: string
}

export function getGalleryImagePath(fileName: string) {
  return `/gallery-assets/${fileName}/`
}

interface GalleryMetadata {
  title?: string
  description?: string
  date?: string
}

function getBaseName(fileName: string) {
  return fileName.replace(/\.[^.]+$/, '')
}

function slugifyFileName(fileName: string) {
  const slug = getBaseName(fileName)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return slug || 'item'
}

function normalizeMetadataValue(value: string) {
  const trimmed = value.trim()

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"'))
    || (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1)
  }

  return trimmed
}

function parseFrontmatter(markdown: string): GalleryMetadata {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) {
    return {}
  }

  const metadata: GalleryMetadata = {}

  for (const line of match[1].split(/\r?\n/)) {
    const separatorIndex = line.indexOf(':')
    if (separatorIndex === -1) {
      continue
    }

    const key = line.slice(0, separatorIndex).trim()
    const value = normalizeMetadataValue(line.slice(separatorIndex + 1))

    if (key === 'title' || key === 'description' || key === 'date') {
      metadata[key] = value
    }
  }

  return metadata
}

async function readMetadata(fileName: string): Promise<GalleryMetadata> {
  const metadataPath = path.join(galleryDir, `${getBaseName(fileName)}.md`)

  try {
    const markdown = await fs.readFile(metadataPath, 'utf8')
    return parseFrontmatter(markdown)
  }
  catch (error) {
    if (typeof error === 'object' && error && 'code' in error && error.code === 'ENOENT') {
      return {}
    }

    throw error
  }
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const entries = await fs.readdir(galleryDir)
  const imageFiles = entries
    .filter(fileName => imageExtensions.has(path.extname(fileName).toLowerCase()))
    .sort((a, b) => a.localeCompare(b))

  const slugCounts = new Map<string, number>()
  const stableSlugs = imageFiles.map((fileName) => {
    const baseSlug = slugifyFileName(fileName)
    const count = slugCounts.get(baseSlug) ?? 0
    slugCounts.set(baseSlug, count + 1)
    return count === 0 ? baseSlug : `${baseSlug}-${count + 1}`
  })

  return Promise.all(imageFiles.map(async (fileName, index) => {
    const metadata = await readMetadata(fileName)

    return {
      slug: stableSlugs[index],
      fileName,
      title: fileName,
      metadataTitle: metadata.title || undefined,
      commentKey: `gallery:${stableSlugs[index]}`,
      description: metadata.description ?? '',
      date: metadata.date || undefined,
      imagePath: getGalleryImagePath(fileName),
    }
  }))
}

export async function getGalleryItemBySlug(slug: string) {
  const items = await getGalleryItems()
  return items.find(item => item.slug === slug)
}
