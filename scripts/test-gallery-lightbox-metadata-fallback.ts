import { strict as assert } from 'node:assert'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const html = readFileSync(resolve(process.cwd(), 'dist/gallery/index.html'), 'utf8')

const expectedMetadata = [
  {
    title: 'Late nap',
    description: 'A sleepy black-and-white cat curled into the blanket.',
    date: '2023-11-21',
  },
  {
    title: 'Bullpen blur',
    description: 'A red-uniformed player caught mid-stride through the dugout motion blur.',
    date: '2026-03-05',
  },
  {
    title: 'New glove',
    description: 'A fresh glove resting on its black bag at the edge of the table.',
    date: '2025-12-11',
  },
  {
    title: 'Dusk walk',
    description: 'Evening light filtering through the trees over the quiet path.',
    date: '2026-03-01',
  },
]

for (const { title, description, date } of expectedMetadata) {
  assert.match(
    html,
    new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
    `gallery index should include metadata title text: ${title}`,
  )

  assert.match(
    html,
    new RegExp(description.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
    `gallery index should include metadata description text: ${description}`,
  )

  assert.match(
    html,
    new RegExp(date.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
    `gallery index should include metadata date text: ${date}`,
  )
}
