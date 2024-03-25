import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CreatorCard from "../cards/CreatorCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/initialApp";

const People = () => {
   const drawerWidth = 300;
   const [topCreator, setTopCreator] = useState([]);

   useEffect(() => {
      const getUserData = async () => {
         const querySnapshot = await getDocs(collection(db, "users"));
         const array = querySnapshot.docs.map((doc) => doc.data());
         setTopCreator(array);
         // console.log(topCreator);
      };
      getUserData();
   }, []);

   return (
      <Box sx={{ height: "100vh", width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` },  }}>
         <Typography component="h1" variant="h5" m={5} sx={{mt: { xs: "30px", sm: 5 },}} >
            People
         </Typography>
         <Box sx={{ p: "10%" }}>
            <Grid container spacing={2}>
               {topCreator &&
                  topCreator.map((data) => (
                     <Grid item xs={6} sm={6} md={4} key={data.email}>
                        <CreatorCard cardWidth={230} name={data.name} userName={data.userName} userImg={data.image} />
                     </Grid>
                  ))}
            </Grid>
         </Box>
      </Box>
   );
};

export default People;
