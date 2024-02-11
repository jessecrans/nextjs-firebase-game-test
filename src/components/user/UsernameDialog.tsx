import { User, createUser } from '@/lib/users/user'
import React from 'react'

const UsernameDialog = ({
  onSubmit
}: {
  onSubmit: (user: User) => void
}) => {
  const [username, setUsername] = React.useState('')

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const handleUsernameSubmit = () => {
    const user: User = createUser(username);
    localStorage.setItem('user', JSON.stringify(user));
    onSubmit(user);
  }

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={handleUsernameChange}
        className='p-2 border'
      />
      <button
        onClick={handleUsernameSubmit}
        className='p-2 bg-blue-500 text-white rounded'
      >
        Submit
      </button>
    </div>
  )
}

export default UsernameDialog