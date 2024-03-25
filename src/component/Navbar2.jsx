import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InstagramIcon from "@mui/icons-material/Instagram";
import { deepPurple, grey } from "@mui/material/colors";
import DrawerLeft from "./DrawerLeft";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar2 = ({ drawerWidth }) => {
   const [mobileOpen, setMobileOpen] = useState(false);
   const [isClosing, setIsClosing] = useState(false);

   const {code,bgColor,textColor,iconColor} = useSelector((state) => state.theme);

   const handleDrawerClose = () => {
      setIsClosing(true);
      setMobileOpen(false);
   };

   const handleDrawerTransitionEnd = () => {
      setIsClosing(false);
   };

   const handleDrawerToggle = () => {
      if (!isClosing) {
         setMobileOpen(!mobileOpen);
      }
   };

   return (
      <Box sx={{ display: "flex", p: 0, m: 0 }} bgcolor={bgColor}>
         <AppBar
            position="fixed"
            sx={{
               display: { sm: "none" },
               bgcolor: bgColor,
            }}
         >
            <Toolbar>
               <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{
                     mr: 2,
                     display: { sm: "none" },
                     color: deepPurple[400],
                  }}
               >
                  <MenuIcon />
               </IconButton>
               <Box
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     ml: 1,
                     "&:hover": { cursor: "pointer" },
                  }}
               >
                  <InstagramIcon sx={{ margin: 1, color: iconColor }} fontSize="medium" />
                  <Typography variant="h6" noWrap component="div" color={ textColor }>
                     Snapgram
                  </Typography>
               </Box>
            </Toolbar>
         </AppBar>
         <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
            <Drawer
               variant="temporary"
               open={mobileOpen}
               onTransitionEnd={handleDrawerTransitionEnd}
               onClose={handleDrawerClose}
               ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
               }}
               sx={{
                  display: { xs: "block", sm: "none" },
                  "& .MuiDrawer-paper": {
                     boxSizing: "border-box",
                     width: drawerWidth,
                  },
               }}
            >
               
               <DrawerLeft handleDrawerToggle={handleDrawerToggle}  />
            </Drawer>
            <Drawer
               variant="permanent"
               sx={{
                  display: { xs: "none", sm: "block" },
                  "& .MuiDrawer-paper": {
                     boxSizing: "border-box",
                     width: drawerWidth,
                  },
               }}
               open
            >
               <DrawerLeft />
            </Drawer>
         </Box>
      </Box>
   );
};

export default Navbar2;
