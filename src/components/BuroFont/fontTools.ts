import type { BinaryArray } from '../Matrix'
import { zeros, randomArray, reshape1DTo2D } from '../Matrix'

export type FontDict = Record<string, BinaryArray>
export type CharDimensions = {
  rows: number
  cols: number
}

export type FontData = {
  dimensions: CharDimensions
  data: FontDict
}

export function getLetter(
  letter: string,
  font: FontData,
  flat: boolean = false,
  fallbackRandom: boolean = false
): BinaryArray | BinaryArray[] {
  if (Object.prototype.hasOwnProperty.call(font.data, letter)) {
    const array = font.data[letter].flat()
    return flat
      ? array
      : (reshape1DTo2D(array, font.dimensions.rows, font.dimensions.cols) as BinaryArray[])
  } else if (fallbackRandom) {
    return randomArray(font.dimensions.rows * font.dimensions.cols)
  } else {
    return zeros(font.dimensions.rows * font.dimensions.cols)
  }
}
