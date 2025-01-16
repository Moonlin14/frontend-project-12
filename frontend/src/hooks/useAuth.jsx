import { useContext } from 'react';

import authContext from '../contexts/authorization/AuthContext';

const useAuth = () => useContext(authContext);

export default useAuth;
