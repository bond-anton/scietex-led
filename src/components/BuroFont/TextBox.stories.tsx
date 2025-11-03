import type { Meta, StoryObj } from '@storybook/react-vite'

import { TextBox } from '.'

const meta = {
  title: 'Components/TextBox',
  component: TextBox,
  parameters: {
    layout: 'centered',
  },
  args: {
    multiline: true,
    autofill: true,
    showValue: false,
    pulse: false,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextBox>

export default meta
type Story = StoryObj<typeof meta>

export const HelloWorld: Story = {
  args: {
    text: 'Hello World!',
    cols: 4,
    gap: 10,
    charWidth: 96,
  },
}
