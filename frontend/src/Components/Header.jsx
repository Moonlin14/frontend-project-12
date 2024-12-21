import { Button, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../hooks/hooks.js';
import getRoutes from '../routes.js';

const ExitButton = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    auth.loggedIn ? <Button onClick={auth.logOut}>{t('exitButton')}</Button> : null
  );
};

const Header = () => {
  const { t } = useTranslation();

  return (
    <Navbar className="shadow-sm" bg="white" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to={getRoutes.chatPagePath()}>{t('chatLogo')}</Navbar.Brand>
        <ExitButton />
      </Container>
    </Navbar>
  );
};

export default Header;