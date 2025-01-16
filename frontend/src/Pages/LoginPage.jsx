import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import authorization from '../assets/authorization.jpg';
import Image from '../components/PagesComponents/Image';
import LoginForm from '../components/PagesComponents/LoginForm';
import routes from '../utils/routes';
import Container from '../components/PagesComponents/Container';

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <div className="card-body row p-5">
        <Image image={authorization} alt={t('image.login')} />
        <LoginForm />
      </div>
      <div className="card-footer p-4">
        <div className="text-center">
          <span>
            {t('loginPage.question')}
          </span>
          <Link to={routes.signUpPagePath()}>{t('loginPage.registration')}</Link>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
