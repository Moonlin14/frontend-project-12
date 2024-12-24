import 'bootstrap/dist/css/bootstrap.min.css'
import { createRoot } from 'react-dom/client'
import init from './init.jsx';

const app = async () => {
  createRoot(document.getElementById('root')).render(await init());
};

app();