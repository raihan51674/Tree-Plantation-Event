import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  RouterProvider
} from "react-router";
import AuthProvider from './Authantication/Context/AuthProvider.jsx';
import './index.css';
import { router } from './Routes/Routes.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
  </StrictMode>,
)
