import React, { useState, useEffect, useCallback } from 'react'
import * as yup from 'yup'
import debounce from '../../utils/debounce'
import Title from '../../components/ui/Title'
import FormLayout from '../../layouts/FormLayout'
import ERROR_MESSAGES from '../../utils/constants'

export interface AgeFormProps {
  age: string
  setAge: (age: string) => void
  onValidationChange: (isValid: boolean) => void
}

const ageSchema = yup.object().shape({
  age: yup
    .number()
    .min(1, ERROR_MESSAGES.AGE_MIN)
    .max(120, ERROR_MESSAGES.AGE_MAX)
    .required(ERROR_MESSAGES.AGE_REQUIRED)
    .integer(ERROR_MESSAGES.AGE_INTEGER),
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
        setAgeError(ERROR_MESSAGES.UNEXPECTED_ERROR)
      }
    }
  }, [])

  const debouncedValidateAge = useCallback(
    debounce(() => {
      if (age) {
        validateAge(age)
      } else if (touchedAge) {
        setAgeError(ERROR_MESSAGES.AGE_REQUIRED)
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
    <>
      <Title> Enter Your Age (2/3)</Title>
      <FormLayout>
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
      </FormLayout>
    </>
  )
}

export default AgeForm
