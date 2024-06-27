import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AppLayout from './layouts/layout'
import LandingPage from './page/landing'
import Dashboard from './page/dashboard'
import Auth from './page/auth'
import Link from './page/link'
import RedirectedLink from './page/redirected-link'
import { URLProvider } from './context'



const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/auth',
        element: <Auth />
      },
      {
        path: '/link/:id',
        element: <Link />
      },
      {
        path: '/:id',
        element: <RedirectedLink />
      },
    ]
  }
])

const App = () => {
  return (
    <URLProvider>
      <RouterProvider router={router} />
    </URLProvider>
      
  )
}

export default App