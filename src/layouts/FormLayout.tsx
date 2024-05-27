import { FC, ReactNode } from 'react'

interface FormLayoutProps {
  children: ReactNode
}
const FormLayout: FC<FormLayoutProps> = ({ children }) => {
  return <form className='m-6 p-6 bg-white rounded-lg shadow-md'>{children}</form>
}

export default FormLayout
