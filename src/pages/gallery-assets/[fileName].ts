import fs from 'node:fs/promises'
import path from 'node:path'
import { getGalleryItems } from '@/utils/gallery'

const galleryDir = path.resolve(process.cwd(), 'src/content/gallery')

export async function getStaticPaths() {
  const items = await getGalleryItems()

  return items.map(item => ({
    params: { fileName: item.fileName },
  }))
}

export async function GET({ params }: { params: { fileName: string } }) {
  const filePath = path.join(galleryDir, params.fileName)
  const data = await fs.readFile(filePath)
  const extension = path.extname(params.fileName).toLowerCase()

  const contentType = extension === '.png'
    ? 'image/png'
    : extension === '.webp'
      ? 'image/webp'
      : extension === '.avif'
        ? 'image/avif'
        : 'image/jpeg'

  return new Response(data, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
