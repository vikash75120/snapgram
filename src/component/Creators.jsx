import { Box, Grid, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import React from "react";
import CreatorCard from "../cards/CreatorCard";

const Creators = () => {
   return (
      <Box sx={{ height: "100vh", display: { xs: "none", lg: "block" }, width: "35%", borderLeft: "1px solid #F0F0F0" }}>
         <Typography component="h1" variant="h5" m={2}>
            Top Creators
         </Typography>
         <Box sx={{ p: "15%" }}>
            <Grid container spacing={2}>
               <Grid item xs={6}>
                  <CreatorCard cardWidth={150} />
               </Grid>
               <Grid item xs={6}>
                  <CreatorCard cardWidth={150} />
               </Grid>
               <Grid item xs={6}>
                  <CreatorCard cardWidth={150} />
               </Grid>
            </Grid>
         </Box>
      </Box>
   );
};

export default Creators;
