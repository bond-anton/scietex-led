'use client'

import type { FontData } from './fontTools'
import { getLetter } from './fontTools'
import { BuroFont } from './buroFont'
import { Matrix } from '../Matrix'

export interface CharProps {
  char: string
  width: number
  className?: string
  showValue?: boolean
  pulse?: boolean
  font?: FontData
}

export function Char({
  char,
  width,
  className,
  showValue = false,
  pulse = false,
  font = BuroFont,
}: CharProps) {
  const letterData = getLetter(char, font, false, false)

  return (
    <Matrix
      cols={font.dimensions.cols}
      rows={font.dimensions.rows}
      width={width}
      data={letterData}
      className={className}
      showValue={showValue}
      pulse={pulse}
    />
  )
}
