import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import routes from '../../utils/routes';
import useAuth from '../../hooks/useAuth';

const MainNavigation = () => {
  const { t } = useTranslation();
  const { loggedIn, logOut } = useAuth();
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">
          {t('mainNavigation.title')}
        </Link>
        {loggedIn && (
          <Link
            onClick={logOut}
            to={routes.loginPagePath()}
            type="button"
            className="btn btn-primary"
          >
            {t('mainNavigation.exitButton')}
          </Link>
        )}
      </div>
    </nav>
  );
};

export default MainNavigation;
