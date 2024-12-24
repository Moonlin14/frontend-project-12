import { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Modal, Button, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import * as yup from 'yup';
import leoProfanity from 'leo-profanity';

import { useChatApi } from '../../../hooks/hooks';
import { actions } from '../../../store/index';

const validationSchema = (channels, t) => yup.object().shape({
  name: yup
  .string()
  .trim()
  .required(t('required'))
  .min(3, t('min'))
  .max(20, t('max'))
  .notOneOf(channels, t('duplicate')),
});

export default ({ closeHandler }) => {
  const { t } = useTranslation();
  const refContainer = useRef('');
  const chatApi = useChatApi();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channelsInfo.channels);
  const channelsName = channels.map((channel) => channel.name);
  const { setCurrentChannel } = actions;

  useEffect(() => {
    refContainer.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: validationSchema(channelsName, t),
    onSubmit: async (values) => {
      const { name } = values;
      const cleanedName = leoProfanity.clean(name);
      await chatApi.newChannel(cleanedName)
      .then((id) => {
        dispatch(setCurrentChannel(id));
        closeHandler();
        toast.success(t('toast.createChannel'));
      })
      .catch(() => {
        toast.error(t('toast.dataLoadingError'))
      });
    },
  });

  return (
    <>
    <Modal.Header closeButton={closeHandler}>
      <Modal.Title>{t('modals.addChannel')}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={formik.handleSubmit}>
        <FormGroup>
          <FormControl 
          className='mb-2'
          ref={refContainer}
          id='name'
          name='name'
          required=''
          onChange={formik.handleChange}
          value={formik.values.name}
          isInvalid={!!formik.errors.name}
          />
          <FormLabel htmlFor='name' className='visually-hidden'>{t('modals.nameChannel')}</FormLabel>
          <FormControl.Feedback type='invalid'>
            {formik.errors.name}
          </FormControl.Feedback>
          <Modal.Footer>
            <Button variant='secondary' type='button' onClick={closeHandler}>{t('modals.cancelButton')}</Button>
            <Button variant='primary' type='sybmit'  onClick={formik.handleSubmit}>{t('modals.addButton')}</Button>
          </Modal.Footer>
        </FormGroup>
      </Form>
    </Modal.Body>
    </>
  );
};