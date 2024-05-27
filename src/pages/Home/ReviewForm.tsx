import React from 'react'

interface ReviewFormProps {
  firstName: string
  lastName: string
  age: string
}

const ReviewForm: React.FC<ReviewFormProps> = ({ firstName, lastName, age }) => {
  return (
    <div className='p-6 bg-white'>
      <h2 className='text-lg font-bold mb-4'>Review Your Information</h2>
      <ul>
        <li>
          <strong>First Name:</strong> {firstName}
        </li>
        <li>
          <strong>Last Name:</strong> {lastName}
        </li>
        <li>
          <strong>Age:</strong> {age}
        </li>
      </ul>
    </div>
  )
}

export default ReviewForm
