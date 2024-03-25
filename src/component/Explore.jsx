import { Box, Grid, Skeleton, Typography } from "@mui/material";
import "../index.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostDataThunk } from "../store/thunk/fetchPostDataThunk";
import SmallPostCard from "../cards/SmallPostCard";

const Explore = () => {
   const drawerWidth = 300;
   const dispatch = useDispatch();
   const { postData } = useSelector((state) => state.fetchPost);
   const { cardColor } = useSelector((state) => state.theme);
   const [error, setError] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
   useEffect(() => {
      setIsLoading(true);
      dispatch(getPostDataThunk("jQRg611Jai0K31Uwgz7p"))
         .unwrap()
         .catch(() => setError(true))
         .finally(() => setIsLoading(false));
   }, []);

   const loadingBox = [];
   for (let i = 0; i < 10; i++) {
      loadingBox.push(
         <Grid item xs={12} sm={12} md={4} lg={3} key={i}>
            <Box>
               <Skeleton animation="wave" variant="rectangular" height={200} sx={{ bgcolor: cardColor }} />
               <Skeleton animation="wave" sx={{ bgcolor: cardColor }} />
               <Skeleton animation="wave" sx={{ bgcolor: cardColor }} />
               <Skeleton animation="wave" sx={{ bgcolor: cardColor }} />
            </Box>
         </Grid>
      );
   }
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
               Explore
            </Typography>
            <Box className="addColor" sx={{ m: 4 }}>
               {!isLoading ? (
                  !error ? (
                     <Grid container spacing={3}>
                        {postData.map((post) => (
                           <Grid item xs={12} sm={12} md={4} lg={3} key={post.id}>
                              <SmallPostCard img={post.image} like={post.like} saved={post.saved} id={post.id} />
                           </Grid>
                        ))}
                     </Grid>
                  ) : (
                     <h1>An Error has occured</h1>
                  )
               ) : (
                  <Grid container spacing={3}>
                     {loadingBox}
                  </Grid>
               )}
            </Box>
         </Box>
      </Box>
   );
};

export default Explore;
