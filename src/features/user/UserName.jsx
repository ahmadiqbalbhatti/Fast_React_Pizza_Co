import { useSelector } from 'react-redux';
import { getUsername } from './userSlice.js';

function UserName() {
  const username = useSelector(getUsername);

  if (!username) return null;

  return (
    <div className={'hidden text-sm font-semibold md:block '}>{username}</div>
  );
}

export default UserName;
