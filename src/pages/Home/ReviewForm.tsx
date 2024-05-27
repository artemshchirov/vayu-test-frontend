import React from 'react'

interface ReviewFormProps {
  firstName: string
  lastName: string
  age: string
}

const ReviewForm: React.FC<ReviewFormProps> = ({ firstName, lastName, age }) => {
  return (
    <div className='m-6 p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-xl font-bold mb-4 text-gray-800 max-w-max mx-auto'>
        Review Your Information (3/3)
      </h2>
      <ul className='list-disc pl-5 space-y-2'>
        <li className='text-md text-gray-700'>
          <strong>First Name:</strong> <span className='text-gray-600'>{firstName}</span>
        </li>
        <li className='text-md text-gray-700'>
          <strong>Last Name:</strong> <span className='text-gray-600'>{lastName}</span>
        </li>
        <li className='text-md text-gray-700'>
          <strong>Age:</strong> <span className='text-gray-600'>{age}</span>
        </li>
      </ul>
    </div>
  )
}

export default ReviewForm
