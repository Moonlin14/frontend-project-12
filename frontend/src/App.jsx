import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Flip } from 'react-toastify';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatPage from './Pages/ChatPage';
import LoginPage from './Pages/LoginPage';
import NotFoundPage from './Pages/NotFoundPage';
import SignUpPage from './Pages/SignUpPage';
import MainNavigation from './components/PagesComponents/MainNavigation';
import routes from './utils/routes';
import AuthProvider from './contexts/authorization/AuthProvider';
import store from './store/store';

const App = () => (
  <div className="d-flex flex-column h-100">
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        draggable
        theme="light"
        transition={Flip}
      />
      <Provider store={store}>
        <AuthProvider>
          <MainNavigation />
          <Routes>
            <Route path={routes.mainPagePath()} element={<ChatPage />} />
            <Route path={routes.loginPagePath()} element={<LoginPage />} />
            <Route path={routes.signUpPagePath()} element={<SignUpPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </div>
);

export default App;
