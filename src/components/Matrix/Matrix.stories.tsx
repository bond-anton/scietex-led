import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { Matrix } from '.'
import { randomArray, crop2DArray } from './lib'
import { getLetter, BuroFont } from '../BuroFont'

const meta = {
  title: 'Components/Matrix',
  component: Matrix,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onChange: fn(),
    showValue: false,
    pulse: false,
  },
} satisfies Meta<typeof Matrix>

export default meta
type Story = StoryObj<typeof meta>

export const Interactive: Story = {
  args: {
    cols: 8,
    rows: 4,
    width: 320,
    data: randomArray(32),
  },
}

export const Char: Story = {
  args: {
    cols: 6,
    rows: 6,
    width: 320,
    data: crop2DArray(getLetter('A', BuroFont, false, false), 6, 6, 1, 2),
  },
}
