import { Button, Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { channelNamesShema } from '../../utils/validate';
import {
  useGetChannelsQuery,
  useAddChannelMutation,
} from '../../store/api/chatApi';
import {
  setActiveChannel,
} from '../../store/slices/activeChannelSlice';

const AddModal = ({ closeModal }) => {
  const [addChannel] = useAddChannelMutation();
  const { t } = useTranslation();
  const { data: channels } = useGetChannelsQuery();
  const channelNames = channels?.map((channel) => channel.name);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: channelNamesShema(channelNames, t),
    onSubmit: async ({ name }) => {
      try {
        const filteredName = filter.clean(name);
        const newChannel = await addChannel({ name: filteredName });
        dispatch(setActiveChannel(newChannel.data));
        toast.success(t('toastify.success.channel.add'));
        closeModal();
      } catch (err) {
        console.log(err);
      }
    },
  });

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <Modal show="true" onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.add.title')}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              id="addChannel"
              name="name"
              ref={inputRef}
              data-testid="input-body"
              className="mb-2"
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={formik.touched.name && formik.errors.name}
            />
            <Form.Label htmlFor="addChannel" className="visually-hidden">
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
                {t('modal.add.cancelButton')}
              </Button>
              <Button variant="primary" type="submit">
                {t('modal.add.submitButton')}
              </Button>
            </div>
          </Form.Group>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default AddModal;
