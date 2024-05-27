import React from 'react'

interface AgeFormProps {
  age: string
  setAge: (age: string) => void
}

const AgeForm: React.FC<AgeFormProps> = ({ age, setAge }) => {
  return (
    <div className='p-6'>
      <label className='input input-bordered flex items-center gap-2 bg-transparent'>
        Age
        <input
          type='number'
          className='grow bg-transparent'
          placeholder='24'
          value={age}
          onChange={e => setAge(e.target.value)}
        />
      </label>
    </div>
  )
}

export default AgeForm
