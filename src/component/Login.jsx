import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useState } from "react";

// TODO remove, this demo shouldn't need to reset the theme.

const Login = () => {
   const [EmailChange, setEmailChange] = useState();
   const [validEmail,setValidEmail] = useState(true);
   const [validPassword,setValidPassword] = useState(true);

   function validateEmail(email) {
      var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(email);
   }
   const handleEmailChange = (e) => {
      setEmailChange(e.target.value);
      setValidEmail(validateEmail(EmailChange));
   };

   const handlePasswordChange = (e) => {
    setValidPassword(e.target.value);
 };
   const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
         email: data.get("email"),
         password: data.get("password"),
      });
   };

   return (
      <Grid container component="main" sx={{ height: "100vh" }}>
         <CssBaseline />
         <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
         >
            <Box
               sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
               }}
            >
               <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
               </Avatar>
               <Typography component="h1" variant="h5">
                  Sign in
               </Typography>
               <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
               >
                  <TextField
                     error = {!validEmail}
                     margin="normal"
                     required
                     fullWidth
                     id="email"
                     label="Email Address"
                     name="email"
                     autoComplete="email"
                     autoFocus
                     helperText = {!validEmail && "Enter a valid email id"}
                     onChange={handleEmailChange}
                  />
                  <TextField
                  error = {validPassword.length<6 && true}
                     margin="normal"
                     required
                     fullWidth
                     name="password"
                     label="Password"
                     type="password"
                     id="password"
                     autoComplete="current-password"
                     helperText = {validPassword.length<6 && "Enter a valid email id"}
                     onChange={handlePasswordChange}
                  />
                  <FormControlLabel
                     control={<Checkbox value="remember" color="primary" />}
                     label="Remember me"
                  />
                  <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     sx={{ mt: 3, mb: 2 }}
                  >
                     Sign In
                  </Button>
                  {/* <Grid container>
                     <Grid item xs>
                        <Link href="#" variant="body2">
                           Forgot password?
                        </Link>
                     </Grid>
                     <Grid item>
                        <Link href="#" variant="body2">
                           {"Don't have an account? Sign Up"}
                        </Link>
                     </Grid>
                  </Grid> */}
               </Box>
            </Box>
         </Grid>
         <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
               backgroundImage:
                  "url(https://source.unsplash.com/random?wallpapers)",
               backgroundRepeat: "no-repeat",
               backgroundColor: (t) =>
                  t.palette.mode === "light"
                     ? t.palette.grey[50]
                     : t.palette.grey[900],
               backgroundSize: "cover",
               backgroundPosition: "center",
            }}
         />
      </Grid>
   );
};

export default Login;
