import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import routes from '../../utils/routes';
import useAuth from '../../hooks/useAuth';

const LoginForm = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post(routes.loginApiPath(), values);
        auth.logIn(res.data.token, values.username);
        navigate(routes.mainPagePath());
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <Form
      className="col-12 col-md-6 mt-3 mt-mb-0"
      onSubmit={formik.handleSubmit}
    >
      <fieldset>
        <h1 className="text-center mb-4">{t('loginForm.title')}</h1>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            name="username"
            autoComplete="username"
            required
            placeholder={t('loginForm.username')}
            id="username"
            ref={inputRef}
            isInvalid={authFailed}
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          <Form.Label htmlFor="username">{t('loginForm.username')}</Form.Label>
        </Form.Group>
        <Form.Group className="form-floating mb-4">
          <Form.Control
            name="password"
            autoComplete="current-password"
            required
            placeholder={t('loginForm.password')}
            type="password"
            id="password"
            isInvalid={authFailed}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <Form.Label htmlFor="password">{t('loginForm.password')}</Form.Label>
          <Form.Control.Feedback type="invalid">{t('loginForm.feedback')}</Form.Control.Feedback>
        </Form.Group>
        <Button
          type="submit"
          variant="outline-primary"
          className="w-100 mb-3"
        >
          {t('loginForm.submitButton')}
        </Button>
      </fieldset>
    </Form>
  );
};

export default LoginForm;
