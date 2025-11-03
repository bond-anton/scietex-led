import type { Meta, StoryObj } from '@storybook/react-vite'

import { Char } from '.'

const meta = {
  title: 'Components/Char',
  component: Char,
  parameters: {
    layout: 'centered',
  },
  args: {
    showValue: false,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Char>

export default meta
type Story = StoryObj<typeof meta>

export const Character: Story = {
  args: {
    char: 'A',
    width: 100,
  },
}
