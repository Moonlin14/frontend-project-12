import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useChatApi } from '../../../hooks/hooks.js';

export default ({ closeHandler, changed }) => {
  const { t } = useTranslation();
  const chatApi = useChatApi();

  const deleteChannel = async (e) => {
    e.preventDefault();
    await chatApi.removeChannel(changed)
    .then(() => {
      closeHandler();
      toast.warm(t('toast.removeChannel'));
    })
    .catch(() => {
      toast.error(t('toast.dataLoadingError'));
    });
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='lead'>{t('modals.questionInModal')}</p>
        <Modal.Footer>
          <Button variant='secondary' className='me-2' type='button' onClick={closeHandler}>{t('modals.cancelButton')}</Button>
          <Button variant='primary' type='button' onClick={deleteChannel}>{t('modals.removeButton')}</Button>
        </Modal.Footer>
      </Modal.Body>
    </>
  )
}