import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SavedCard from "./SavedCard";

const Saved = () => {
   const drawerWidth = 300;
   const [a, setA] = useState([]);
   // const matches = useMediaQuery("(min-width:600px)");
   const matches = false;
   const userData = useSelector((state) => state.authToken.userData);
   const savedPost = userData.saved;
   useEffect(() => {
         setA(
            savedPost && savedPost.map( (data) => {
               return <SavedCard data={data} key={data}/>
            })
         );
   }, [savedPost]);
   return (
      <Box
         sx={{
            height: "100vh",
            width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` },
            overflow: "scroll",
            scrollbarWidth: "none",
         }}
      >
         <Box sx={{ p: 5, mt: { xs: "30px", sm: "0px" }, }}>
            <Typography component="h1" variant="h5">
               Saved
            </Typography>
            <Box sx={{ m: 4, display: `${matches ? "none" : "block"}` }}>
               <Grid container spacing={3}>
                  {a}
               </Grid>
            </Box>
            <Typography sx={{ color: "#6037AB", display: `${matches ? "block" : "none"}` }} variant="h6">
               Working with useMediaQuery
            </Typography>
         </Box>
      </Box>
   );
};

export default Saved;
