import { useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import * as yup from 'yup';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useAuth, useChatApi } from '../../../hooks/hooks.js';

export default ({ activeChannel }) => {
  const { user } = useAuth();
  const chatApi = useChatApi();
  const messageRef = useRef(null);
  const { t } = useTranslation();

  const validationSchema = yup.object().shape({
    message: yup.string().trim().required('Required'),
  });

  useEffect(() => {
    messageRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validateOnChange: validationSchema,
    onSubmit: async (values) => {
      const cleanedMessage = leoProfanity.clean(values.body);
      const message = {
        text: cleanedMessage,
        channelId: activeChannel.id,
        username: user.username,
      };
      await chatApi.sendMessage(message)
      .then(() => formik.resetForm())
      .catch(() => toast.error(t('toast.dataLoadingerror')));
    }
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form 
      noValidate
      className='py-1 border rounded-2'
      onSubmit={formik.handleSubmit}
      >
        <Form.Group className='input-group'>
          <Form.Control 
            name='body'
            id='body'
            ref={messageRef}
            aria-label={t('newMessage')}
            placeholder={t('messageFormPlaceholder')}
            className='border-0 p-0 ps-2'
            value={formik.values.body}
            onChange={formik.handleChange}
          />
          <Button
            type='submit'
            variant='group-vertical'
            style={{ border: 'none' }}
            disabled={formik.isSubmitting || !formik.values.body}
            onClick={formik.handleSubmit}
          >
            <ArrowRightSquare size={20}/>
            <span className='visually-hidden'>{t('send')}</span>
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}