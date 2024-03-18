import { Box } from "@mui/material";
import React, { useEffect } from "react";
import Navbar2 from "./Navbar2";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Home = ({ drawerWidth }) => {
   const navigate = useNavigate();
   const authToken = useSelector((state) => state.authToken.token);

   useEffect(() => {
      if (!authToken) {
         navigate("/login");
      }
   },[]);

   return (
      <Box>
         <Navbar2 drawerWidth={drawerWidth} />
         <Outlet />
      </Box>
   );
};

export default Home;
