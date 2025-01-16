import { Button, Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { channelNamesShema } from '../../utils/validate';
import {
  useGetChannelsQuery,
  useRenameChannelMutation,
} from '../../store/api/chatApi';

const RenameModal = ({ closeModal }) => {
  const channel = useSelector((state) => state.modal.channel);
  const { data: channels } = useGetChannelsQuery();
  const channelNames = channels?.map((item) => item.name) || [];
  const [renameChannel] = useRenameChannelMutation();
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      name: filter.clean(channel?.name.trim()),
    },
    validationSchema: channelNamesShema(channelNames, t),
    onSubmit: async ({ name }) => {
      const updatedChannel = {
        id: channel.id,
        name,
        removable: true,
      };
      try {
        await renameChannel(updatedChannel);
        toast.success(t('toastify.success.channel.rename'));
        closeModal();
      } catch (err) {
        console.log(err);
      }
    },
  });
  const inputRef = useRef(null);
  useEffect(() => {
    setTimeout(() => inputRef.current.select());
  }, [channel]);
  return (
    <Modal show="true" onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.rename.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              id="renameChannel"
              name="name"
              ref={inputRef}
              data-testid="input-body"
              className="mb-2"
              onChange={formik.handleChange}
              isInvalid={formik.touched.name && formik.errors.name}
              value={formik.values.name}
            />
            <Form.Label htmlFor="renameChannel" className="visually-hidden">
              {t('modal.label')}
            </Form.Label>
            {formik.touched.name && formik.errors.name && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
              </Form.Control.Feedback>
            )}
            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                type="button"
                className="me-2"
                onClick={closeModal}
              >
                {t('modal.rename.cancelButton')}
              </Button>
              <Button variant="primary" type="submit">
                {t('modal.rename.submitButton')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameModal;
