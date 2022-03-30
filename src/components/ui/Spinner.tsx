import clsx from 'clsx'

interface Props {
  size?: 'xs' | 'sm' | 'md'
  className?: string
}

export const Spinner: React.FC<Props> = ({ size = 'sm', className }) => {
  return (
    <div
      className={clsx(
        'rounded-full animate-spin border-gray-300 border-t-gray-500',
        {
          'h-3 w-3 border-[2px]': size === 'xs',
          'h-5 w-5 border-2': size === 'sm',
          'h-5 w-5 border-[3px]': size === 'md'
        },
        className
      )}
    />
  )
}
