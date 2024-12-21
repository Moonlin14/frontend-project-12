import 'react-toastify/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import getRoutes from '../routes.js';
import LoginPage  from './LoginPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import Header from './Header.jsx';
import SignUpPage from './SignUpPage.jsx';
import CheckRoute from './CheckRoute.jsx';


export default () => (
  <div className='h-100'>
    <div className="d-flex flex-column h-100">
      <BrowserRouter>
        <Header/> 
        <Routes>
          <Route path={getRoutes.chatPagePath()} element={<CheckRoute />}/>
          <Route path='*' element={<NotFoundPage />}/>
          <Route path={getRoutes.loginPagePath()} element={<LoginPage />}/>
          <Route path={getRoutes.signupPagePath()} element={<SignUpPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
    <ToastContainer 
      position='top-right'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
    />
  </div>

);
