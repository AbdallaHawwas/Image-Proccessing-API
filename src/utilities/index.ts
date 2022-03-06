import path from 'path'
import sharp from 'sharp'

const getImagePath = (filename: string) => {
  return path.resolve(`./assets/${filename}`)
}

interface ReiszeOptions {
  width: number
  height: number
}

const resize = (inputFile: string, options: ReiszeOptions): Promise<Buffer> => {
  return sharp(inputFile).resize(options).png().toBuffer()
}

export { getImagePath, resize }
