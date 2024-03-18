import { Avatar, Box, Button, FormControl, InputLabel, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deepPurple } from "@mui/material/colors";
import CustomTextField from "./CustomTextField";
import { db } from "../firebase/initialApp";
import { doc, updateDoc } from "firebase/firestore";
import { getUserDataToUpdate } from "../firebase/userData";
import { setUserData } from "../reducer/tokenReducer";
import PersonIcon from "@mui/icons-material/Person";
import uploadImage from "./uploadImage";
import { useNavigate } from "react-router-dom";

const EditUserProfile = () => {
   const drawerWidth = 300;
   const { textColor, bgColor, iconColor, cardColor, hoverCardColor } = useSelector((state) => state.theme);
   const userData = useSelector((state) => state.authToken.userData);
   const dispatch = useDispatch();
   const [validEmail, setValidEmail] = useState(true);
   const [file, setFile] = useState("");
   const [imageUrlState, setImageUrlState] = useState("");
   const navigate = useNavigate();
   // console.log(imageUrlState)

   const textFieldDetails = [
      {
         id: "name",
         label: "Name",
         name: "name",
         defaultValue: userData.name,
         placeholder: "name",
      },
      {
         id: "userName",
         label: "User Name",
         name: "userName",
         defaultValue: userData.userName,
         placeholder: "@username",
      },
      {
         id: "email",
         label: "Email",
         name: "email",
         defaultValue: userData.email,
         placeholder: "abc@gmail.com",
      },
      {
         id: "bio",
         label: "Bio",
         name: "bio",
         defaultValue: userData.bio,
         rows: 4,
         placeholder: "discribe yourself",
      },
   ];

   function validateEmail(email) {
      var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(email);
   }

   const handleUserProfileSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const userProfileData = {
         name: data.get("name"),
         userName: data.get("userName"),
         email: data.get("email"),
         bio: data.get("bio"),
      };
      uploadImage(file);
      setValidEmail(validateEmail(userProfileData.email));
      if (validEmail) {
         console.log(userProfileData);
         const docId = await getUserDataToUpdate(userData.email, dispatch);
         const docRef = doc(db, "users", docId);
         await updateDoc(docRef, {
            name: userProfileData.name,
            userName: userProfileData.userName,
            email: userProfileData.email,
            bio: userProfileData.bio,
            image: imageUrlState,
         });
         dispatch(setUserData({ ...userProfileData, image: imageUrlState }));
      }
   };

   const handleCancel = ()=>{
    navigate("/userprofile")
   }

   useEffect(() => {
      uploadImage(file, setImageUrlState);
   }, [file]);
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
            <Typography component="h1" variant="h5" m={2}>
               Edit Profile
            </Typography>
            <Box sx={{ ml: "6%", mr: "6%" }}>
               <Box sx={{ display: "flex" }}>
                  <Avatar sx={{ mt: 2, width: "80px", height: "80px", bgcolor: "secondary.main" }}>
                     {file ? (
                        <img src={URL.createObjectURL(file)} style={{ objectFit: "contain", width: "100px" }} />
                     ) : userData.image ? (
                        <img src={userData.image} style={{ objectFit: "contain", width: "100px" }} />
                     ) : (
                        <PersonIcon sx={{ fontSize: "40px" }} />
                     )}
                  </Avatar>
                  <Box
                     variant="text"
                     component="label"
                     sx={{
                        textTransform: "none",
                        color: deepPurple[400],
                        ":hover": { color: deepPurple[500], bgcolor: "transparent", cursor: "pointer" },
                     }}
                  >
                     <Typography sx={{ mt: 5, ml: 1 }}>Change profile pic</Typography>
                     <input type="file" hidden onChange={(e) => setFile(e.target.files[0])} />
                  </Box>
               </Box>
               <Box component="form" noValidate onSubmit={(e) => handleUserProfileSubmit(e, "login")} sx={{ mt: 1 }}>
                  {textFieldDetails.map((textFieldItem) => (
                     <CustomTextField
                        key={textFieldItem.id}
                        id={textFieldItem.id}
                        label={textFieldItem.label}
                        name={textFieldItem.name}
                        rows={textFieldItem.rows}
                        defaultValue={textFieldItem.defaultValue}
                        placeholder={textFieldItem.placeholder}
                        validateEmail={validEmail}
                     />
                  ))}
                  <Box sx={{ display: "flex" }}>
                     <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                           mt: 3,
                           mb: 2,
                           mr: 2,
                           p: 1,
                           bgcolor: cardColor,
                           boxShadow: "none",
                           color: textColor,
                           ":hover": { bgcolor: hoverCardColor, boxShadow: "none" },
                        }}
                        onClick={handleCancel}
                        
                     >
                        cancel
                     </Button>
                     <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, p: 1, bgcolor: iconColor, ":hover": { bgcolor: deepPurple[500] } }}
                     >
                        Submit
                     </Button>
                  </Box>
               </Box>
            </Box>
         </Box>
      </Box>
   );
};

export default EditUserProfile;
