import React from 'react'
import Title from '../../components/ui/Title'
import FormLayout from '../../layouts/FormLayout'

export interface ReviewFormProps {
  firstName: string
  lastName: string
  age: string
}

const ReviewForm: React.FC<ReviewFormProps> = ({ firstName, lastName, age }) => {
  return (
    <>
      <Title> Review Your Information (3/3)</Title>
      <FormLayout>
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
      </FormLayout>
    </>
  )
}

export default ReviewForm
