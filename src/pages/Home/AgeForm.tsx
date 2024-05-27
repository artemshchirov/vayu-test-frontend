import React, { useState, useEffect, useCallback } from 'react'
import * as yup from 'yup'
import debounce from '../../utils/debounce'

interface AgeFormProps {
  age: string
  setAge: (age: string) => void
  onValidationChange: (isValid: boolean) => void
}

const ageSchema = yup.object().shape({
  age: yup
    .number()
    .min(1, 'Age must be at least 1 year old.')
    .max(120, 'Age must be no more than 120 years old.')
    .required('Age is required')
    .integer('Age must be an integer'),
})

const AgeForm: React.FC<AgeFormProps> = ({ age, setAge, onValidationChange }) => {
  const [ageError, setAgeError] = useState('')
  const [touchedAge, setTouchedAge] = useState(false)

  useEffect(() => {
    onValidationChange(!ageError && age.trim() !== '')
  }, [ageError, age, onValidationChange])

  const validateAge = useCallback(async (ageValue: string) => {
    try {
      await ageSchema.validate({ age: ageValue })
      setAgeError('')
    } catch (err: unknown) {
      if (err instanceof Error) {
        setAgeError(err.message)
      } else {
        setAgeError('An unexpected error occurred')
      }
    }
  }, [])

  const debouncedValidateAge = useCallback(
    debounce(() => {
      if (age) {
        validateAge(age)
      } else if (touchedAge) {
        setAgeError('Age is required')
      }
    }, 250),
    [age, touchedAge, validateAge]
  )

  useEffect(() => {
    debouncedValidateAge()
  }, [age, debouncedValidateAge])

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputAge = e.target.value
    setAge(inputAge)
    setTouchedAge(true)
  }

  return (
    <div className='m-6 p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-xl font-bold mb-4 text-gray-800 max-w-max mx-auto'>
        Enter Your Age (2/3)
      </h2>
      <label className='input input-bordered flex items-center gap-2 bg-transparent'>
        Age
        <input
          type='number'
          className='grow bg-transparent'
          placeholder='24'
          value={age}
          onChange={handleAgeChange}
        />
      </label>
      {touchedAge && ageError && <p className='text-red-500 text-xs mt-1'>{ageError}</p>}
    </div>
  )
}

export default AgeForm
