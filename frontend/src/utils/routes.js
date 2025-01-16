const apiPath = '/api/v1';

const routes = {
  mainPagePath: () => '/',
  loginPagePath: () => '/login',
  signUpPagePath: () => '/signup',
  signUpApiPath: () => [apiPath, 'signup'].join('/'),
  loginApiPath: () => [apiPath, 'login'].join('/'),
};

export default routes;
