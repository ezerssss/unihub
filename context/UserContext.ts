import { User } from 'firebase/auth';
import { createContext } from 'react';

const UserContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>> | null;
}>({
  user: null,
  setUser: null,
});

export default UserContext;
