//i18
import getRoutes from '../routes.js';
import imagePath from '../assets/notFound.jpg';

export default () => {
//i18

return (
  <div className="text-center">
    <img src={imagePath} alt="Страница не найдена" className="img-fluid h-25" />
    <h1 className="h4 text-muted">Страница не найдена</h1>
    <p className="text-muted">
      Но вы можете перейти на
      {' '}
      <a href={getRoutes.chatPagePath()}>на главную страницу</a>
    </p>
  </div>
);
};