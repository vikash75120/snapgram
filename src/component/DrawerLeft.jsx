import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, Box, Button, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import InstagramIcon from "@mui/icons-material/Instagram";
import HomeMaxOutlinedIcon from "@mui/icons-material/HomeMaxOutlined";
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../reducer/themeToggle";
import { setToken, setUserData } from "../reducer/tokenReducer";
import { auth } from "../firebase/initialApp";
import { signOut } from "firebase/auth";
import { getUserData } from "../firebase/userData";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/initialApp";


const DrawerLeft = () => {
   const { code, bgColor, textColor, iconColor } = useSelector((state) => state.theme);
   const token = useSelector((state) => state.authToken.token);
   const userData = useSelector((state) => state.authToken.userData);
   // console.log("hi from drawer");
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const NavbarItems = [
      {
         text: "Home",
         link: "/",
         icon: <HomeMaxOutlinedIcon sx={{ color: iconColor }} />,
      },
      {
         text: "Explore",
         link: "/explore",
         icon: <TravelExploreOutlinedIcon sx={{ color: iconColor }} />,
      },
      {
         text: "People",
         link: "/people",
         icon: <PeopleOutlinedIcon sx={{ color: iconColor }} />,
      },
      {
         text: "Saved",
         link: "/saved",
         icon: <BookmarkBorderOutlinedIcon sx={{ color: iconColor }} />,
      },
      {
         text: "Create Post",
         link: "/create_post",
         icon: <NoteAddOutlinedIcon sx={{ color: iconColor }} />,
      },
   ];

   useEffect(() => {
      // console.log("usEffect run or not??");
      const getUserDatafunc = async () => {
         const querySnapshot = await getDocs(collection(db, "users"));
         // console.log(querySnapshot);
         querySnapshot.forEach((doc) => {
            const data = doc.data();

            if (`"${data.userToken}"` === token) {
               // console.log("updating redux userData from useEfffect", data);
               dispatch(setUserData(data));
            }
         });
      };
      getUserDatafunc();
   }, []);

   const handleLogout = () => {
      signOut(auth)
         .then(() => {
            // Sign-out successful.
            dispatch(setToken("logout"));
            navigate("/login");
         })
         .catch((error) => {
            // An error happened.
         });
   };

   const handletoggleTheme = () => {
      dispatch(toggleTheme());
   };

   const handleUserProfile = () => {
      navigate("/UserProfile");
   };

   return (
      <Box sx={{ height: "100vh" }} bgcolor={bgColor} color={textColor}>
         <Box
            sx={{
               display: "flex",
               alignItems: "center",
               pl: 3,
               mt: 2,
               mb: 1,
               "&:hover": { cursor: "pointer" },
            }}
         >
            <InstagramIcon sx={{ margin: 1, color: iconColor }} fontSize="medium" />
            <Typography component="h1" variant="h5">
               Snapgram
            </Typography>
         </Box>
         <button style={{ backgroundColor: "transparent", boxShadow: "none", border: "none", cursor: "pointer" }} onClick={handleUserProfile}>
            <Box
               sx={{
                  display: "flex",
                  alignItems: "center",
                  pl: 3,
                  mt: 2,
                  mb: 1,
               }}
            >
               <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  {userData.image ? <img src={userData.image} style={{ objectFit: "contain", width: "55px" }}></img> : <PersonIcon />}
               </Avatar>
               <Box>
                  <Typography sx={{ margin: 0, padding: 0 }} component="h1" variant="body1" color={textColor}>
                     {userData.name ? userData.name : "Your_Name"}
                  </Typography>
                  <Typography sx={{ margin: 0, padding: 0, opacity: "50%" }} component="h1" variant="caption" color={textColor}>
                     {userData.userName ? userData.userName : "user_id"}
                  </Typography>
               </Box>
            </Box>
         </button>
         <List>
            {NavbarItems.map((item) => (
               <ListItem key={item.text} disablePadding>
                  <ListItemButton
                     sx={{
                        pl: 4,
                        mt: 1,
                     }}
                  >
                     <Link
                        style={{
                           textDecoration: "none",
                           width: "100%",
                           color: textColor,
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "center",
                        }}
                        to={item.link}
                     >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                     </Link>
                  </ListItemButton>
               </ListItem>
            ))}
         </List>
         <Button
            sx={{
               color: textColor,
               width: "100%",
               display: "flex",
               justifyContent: "start",
               pl: 4,
               pt: 1,
               pb: 1,
               mb: 2,
               mt: 1,
               textTransform: "none",
               ":hover": { bgcolor: code === "dark" ? "#202020" : "#F1F1F1" },
            }}
            onClick={handleLogout}
         >
            <LogoutRoundedIcon sx={{ pr: 4, color: iconColor }} />
            Logout
         </Button>
         <Button
            sx={{
               color: textColor,
               width: "100%",
               display: "flex",
               justifyContent: "start",
               pl: 4,
               pt: 1,
               pb: 1,
               mb: 2,
               mt: 1,
               textTransform: "none",
               ":hover": { bgcolor: code === "dark" ? "#202020" : "#F1F1F1" },
            }}
            onClick={handletoggleTheme}
         >
            <DarkModeRoundedIcon sx={{ pr: 4, color: iconColor }} />
            {code === "dark" ? "Light" : "Dark"}
         </Button>
      </Box>
   );
};

export default DrawerLeft;
