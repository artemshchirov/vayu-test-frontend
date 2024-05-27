// TODO: Create a FormContextProvider component that will provide the FormContext to its children
import React, { createContext, useState, ReactNode, useMemo } from 'react'

interface FormContextType {
  isNextDisabled: boolean
  setIsNextDisabled: (disabled: boolean) => void
}

const FormContext = createContext<FormContextType>({
  isNextDisabled: true,
  setIsNextDisabled: () => {},
})

interface FormContextProviderProps {
  children: ReactNode
}

const FormContextProvider: React.FC<FormContextProviderProps> = ({ children }) => {
  const [isNextDisabled, setIsNextDisabled] = useState(true)

  const value = useMemo(
    () => ({
      isNextDisabled,
      setIsNextDisabled,
    }),
    [isNextDisabled]
  )

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

export { FormContextProvider, FormContext }
