import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ToastProvider } from './Components/headless/ToastNotifications/index.tsx';
import { BrowserRouter as Router } from 'react-router-dom';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <ToastProvider>
      <App />
    </ToastProvider>
  </Router>
);
