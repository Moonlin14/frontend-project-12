import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignupScheme = Yup.object().shape({
  nickname: Yup.string().min(2).max(15).required(),
  password: Yup.string().matches(/\w{5,}/).required()
})

export const LoginForm = () => (
  <div className="card shadow-sm">
    <div className="card-body row p-5">
      <div className="coll-12 col-md-6 d-flex align-items-center justify-content-center">
        <img src="../src/assets/avatar_1.jpg" className='rounded-circle' alt="Войти" />
      </div>
      <form className="coll-12 col-md-6 mt-3 mt-md-0">
        <Formik initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={SignupScheme}
        onSubmit={(values) => console.log(values)}
        >
          {({ errors, touched }) => (
            <Form>
              <Field name="username" />
              { errors.username && touched.username ? (<div>{errors.username}</div>) : null }
              <Field name="password" />
              { errors.password && touched.password ? (<div>{errors.password}</div>) : null }
            </Form>
          )}
        </Formik>
      </form>
    </div>
  </div>
);