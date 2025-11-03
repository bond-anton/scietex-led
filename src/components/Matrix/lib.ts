export type BinaryValue = 0 | 1
export type BinaryArray = BinaryValue[]

export type NestedArray<T> = T | NestedArray<T>[]

export function random(): BinaryValue {
  return Math.floor(Math.random() * 2) as BinaryValue
}

export function zeros(length: number): BinaryArray {
  return Array.from({ length }).fill(0) as BinaryArray
}

export function ones(length: number): BinaryArray {
  return Array.from({ length }).fill(1) as BinaryArray
}

export function randomArray(length: number): BinaryArray {
  return Array.from({ length }, () => random()) as BinaryArray
}

export function getDimensions(array: NestedArray<number>): number[] {
  const dimentions: number[] = []
  let current = array
  while (Array.isArray(current)) {
    dimentions.push(current.length)
    current = current[0]
  }
  return dimentions
}

export function crop1DArray(array: number[], length: number, start: number = 0): number[] {
  if (start > array.length) {
    return Array.from({ length }).fill(0) as number[]
  }
  const padded = array.slice(start, start + length)
  const paddedLength = padded.length
  if (paddedLength < length) {
    padded.length = length
    return padded.fill(0, paddedLength)
  }
  return padded
}

export function crop2DArray(
  array: number[] | number[][],
  rows: number,
  cols: number,
  start_row: number = 0,
  start_col: number = 0
): number[][] {
  if (start_row > array.length || start_col > (Array.isArray(array[0]) ? array[0].length : 0)) {
    return Array.from({ length: rows }, () => Array.from({ length: cols }).fill(0) as number[])
  }
  const padded = array
    .slice(start_row, rows)
    .map((row) => crop1DArray(Array.isArray(row) ? row : [row], cols, start_col))
  if (array.length < rows) {
    padded.length = rows
    return padded.fill(Array.from({ length: cols }).fill(0) as number[], array.length)
  }
  return padded
}

export function reshape1DTo2D(array: number[], rows: number, cols: number): number[][] {
  const padded = crop1DArray(array, rows * cols)
  return Array.from({ length: rows }, (_, i) => padded.slice(i * cols, (i + 1) * cols))
}

export function reshape1D(array: number[], dimensions: number[]): NestedArray<number> {
  if (dimensions.length === 0) {
    return []
  }
  const totalLength = dimensions.reduce((acc, current) => acc * current, 1)
  if (totalLength === 0) {
    return []
  }
  const padded = crop1DArray(array, totalLength)
  const [dim, ...remainingDims] = dimensions
  const chunkSize = remainingDims.reduce((acc, current) => acc * current, 1)
  const result = []
  for (let i = 0; i < dim; i++) {
    const chunk = padded.slice(i * chunkSize, (i + 1) * chunkSize)
    if (remainingDims.length > 0) {
      result.push(reshape1D(chunk, remainingDims))
    } else {
      result.push(...chunk)
    }
  }
  return result
}
