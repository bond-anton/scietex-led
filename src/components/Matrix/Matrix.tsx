'use client'

import { useState, useEffect, useCallback } from 'react'
import styles from './Matrix.module.css'
import clsx from 'clsx'

import { zeros, getDimensions, crop1DArray, crop2DArray } from './lib'
import { LED } from '../LED'

export interface MatrixProps {
  cols: number
  rows: number
  width: number
  data?: number[] | number[][]
  showValue?: boolean
  pulse?: boolean
  onChange?: (data: number[]) => void // Callback when matrix changes
  className?: string
}

export function Matrix({
  cols,
  rows,
  width,
  data,
  showValue = false,
  pulse = false,
  onChange,
  className,
}: MatrixProps) {
  // State for the matrix data
  const [matrixData, setMatrixData] = useState<number[]>(zeros(cols * rows))

  const pixelSize = Math.floor(width / cols)
  const matrixWidth = cols * pixelSize
  const matrixHeight = rows * pixelSize

  const classNames: string[] = className?.split(' ') || []
  const parentClasses: string[] = classNames.filter((cls: string) => !cls.startsWith('led-'))
  const ledClasses: string[] = classNames
    .filter((cls: string) => cls.startsWith('led-'))
    .map((cls) => cls.replace('led-', ''))

  useEffect(() => {
    if (data !== undefined) {
      const dimensions = getDimensions(data)
      const n_dimensions = dimensions.length
      if (n_dimensions == 1) {
        setMatrixData(crop1DArray(data.flat(), cols * rows))
      } else if (n_dimensions == 2) {
        setMatrixData(crop2DArray(data, cols, rows).flat())
      }
    }
  }, [data, cols, rows])

  // Update a single LED
  const toggleLED = useCallback(
    (index: number) => {
      const newData = [...matrixData]
      newData[index] = matrixData[index] ? 0 : 1
      onChange?.(newData)
    },
    [matrixData, onChange]
  )

  return (
    <div
      className={styles.container}
      style={{
        width: `${width}px`,
      }}
    >
      <div className={clsx(styles.panel, parentClasses)}>
        <div
          suppressHydrationWarning
          className={styles.matrix}
          style={{
            width: `${matrixWidth}px`,
            height: `${matrixHeight}px`,
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          }}
        >
          {matrixData.map((value, index) => (
            <LED
              key={index}
              on={!!value}
              size={pixelSize}
              showValue={showValue}
              pulse={pulse}
              onClick={() => toggleLED(index)}
              className={clsx(ledClasses)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
