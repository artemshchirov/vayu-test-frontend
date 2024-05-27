import { FC, ReactNode } from 'react'

interface FormLayoutProps {
  children: ReactNode
}
const FormLayout: FC<FormLayoutProps> = ({ children }) => {
  return <div className='m-6 p-6 bg-white rounded-lg shadow-md'>{children}</div>
}

export default FormLayout
