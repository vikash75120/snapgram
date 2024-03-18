import { Avatar, Box, Button, FormControl, InputLabel, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deepPurple } from "@mui/material/colors";
import CustomTextField from "./CustomTextField";
import { db } from "../firebase/initialApp";
import { doc, updateDoc } from "firebase/firestore";
import { getUserDataToUpdate } from "../firebase/userData";
import { setUserData } from "../reducer/tokenReducer";
import uploadImage from "./uploadImage";

const CreatePost = () => {
   const drawerWidth = 300;
   const { iconColor, cardColor, textColor } = useSelector((state) => state.theme);
   const userData = useSelector((state) => state.authToken.userData);
   const dispatch = useDispatch();
   const [file, setFile] = useState("");
   const [imageUrlState, setImageUrlState] = useState("");
   // console.log(imageUrlState)

   const textFieldDetails = [
      {
         id: "discription",
         label: "Discription",
         name: "discription",
         rows: 5,
         placeholder: "Post description",
      },
   ];

   const HandleCreatePost = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      uploadImage(file);
      const docId = await getUserDataToUpdate(userData.email, dispatch);
      const docRef = doc(db, "users", docId);
      const postData = {
         description: data.get("discription"),
         image: imageUrlState,
         like: false,
         saved: false,
         id:`${docId}@${userData.posts.length}`,
         uploadedDate: new Date().toDateString(),
      };
      // console.log(postData.id)
      const arr = [...userData.posts, postData];
      event.target.reset();
      setImageUrlState("");

      await updateDoc(docRef, {
         posts: arr,
      });
      dispatch(setUserData({ posts: arr }));
   };

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
               Create Post
            </Typography>
            <Box sx={{ ml: "6%", mr: "6%" }}>
               <Box component="form" noValidate onSubmit={HandleCreatePost} sx={{ mt: 1 }}>
                  {textFieldDetails.map((textFieldItem) => (
                     <CustomTextField
                        key={textFieldItem.id}
                        id={textFieldItem.id}
                        label={textFieldItem.label}
                        name={textFieldItem.name}
                        rows={textFieldItem.rows}
                        defaultValue={textFieldItem.defaultValue}
                        placeholder={textFieldItem.placeholder}
                     />
                  ))}
                  <Box sx={{ mt: 2, mb: 2 }}>
                     <Avatar sx={{ width: "100%", height: "300px", borderRadius: "10px", bgcolor: cardColor }}>
                        {file ? (
                           <img src={imageUrlState ? URL.createObjectURL(file) : ""} style={{ objectFit: "contain", width: "100%" }} />
                        ) : (
                           <Typography variant="h6" sx={{ opacity: "50%", color: textColor }}>
                              Add Photo
                           </Typography>
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
                        <Typography sx={{ textAlign: "center", mt: 2 }}>Add Image +</Typography>
                        <input type="file" hidden onChange={(e) => setFile(e.target.files[0])} />
                     </Box>
                  </Box>
                  <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     disabled={imageUrlState ? false : true}
                     sx={{
                        mt: 3,
                        mb: 2,
                        p: 1,
                        bgcolor: iconColor,
                        color: textColor,
                        "&:disabled": {
                           backgroundColor: cardColor,
                           color:textColor
                        },
                        ":hover": { bgcolor: deepPurple[500] },
                     }}
                  >
                     Submit
                  </Button>
               </Box>
            </Box>
         </Box>
      </Box>
   );
};

export default CreatePost;
