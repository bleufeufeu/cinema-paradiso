import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import routes from './routes.jsx'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './CartContext.jsx'
import Navbar from './components/Navbar/Navbar.jsx'

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
  <CartProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </CartProvider>
)
