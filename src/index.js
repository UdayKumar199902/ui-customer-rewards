import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StrictMode } from 'react';
import Layout from './components/layOut';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Layout>
    
    <App />
    </Layout>
  </StrictMode>
);

