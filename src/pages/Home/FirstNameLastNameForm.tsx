import React from 'react'

// Define the props structure
interface FirstNameLastNameFormProps {
  firstName: string
  lastName: string
  setFirstName: (name: string) => void
  setLastName: (name: string) => void
}

// Update the component to use the props
const FirstNameLastNameForm: React.FC<FirstNameLastNameFormProps> = ({
  firstName,
  lastName,
  setFirstName,
  setLastName,
}) => {
  return (
    <div className='p-6'>
      <ul className='flex flex-col gap-y-4'>
        <li>
          <label className='input input-bordered flex items-center gap-2 bg-transparent'>
            First Name
            <input
              type='text'
              className='grow bg-transparent'
              placeholder='Smith'
              value={firstName} // Set value from props
              onChange={e => setFirstName(e.target.value)} // Update state on change
            />
          </label>
        </li>
        <li>
          <label className='input input-bordered flex items-center gap-2 bg-transparent'>
            Last Name
            <input
              type='text'
              className='grow bg-transparent'
              placeholder='Morty'
              value={lastName} // Set value from props
              onChange={e => setLastName(e.target.value)} // Update state on change
            />
          </label>
        </li>
      </ul>
    </div>
  )
}

export default FirstNameLastNameForm
