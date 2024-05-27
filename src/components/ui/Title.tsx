import { FC, ReactNode } from 'react'

interface TitleProps {
  children: ReactNode
}
const Title: FC<TitleProps> = ({ children }) => {
  return <h2 className='text-xl font-bold mb-4 text-gray-800 max-w-max mx-auto'>{children}</h2>
}

export default Title
