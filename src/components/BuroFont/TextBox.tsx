'use client'

import { useState, useEffect } from 'react'

import type { FontData } from './fontTools'
import { BuroFont } from './buroFont'
import { Char } from './Char'

export interface TextBoxProps {
  text: string
  cols: number
  charWidth: number
  gap?: number
  multiline?: boolean
  autofill?: boolean
  runningDelay?: number
  className?: string
  showValue?: boolean
  pulse?: boolean
  font?: FontData
}

export function TextBox({
  text,
  cols,
  charWidth,
  gap = 0,
  multiline = true,
  autofill = false,
  className,
  showValue = false,
  pulse = false,
  font = BuroFont,
}: TextBoxProps) {
  const [matrixData, setMatrixData] = useState<string[]>(Array.from({ length: cols }, () => ''))

  useEffect(() => {
    const rows = Math.ceil(text.length / cols)
    const displayText = multiline ? text.slice() : text.slice(0, cols)
    const totalCells = multiline ? rows * cols : cols
    const newMatrixData = autofill
      ? Array.from({ length: totalCells }, (_, index) =>
          index < displayText.length ? displayText[index] : ''
        )
      : Array.from({ length: displayText.length }, (_, index) => displayText[index])
    setMatrixData(newMatrixData)
  }, [text, cols, multiline, autofill])

  return (
    <div
      style={{
        display: 'grid',
        alignItems: 'flex-start',
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gap: `calc(var(--spacing, 1px) * ${gap})`,
      }}
    >
      {matrixData.map((char, index) => (
        <Char
          key={index}
          char={char}
          width={charWidth}
          font={font}
          className={className}
          showValue={showValue}
          pulse={pulse}
        />
      ))}
    </div>
  )
}
