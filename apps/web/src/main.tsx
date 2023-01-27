import { createRoot } from 'react-dom/client';
import App from './App';
import 'tw-config/tw.css';
import { BrowserRouter } from 'react-router-dom';
createRoot(document.getElementById('root') as HTMLElement).render(<App />);
