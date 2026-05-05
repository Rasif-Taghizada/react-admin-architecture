import { createRoot } from 'react-dom/client'
import '@/index.css'
import App from '@/App'
import '@ant-design/v5-patch-for-react-19'; 
import 'antd/dist/reset.css';
import '@/i18n.js';

if (localStorage.getItem('themeMode') === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
}

createRoot(document.getElementById('root')!).render(<App />)