import React from 'react'
// import Login from './component/Login'
import Home from './component/Home'
import LoginSignup from './component/LoginSignup'
import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginSignup/>,
    },
    {
      path: "/home",
      element: <Home/>,
    }
  ]);
  return (
    <Box sx={{ width: '100vw',height:'100vh', display: 'flex', flexDirection: 'column' }} bgcolor={grey[900]} color={grey[50]}>
      <RouterProvider router={router}/>
    </Box>
  )
}

export default App
