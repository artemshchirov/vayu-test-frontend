import { FC } from 'react'
import cn from '../utils/cn'

interface SectionProps {
  className?: string
  children: React.ReactNode
}

const Section: FC<SectionProps> = ({ className, children }) => {
  return (
    <section
      className={cn(
        'w-full p-6 mb-3 rounded-md text-black bg-transparent h-max last:mb-0 lg:p-8',
        className
      )}
    >
      {children}
    </section>
  )
}

export default Section
