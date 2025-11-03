import styles from './LED.module.css'
import clsx from 'clsx'

export interface LEDProps {
  on?: boolean
  size: number
  showValue?: boolean
  pulse?: boolean
  id?: string
  testId?: string
  onClick?: () => void
  className?: string
}

export function LED({
  on,
  size,
  showValue = false,
  pulse = false,
  id,
  testId,
  onClick,
  className,
}: LEDProps) {
  return (
    <div
      suppressHydrationWarning
      id={id}
      data-testid={testId}
      data-on={on}
      className={clsx(
        styles.led,
        {
          [styles.pulse]: pulse && on,
        },
        className
      )}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      onClick={onClick}
    >
      {showValue ? (on ? '1' : '0') : ''}
    </div>
  )
}
