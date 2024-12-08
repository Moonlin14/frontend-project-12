import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './LoginPage.jsx';
import { MainPage } from './MainPage.jsx';
import { ErrorPage } from './ErrorPage.jsx';


const App = () => (
  <div className='h-100'>
    <div className="d-flex flex-column h-100">
      <BrowserRouter>
        {/* <Header/> */}
        <Routes>
          <Route path='/' element={<MainPage />}/>
          <Route path='*' element={<ErrorPage/>}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/signup' element/>
        </Routes>
      </BrowserRouter>
    </div>
  </div>

);


export default App
