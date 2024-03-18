import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeMaxOutlinedIcon from "@mui/icons-material/HomeMaxOutlined";
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import PersonIcon from "@mui/icons-material/Person";
import InstagramIcon from "@mui/icons-material/Instagram";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { deepPurple, grey } from "@mui/material/colors";
import { Avatar, Typography } from "@mui/material";

const Navbar = () => {
   const NavbarItems = [
      {
         text: "Home",
         icon: <HomeMaxOutlinedIcon sx={{ color: deepPurple[400] }} />,
      },
      {
         text: "Explore",
         icon: <TravelExploreOutlinedIcon sx={{ color: deepPurple[400] }} />,
      },
      {
         text: "People",
         icon: <PeopleOutlinedIcon sx={{ color: deepPurple[400] }} />,
      },
      {
         text: "Saved",
         icon: <BookmarkBorderOutlinedIcon sx={{ color: deepPurple[400] }} />,
      },
      {
         text: "Create Post",
         icon: <NoteAddOutlinedIcon sx={{ color: deepPurple[400] }} />,
      },
   ];
   return (
      <Box sx={{ width: 250 }} role="presentation">
         <Box sx={{display: "flex"}}>
         <Box
            sx={{
               display: "flex",
               alignItems: "center",
               ml: 2,
               mt: 2,
               mb: 1,
               "&:hover": { cursor: "pointer" },
               
            }}
            
         >
            <InstagramIcon
               sx={{ margin: 1, color: deepPurple[400] }}
               fontSize="medium"
            />
            <Typography component="h1" variant="h5">
               Snapgram
            </Typography>
         </Box>
         </Box>


         <Box>
            <Box
               sx={{
                  display: "flex",
                  alignItems: "center",
                  ml: 2,
                  mt: 1,
                  mb: 1,
                  "&:hover": { cursor: "pointer" },
               }}
            >
               <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <PersonIcon />
               </Avatar>
               <Box>
                  <Typography
                     sx={{ margin: 0, padding: 0 }}
                     component="h1"
                     variant="body1"
                  >
                     User1
                  </Typography>
                  <Typography
                     sx={{ margin: 0, padding: 0 }}
                     component="h1"
                     variant="caption"
                     color={grey[600]}
                  >
                     @User1
                  </Typography>
               </Box>
            </Box>
            <List>
               {NavbarItems.map((item) => (
                  <ListItem key={item.text} disablePadding>
                     <ListItemButton
                        sx={{
                           "&:hover": {
                              backgroundColor: deepPurple[400],
                              color: grey[50],
                           },
                           ml: 2,
                           mt: 1,
                           mb: 1,
                           borderRadius: 2,
                        }}
                     >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                     </ListItemButton>
                  </ListItem>
               ))}
            </List>
         </Box>
      </Box>
   );
};

export default Navbar;
