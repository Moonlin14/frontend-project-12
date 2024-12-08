import React, { useEffect, useState, useRef } from 'react';
import { useFormik } from 'formik';
import { Container, Form, Button, Card, Row, FloatingLabel, Col, Image } from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
//i18

import { useAuth } from '../hooks/hooks.js';
import getRoutes from '../routes.js';
import imagePath from '../assets/avatar_1.jpg';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef();
  const auth = useAuth();
  //i18
  const [authFailed, setAuthFaild] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  
  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: Yup.object({
      username: Yup.string().typeError('required').required('required'),
      password: Yup.string().typeError('required').required('required')
    }),

    onSubmit: async (values) => {
      setAuthFaild(false);
      try {
        const res = await axios.post(getRoutes.loginPath(), values)
        localStorage.setItem('userId', JSON.stringify(res.data));
        // auth.logIn(res.data)
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
      } catch (err) {
        formik.setSubmitting(false)
        if (err.isAxiosError && err.respones.status === 401) {
          setAuthFaild(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
  <Container className="h-100" fluid>
    <Row className="justify-content-center align-content-center h-100">
      <Col className='col-12 col-md-8 col-xxl-6'>
        <Card className="shadow-sm">
          <Card.Body className="row p-5">
            <div className='col-12 col-md-6 d-flex align-items-center justify-content-center'>
              <Image src={imagePath} className='roundedCircle' alt="Войти" />
            </div>
            <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">Войти</h1>
                <fieldset>
                  <Form.Group className="form-floating mb-3">
                    <FloatingLabel id="username" label="Ваш ник">
                      <Form.Control type="text"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      onBlur={formik.handleBlur}
                      disabled={formik.isSubmitting}
                      name="username" 
                      autoComplete="username" 
                      placeholder="Ваш ник" 
                      id="username" 
                      ref={inputRef} 
                      isInvalid={authFailed}
                      required
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="form-floating mb-4">
                    <FloatingLabel id="password" label="Пароль">
                      <Form.Control 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="Пароль" 
                        autoComplete="current-password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        disabled={formik.isSubmitting}
                        isInvalid={authFailed} 
                        required
                      />
                    </FloatingLabel>
                    <Form.Control.Feedback type="invalid" className="invalid-feedback">Неизвестный пользователь</Form.Control.Feedback>
                  </Form.Group>
                  <Button type="submit" disabled={formik.isSubmitting} variant='outline-primary' className="w-100 mb-3">Войти</Button>
                </fieldset>
              </Form>
          </Card.Body>
          <Card.Footer>
            <div className="text-center">
              <span>Нет аккаунта?</span>
              {' '}
              <NavLink to={"/signup"}>Регистрация</NavLink>
            </div>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  </Container>
);
};