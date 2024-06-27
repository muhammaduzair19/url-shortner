import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AppLayout from './layouts/layout'
import LandingPage from './page/landing'
import Dashboard from './page/dashboard'
import Auth from './page/auth'
import Link from './page/link'
import RedirectedLink from './page/redirected-link'
import { URLProvider } from './context'
import RequiredAuth from './components/required-auth'



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
        element: (
          <RequiredAuth>
            <Dashboard />
          </RequiredAuth>
        )

      },
      {
        path: '/auth',
        element: <Auth />
      },
      {
        path: '/link/:id',
        element: (
          <RequiredAuth>
            <Link />
          </RequiredAuth>
        )
      },
      {
        path: '/:id',
        element: (
          <RequiredAuth>
            <RedirectedLink />
          </RequiredAuth>
        )
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