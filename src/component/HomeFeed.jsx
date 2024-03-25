import { Box, List, Typography } from "@mui/material";
import PostCard from "../cards/PostCard";
import { useSelector } from "react-redux";

const HomeFeed = ({ drawerWidth }) => {
   let userData = useSelector((state) => state.authToken.userData);
   let userPost = userData.posts;
   return (
      <Box
         sx={{
            height: "100vh",
            pt: { xs: "50px", sm: "0px" },
            width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)`, lg: `calc(65% - ${drawerWidth}px)` },
            overflow: "scroll",
            scrollbarWidth: "none",
            
         }}
      >
         <Typography component="h1" variant="h5" sx={{ m: 2, mt: { xs: "30px", sm: 5 } }}>
            Home Feed
         </Typography>
         {userPost?.map((post) => (
            <List key={post.id}>
               <PostCard
                  img={post.image}
                  description={post.description}
                  id={post.id}
                  name={userData.name}
                  datePosted={post.uploadedDate}
                  userImg={userData.image}
                  like={post.like}
                  saved={post.saved}
               />
            </List>
         ))}
      </Box>
   );
};

export default HomeFeed;
