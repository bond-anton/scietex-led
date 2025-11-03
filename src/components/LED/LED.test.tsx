import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, it, vi, expect } from 'vitest'
import { LED } from '.'

describe('LED test:', () => {
  afterEach(cleanup)

  it('should render component', () => {
    render(<LED size={16} />)
  })

  it('onClick triggers properly', async () => {
    const mockFn = vi.fn()
    render(
      <LED
        testId={'test_led'}
        size={16}
        onClick={mockFn}
      />
    )
    expect(mockFn).toHaveBeenCalledTimes(0)
    fireEvent.click(screen.getByTestId('test_led'))
    expect(mockFn).toHaveBeenCalledTimes(1)
  })
})
