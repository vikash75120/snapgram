import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SmallPostCard from "../cards/SmallPostCard";
import PersonIcon from '@mui/icons-material/Person';
import SavedCard from "./SavedCard";

const UserProfile = () => {
   const drawerWidth = 300;
   const { textColor, iconColor, cardColor, hoverCardColor } = useSelector((state) => state.theme);
   const userData = useSelector((state) => state.authToken.userData);
   const navigate = useNavigate();
   const [postLikedState, setpostLikedState] = useState(true);

   const handleEditUserProfile = () => {
      navigate("/edituserprofile");
   };

   const handlePostLikedClick=()=>{
      setpostLikedState(prev=>!prev)
   }

   const [a, setA] = useState([]);
   const likedPost = userData.liked;
   useEffect(() => {
         setA(
            likedPost && likedPost.map( (data) => {
               return <SavedCard data={data} key={data}/>
            })
         );
   }, [likedPost]);

   return (
      <Box
         sx={{
            height: "100vh",
            width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` },
            pt: { xs: "30px", sm: "0px" },
            overflow: "scroll",
            scrollbarWidth: "none",
         }}
      >
         <Box sx={{ m: 5 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
               <Typography component="h1" variant="h5">
                  User Profile
               </Typography>
               <Button
                  variant="contained"
                  sx={{
                     bgcolor: cardColor,
                     boxShadow: "none",
                     textTransform: "none",
                     p: 0,
                     pl: 1,
                     pr: 1,
                     height: 40,
                     ":hover": { bgcolor: hoverCardColor, boxShadow: "none" },
                     color: textColor,
                  }}
                  onClick={handleEditUserProfile}
               >
                  <EditIcon sx={{ mr: "4px ", color: iconColor, fontSize: "15px" }} /> Edit Pofile
               </Button>
            </Box>
            <Box
               sx={{
                  display: "flex",
                  alignItems: "center",
                  pl: { xs: 0, md: 3 },
                  mt: 2,
                  mb: 1,
               }}
            >
               <Avatar sx={{ m: 1, width: "80px", height: "80px", bgcolor: "secondary.main" }}>
                  {userData.image ? <img src={userData.image} style={{ objectFit: "contain", width: "100px" }}></img> : <PersonIcon />}
               </Avatar>
               <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", ml: 1 }}>
                  <Typography sx={{ margin: 0, padding: 0 }} component="h1" variant="body1" color={textColor}>
                     {userData.name ? userData.name : "Your_Name"}
                  </Typography>
                  <Typography sx={{ margin: 0, padding: 0, opacity: "50%" }} component="h1" variant="caption" color={textColor}>
                     {userData.userName ? userData.userName : "user_id"}
                  </Typography>
                  <Typography>{userData.bio ? userData.bio : ""}</Typography>
               </Box>
            </Box>
            <Box sx={{ display: "flex", pl: { xs: 0, md: 3 } }}>
               <Typography sx={{ mr: 2 }}>
                  <span style={{ color: iconColor }}>{userData?.posts?.length} </span>Posts
               </Typography>
               <Typography sx={{ mr: 2 }}>
                  <span style={{ color: iconColor }}>{userData?.followers?.length} </span>Followers
               </Typography>
               <Typography sx={{ mr: 2 }}>
                  <span style={{ color: iconColor }}>{userData?.followings?.length} </span>Following
               </Typography>
            </Box>
            <Box sx={{ pl: { xs: 0, md: 3 }, mt: 3 }}>
               <Box>
                  <Button
                     variant="contained"
                     sx={{
                        bgcolor: postLikedState ? hoverCardColor : cardColor,
                        boxShadow: "none",
                        textTransform: "none",
                        p: 0,
                        pl: 1,
                        pr: 1,
                        mr: 1,
                        height: 40,
                        ":hover": { bgcolor: hoverCardColor, boxShadow: "none" },
                        color: textColor,
                     }}
                     onClick={handlePostLikedClick}
                  >
                     <CropOriginalIcon sx={{ mr: "4px ", color: iconColor, fontSize: "15px" }} /> Posts
                  </Button>
                  <Button
                     variant="contained"
                     sx={{
                        bgcolor: postLikedState ? cardColor : hoverCardColor,
                        boxShadow: "none",
                        textTransform: "none",
                        p: 0,
                        pl: 1,
                        pr: 1,
                        height: 40,
                        ":hover": { bgcolor: hoverCardColor, boxShadow: "none" },
                        color: textColor,
                     }}
                     onClick={handlePostLikedClick}
                  >
                     <FavoriteBorderIcon sx={{ mr: "4px ", color: iconColor, fontSize: "15px" }} /> Liked Posts
                  </Button>
               </Box>
               {postLikedState ? (
                  <Box sx={{ mt: 4 }}>
                     <Grid container spacing={3}>
                        {userData.posts && userData.posts.map((post) => (
                           <Grid item xs={12} sm={12} md={4} lg={3} key={post.id}>
                              <SmallPostCard img={post.image} userName={userData.name} userImg={userData.image} id={post.id} like={post.like} saved={post.saved} />
                           </Grid>
                        ))}
                     </Grid>
                  </Box>
               ) : (
                  <Box sx={{ mt: 4 }}>
                     <Grid container spacing={3}>
                     {a}
                     </Grid>
                  </Box>
               )}
            </Box>
         </Box>
      </Box>
   );
};

export default UserProfile;
