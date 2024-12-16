import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage  from './LoginPage.jsx';
import MainPage from './MainPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import Header from './Header.jsx';
import SignUpPage from './SignUpPage.jsx';
import getRoutes from '../routes.js';


const App = () => (
  <div className='h-100'>
    <div className="d-flex flex-column h-100">
      <BrowserRouter>
        <Header/> 
        <Routes>
          <Route path={getRoutes.chatPagePath()} element={<MainPage />}/>
          <Route path='*' element={<NotFoundPage />}/>
          <Route path={getRoutes.loginPagePath()} element={<LoginPage />}/>
          <Route path={getRoutes.signupPagePath()} element={<SignUpPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  </div>

);


export default App
