import sharp from 'sharp'
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const publicDir = join(root, 'public')
const appDir = join(root, 'src', 'app')

mkdirSync(publicDir, { recursive: true })

const svgBuffer = readFileSync(join(root, 'src', 'app', 'icon.svg'))

// All sizes needed for modern web apps
const sizes = [
  // Favicons
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 48, name: 'favicon-48x48.png' },

  // Apple touch icons
  { size: 57, name: 'apple-touch-icon-57x57.png' },
  { size: 60, name: 'apple-touch-icon-60x60.png' },
  { size: 72, name: 'apple-touch-icon-72x72.png' },
  { size: 76, name: 'apple-touch-icon-76x76.png' },
  { size: 114, name: 'apple-touch-icon-114x114.png' },
  { size: 120, name: 'apple-touch-icon-120x120.png' },
  { size: 144, name: 'apple-touch-icon-144x144.png' },
  { size: 152, name: 'apple-touch-icon-152x152.png' },
  { size: 167, name: 'apple-touch-icon-167x167.png' },
  { size: 180, name: 'apple-touch-icon.png' },

  // Android / PWA icons
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },

  // Microsoft tile
  { size: 150, name: 'mstile-150x150.png' },

  // General purpose
  { size: 96, name: 'icon-96x96.png' },
  { size: 128, name: 'icon-128x128.png' },
  { size: 256, name: 'icon-256x256.png' },
  { size: 384, name: 'icon-384x384.png' },

  // OG / Safari pinned tab
  { size: 1024, name: 'icon-1024x1024.png' },
]

console.log('Generating icons from lock.svg...')

for (const { size, name } of sizes) {
  await sharp(svgBuffer)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(join(publicDir, name))
  console.log(`  ${name} (${size}x${size})`)
}

// Generate favicon.ico (multi-size ICO) using sharp for 16, 32, 48
// ICO format: we'll use the 32x32 PNG as the favicon since Next.js handles ico
const favicon32 = await sharp(svgBuffer)
  .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer()

// For proper .ico we need to create it manually
// ICO header + PNG data (modern browsers accept PNG-in-ICO)
const pngs = []
for (const size of [16, 32, 48]) {
  const buf = await sharp(svgBuffer)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()
  pngs.push({ size, data: buf })
}

// Build ICO file
const numImages = pngs.length
const headerSize = 6
const dirEntrySize = 16
const dataOffset = headerSize + dirEntrySize * numImages

// ICO header
const header = Buffer.alloc(headerSize)
header.writeUInt16LE(0, 0)      // Reserved
header.writeUInt16LE(1, 2)      // Type: ICO
header.writeUInt16LE(numImages, 4)

const dirEntries = []
let currentOffset = dataOffset

for (const { size, data } of pngs) {
  const entry = Buffer.alloc(dirEntrySize)
  entry.writeUInt8(size < 256 ? size : 0, 0)   // Width
  entry.writeUInt8(size < 256 ? size : 0, 1)   // Height
  entry.writeUInt8(0, 2)                         // Color palette
  entry.writeUInt8(0, 3)                         // Reserved
  entry.writeUInt16LE(1, 4)                      // Color planes
  entry.writeUInt16LE(32, 6)                     // Bits per pixel
  entry.writeUInt32LE(data.length, 8)            // Size of image data
  entry.writeUInt32LE(currentOffset, 12)         // Offset to image data
  dirEntries.push(entry)
  currentOffset += data.length
}

const ico = Buffer.concat([header, ...dirEntries, ...pngs.map(p => p.data)])
writeFileSync(join(appDir, 'favicon.ico'), ico)
console.log('  favicon.ico (16x16, 32x32, 48x48)')

console.log(`\nGenerated ${sizes.length} PNG icons + favicon.ico`)
