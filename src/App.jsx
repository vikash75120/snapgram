// import Login from './component/Login'
import Home from "./component/Home";
import LoginSignup from "./component/LoginSignup";
import { Box } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./error/Error";
import Explore from "./component/Explore";
import HomeFeed from "./component/HomeFeed";
import Creators from "./component/Creators";
import People from "./component/People";
import Saved from "./component/Saved";
import CreatePost from "./component/CreatePost";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import UserProfile from "./component/UserProfile";
import EditUserProfile from "./component/EditUserProfile";
import CardDetails from "./component/CardDetails";

const App = () => {
   const drawerWidth = 300;
   const currentTheme = useSelector((state) => state.theme);
   const token = useSelector((state) => state.authToken.token);

   const router = createBrowserRouter([
      {
         path: "/",
         element: <Home drawerWidth={drawerWidth} />,
         errorElement: <Error />,
         children: [
            {
               index: true,
               path: "/",
               element: (
                  <Box sx={{ display: "flex" }}>
                     <Box sx={{ width: "300px", height: "100vh", display: { xs: "none", sm: "block" } }}></Box>
                     <HomeFeed drawerWidth={drawerWidth} />
                     <Creators />
                  </Box>
               ),
            },
            {
               path: "explore",
               element: (
                  <Box sx={{ display: "flex" }}>
                     <Box sx={{ width: "300px", height: "100vh", display: { xs: "none", sm: "block" } }}></Box>
                     <Explore />
                  </Box>
               ),
            },
            {
               path: "people",
               element: (
                  <Box sx={{ display: "flex" }}>
                     <Box sx={{ width: "300px", height: "100vh", display: { xs: "none", sm: "block" } }}></Box>
                     <People />
                  </Box>
               ),
            },
            {
               path: "saved",
               element: (
                  <Box sx={{ display: "flex" }}>
                     <Box sx={{ width: "300px", height: "100vh", display: { xs: "none", sm: "block" } }}></Box>
                     <Saved />
                  </Box>
               ),
            },
            {
               path: "create_post",
               element: (
                  <Box sx={{ display: "flex" }}>
                     <Box sx={{ width: "300px", height: "100vh", display: { xs: "none", sm: "block" } }}></Box>
                     <CreatePost />
                  </Box>
               ),
            },
            {
               path: "/userProfile",
               element: (
                  <Box sx={{ display: "flex" }}>
                     <Box sx={{ width: "300px", height: "100vh", display: { xs: "none", sm: "block" } }}></Box>
                     <UserProfile />
                  </Box>
               ),
            },
            {
               path: "/editUserProfile",
               element: (
                  <Box sx={{ display: "flex" }}>
                     <Box sx={{ width: "300px", height: "100vh", display: { xs: "none", sm: "block" } }}></Box>
                     <EditUserProfile />
                  </Box>
               ),
            },
            {
               path: "/card/:id",
               element: (
                  <Box sx={{ display: "flex" }}>
                     <Box sx={{ width: "300px", height: "100vh", display: { xs: "none", sm: "block" } }}></Box>
                     <CardDetails />
                  </Box>
               ),
            },
         ],
      },
      {
         path: "/login",
         element: <LoginSignup />,
      },
      {
         path: "/*",
         element: token ? <Navigate to="/" /> : <Navigate to="/login" />,
      },
   ]);
   return (
      <Box
         sx={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column" }}
         bgcolor={currentTheme.bgColor}
         color={currentTheme.textColor}
      >
         <RouterProvider router={router} />
      </Box>
   );
};

export default App;
