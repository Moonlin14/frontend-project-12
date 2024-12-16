import { Button, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// i18
import { useAuth } from '../hooks/hooks.js';
import getRoutes from '../routes.js';

const ExitButton = () => {
  const auth = useAuth();
  // i18

  return (
    auth.loggedIn ? <Button onClick={auth.logOut}>Выход</Button> : null
  );
};

const Header = () => {
  // i18

  return (
    <Navbar className="shadow-sm" bg="white" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to={getRoutes.chatPagePath()}>Hexlet Chat</Navbar.Brand>
        <ExitButton />
      </Container>
    </Navbar>
  );
};

export default Header;