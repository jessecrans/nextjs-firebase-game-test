import { User, createUser, storeUser } from '@/lib/users/user'
import { addUserToGame } from '@/lib/firebase/database'
import React from 'react'

const UsernameDialog = ({
  gameID,
}: {
  gameID: string
}) => {
  const [username, setUsername] = React.useState('')

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const handleUsernameSubmit = () => {
    const user: User = createUser(username);
    storeUser(user);
    addUserToGame(gameID, user);
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