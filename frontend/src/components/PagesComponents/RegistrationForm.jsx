/* eslint-disable no-mixed-operators */
import { useFormik } from 'formik';
import { useRef, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from 'axios';
import { signUpShema } from '../../utils/validate';
import routes from '../../utils/routes';
import useAuth from '../../hooks/useAuth';

const RegistrationForm = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isError, setIsError] = useState(false);

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: { username: '', password: '', confirmPassword: '' },
    validationSchema: signUpShema(t),
    onSubmit: async (values) => {
      try {
        const res = await axios.post(routes.signUpApiPath(), values);
        auth.logIn(res.data.token, values.username);
        navigate(routes.mainPagePath());
        setIsError(false);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          inputRef.current.select();
          toast.error(t('toastify.error.authError'));
          return;
        } if (err.response.status === 409) {
          inputRef.current.select();
          setIsError(true);
        }
        throw err;
      }
    },
  });

  return (
    <Form className="w-50" onSubmit={formik.handleSubmit}>
      <fieldset>
        <h1 className="text-center mb-4">{t('signupForm.title')}</h1>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            name="username"
            autoComplete="username"
            required
            placeholder="Ваш ник"
            id="username"
            ref={inputRef}
            isInvalid={isError || formik.touched.username && formik.errors.username}
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          <Form.Label htmlFor="username">{t('signupForm.username')}</Form.Label>
          <Form.Control.Feedback type="invalid" tooltip>
            {isError ? t('signupForm.errors.usernameExist') : formik.errors.username }
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            name="password"
            autoComplete="current-password"
            required
            placeholder={t('signupForm.password')}
            type="password"
            id="password"
            isInvalid={formik.touched.password && formik.errors.password}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <Form.Label htmlFor="password">{t('signupForm.password')}</Form.Label>
          <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="form-floating mb-4">
          <Form.Control
            name="confirmPassword"
            autoComplete="new-password"
            required
            placeholder={t('signupForm.confirmPassword')}
            type="password"
            id="confirmPassword"
            onChange={formik.handleChange}
            isInvalid={
       formik.touched.confirmPassword && formik.errors.confirmPassword
      }
            value={formik.values.confirmPassword}
          />
          <Form.Label htmlFor="confirmPassword">{t('signupForm.confirmPassword')}</Form.Label>
          <Form.Control.Feedback type="invalid" tooltip>
            {formik.errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="outline-primary" className="w-100 mb-3">
          {t('signupForm.submitButton')}
        </Button>
      </fieldset>
    </Form>
  );
};

export default RegistrationForm;
