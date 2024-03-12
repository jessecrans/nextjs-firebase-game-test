import { User, createUser, storeUser } from '@/lib/users/user';
import { addUserToGame } from '@/lib/firebase/database';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const UsernameDialog = ({
  gameID,
}: {
  gameID: string
}) => {
  const [username, setUsername] = React.useState('');
  const [warning, setWarning] = React.useState('');
  const [joining, setJoining] = React.useState(false);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.value.length === 0) {
      setWarning('Username cannot be empty')
    } else {
      setWarning('')
    }
    setUsername(event.target.value);
  }

  const handleUsernameSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username.length === 0) {
      setWarning('Username cannot be empty');
      return;
    }
    setJoining(true);
    const user: User = createUser(username);
    storeUser(user);
    addUserToGame(gameID, user);
  }

  return (
    <div>
      <p className='text-red-600'>{warning}</p>
      <form onSubmit={handleUsernameSubmit}>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          maxLength={20}
          className='p-2 border mr-2 rounded'
        />
        {
          joining ? (
            <div className='p-2 inline'><FontAwesomeIcon icon={faSpinner} spin /></div>
          ) : (
            <input
              type="submit"
              value={"Join"}
              className='p-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            />
          )
        }
      </form>
    </div>
  )
}

export default UsernameDialog