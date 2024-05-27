import React from 'react'

interface ToastProps {
  message: string
  isVisible: boolean
}

const Toast: React.FC<ToastProps> = ({ message, isVisible }) => {
  if (!isVisible) {
    return null
  }

  return (
    <div className='toast toast-top toast-center'>
      <div className='alert alert-success'>
        <span>{message}</span>
      </div>
    </div>
  )
}

export default Toast
