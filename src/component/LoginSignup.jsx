import * as React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUserData } from "../reducer/tokenReducer";
import { auth, db } from "../firebase/initialApp";
import { collection, doc, addDoc, updateDoc, getDocs } from "firebase/firestore";
import {  getUserDataToUpdate } from "../firebase/userData";

const LoginSignup = () => {
   const token = useSelector((state) => state.authToken.token);

   const { bgColor, textColor } = useSelector((state) => state.theme);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   useEffect(() => {
      if (token) {
         navigate("/");
      }
   }, []);

   const emailChange = useRef("");
   const [validEmail, setValidEmail] = useState(true);
   const [validPassword, setValidPassword] = useState(true);
   const [isLogin, setIsLogin] = useState(true);
   const [errorWhileSubmit, setErrorWhileSubmit] = useState({ errorText: "", errorValue: false });

   function validateEmail(email) {
      var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(email);
   }
   const handleEmailChange = (e) => {
      if (e.target.value.length < 1) {
         setValidEmail(true);
      } else {
         setValidEmail(validateEmail(e.target.value));
      }
   };

   const handlePasswordChange = (e) => {
      const curretEnteredValue = e.target.value.charAt(e.target.value.length - 1);
      if (e.target.value.length === 0) {
         setValidPassword(true);
      } else if (e.target.value.length < 6 || e.target.value.length > 12 || curretEnteredValue === " ") {
         setValidPassword(false);
      } else {
         setValidPassword(true);
      }
      const prevPassword = e.target.value;
   };

   const handleSubmit = async (event, type) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const formDetails = {
         name: data.get("name"),
         email: data.get("email"),
         password: data.get("password"),
      };

      if (formDetails.email !== "" && formDetails.password !== "" && validEmail === true && validPassword === true) {
         //firebase create new user with email and password
         if (type === "signup") {
            let user;
            try {
               await createUserWithEmailAndPassword(auth, formDetails.email, formDetails.password).then((userCredential) => {
                  // Signed up
                  user = userCredential.user;
                  console.log("Successfully Signed Up", user);
                  localStorage.setItem("token", JSON.stringify(user.accessToken));
                  dispatch(setToken("signup"));
                  navigate("/");
                  // ...
               });
               await addDoc(collection(db, "users"), {
                  name: formDetails.name,
                  email: formDetails.email,
                  userToken: user.accessToken,
               });
            } catch (error) {
               setErrorWhileSubmit({ errorText: error.code, errorValue: error.message });
               // ..
            }
         }

         //firebase login with email and password
         else if (type === "login") {
            let user;
            try {
               await signInWithEmailAndPassword(auth, formDetails.email, formDetails.password).then((userCredential) => {
                  // login in
                  user = userCredential.user;
                  console.log("Successfully Logged In", user);
                  localStorage.setItem("token", JSON.stringify(user.accessToken));
                  dispatch(setToken("login"));
                  navigate("/");
                  // ...
               });
               const docId = await getUserDataToUpdate(formDetails.email, dispatch);
               const docRef = doc(db, "users", docId);
               updateDoc(docRef, {
                  userToken: user.accessToken,
               }).then(() => {
                  getDocs(collection(db, "users")).then((querySnapshot) => {
                     querySnapshot.forEach((doc) => {
                        const data = doc.data();
                        // console.log((`token with data.userToken   "${data.userToken}"`))
                        // console.log((`token with token   "${token}"`))
                        if (`"${data.userToken}"` === token) {
                           dispatch(setUserData(data));
                           console.log("when this run?????", data);
                        }
                     });
                  });
               });
               const userRef = doc(db, "users", "jQRg611Jai0K31Uwgz7p");

               // console.log("Successfully Updated");
               // console.log("does this app reach this code");
            } catch (error) {
               setErrorWhileSubmit({ errorText: error.code, errorValue: error.message });
            }
         }
      }
   };

   return (
      !token && (
         <Grid container component="main" sx={{ height: "100vh" }}>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square bgcolor={bgColor} color={textColor}>
               {isLogin ? (
                  <LoginPage
                     emailChange={emailChange}
                     validEmail={validEmail}
                     validPassword={validPassword}
                     handleEmailChange={handleEmailChange}
                     handlePasswordChange={handlePasswordChange}
                     handleSubmit={handleSubmit}
                     setIsLogin={setIsLogin}
                     errorWhileSubmit={errorWhileSubmit}
                  />
               ) : (
                  <SignupPage
                     emailChange={emailChange}
                     validEmail={validEmail}
                     validPassword={validPassword}
                     handleEmailChange={handleEmailChange}
                     handlePasswordChange={handlePasswordChange}
                     handleSubmit={handleSubmit}
                     setIsLogin={setIsLogin}
                     errorWhileSubmit={errorWhileSubmit}
                  />
               )}
               <Typography color="error" sx={{ fontSize: "13px", textAlign: "center" }}>
                  {errorWhileSubmit.errorValue && errorWhileSubmit.errorText}
               </Typography>
            </Grid>
            <Grid
               item
               xs={false}
               sm={4}
               md={7}
               sx={{
                  backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
                  backgroundRepeat: "no-repeat",
                  backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
                  backgroundSize: "cover",
                  backgroundPosition: "center",
               }}
            />
         </Grid>
      )
   );
};

export { auth };
export default LoginSignup;
