import AddChannelButton from './AddChannelButton';

const Title = ({
  openModal, t,
}) => (
  <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
    <b>{t('chatPage.title')}</b>
    <AddChannelButton t={t} openModal={openModal} />
  </div>
);

export default Title;
