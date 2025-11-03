import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { LED } from '.'

// Inject styles globally for the story
const injectStyles = `
  .custom-glow {
    /*box-shadow: 0 0 20px #00ff00 !important;*/
    background-color: green;
  }
  .custom-glow[data-on="true"] {
    background-color: blue;
  }
  .large-border {
    border: 3px solid #ff0000 !important;
  }
  .custom-animation {
    animation: spin 2s linear infinite !important;
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`

const meta = {
  title: 'Components/LED',
  component: LED,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClick: fn(),
    showValue: false,
  },
  decorators: [
    (Story) => {
      // Inject styles when the story renders
      if (typeof document !== 'undefined') {
        const styleId = 'led-stories-styles'
        if (!document.getElementById(styleId)) {
          const style = document.createElement('style')
          style.id = styleId
          style.innerHTML = injectStyles
          document.head.appendChild(style)
        }
      }
      return <Story />
    },
  ],
} satisfies Meta<typeof LED>

export default meta
type Story = StoryObj<typeof meta>

export const Interactive: Story = {
  args: {
    size: 32,
    on: false,
    pulse: false,
    className: 'custom-glow large-border',
  },
}

export const Pulsed: Story = {
  args: {
    size: 64,
    on: true,
    pulse: true,
  },
}
