import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import '@ant-design/v5-patch-for-react-19'; 
import 'antd/dist/reset.css';
import './i18n.ts';

createRoot(document.getElementById('root')!).render(<App />)