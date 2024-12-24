import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/hooks.js';
import getRoutes from '../routes.js';
import ChatPage from './chatComponents/ChatPage.jsx'; 

export default () => {
  const location = useLocation()
  const auth = useAuth();

  return (
    auth.loggedIn ? (<ChatPage />) : (<Navigate to={getRoutes.loginPagePath()} state={{ from: location }} />)
  )
}