import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './Components/LoginPage.jsx';
import { MainPage } from './Components/MainPage.jsx';
import { ErrorPage } from './Components/ErrorPage.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />}/>
        <Route path='*' element={<ErrorPage/>}/>
        <Route path='/login' element={<LoginPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
