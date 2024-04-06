import Login from '../pages/login/index'
import Layout from '../pages/layout/index'
import Home from '../pages/home'
import Publish from '../pages/publish'
import Article from '../pages/article'

import { createBrowserRouter } from 'react-router-dom'
import { AuthRoute } from '../components/AuthRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRoute><Layout></Layout></AuthRoute>,
    children: [
      {
        path: '',
        element: <Home></Home>
      },
      {
        path: 'article',
        element: <Article></Article>
      },
      {
        path: 'publish',
        element: <Publish></Publish>
      },
    ]
  },
  {
    path: '/login',
    element: <Login></Login>
  },
])

export default router