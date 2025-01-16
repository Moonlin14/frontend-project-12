import { Spinner } from 'react-bootstrap';

const Loading = (t) => (
  <Spinner animation="border" role="status">
    <span className="visually-hidden">{t('loading.text')}</span>
  </Spinner>
);

export default Loading;
