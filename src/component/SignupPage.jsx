import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { deepPurple } from "@mui/material/colors";

const SignupPage = ({ emailChange, validEmail, validPassword, handleEmailChange, handlePasswordChange, handleSubmit, setIsLogin }) => {
   const { code, bgColor, textColor, iconColor } = useSelector((state) => state.theme);
   return (
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
            Sign up
         </Typography>
         <Box component="form" noValidate onSubmit={(e) => handleSubmit(e, "signup")} sx={{ mt: 1 }}>
         <TextField
               margin="normal"
               required
               fullWidth
               id="name"
               label="Name"
               name="name"
               autoFocus
               inputProps={{style: {color: textColor}}}
               sx={{
                  "& label": {
                     color: textColor,
                  },
                  "& label.Mui-focused": {
                     color: iconColor,
                  },
                  "& .MuiInput-underline:after": {
                     borderBottomColor: iconColor,
                  },
                  "& .MuiOutlinedInput-root": {
                     "& fieldset": {
                        borderColor: textColor,
                     },
                     "&:hover fieldset": {
                        borderColor: textColor,
                     },
                     "&.Mui-focused fieldset": {
                        borderColor: iconColor,
                     },
                  },
               }}
            />
            <TextField
               error={!validEmail}
               margin="normal"
               required
               fullWidth
               id="email"
               label="Email Address"
               name="email"
               helperText={!validEmail && "Enter a valid email id"}
               ref={emailChange}
               onChange={handleEmailChange}
               inputProps={{style: {color: textColor}}}
               sx={{
                  "& label": {
                     color: textColor,
                  },
                  "& label.Mui-focused": {
                     color: iconColor,
                  },
                  "& .MuiInput-underline:after": {
                     borderBottomColor: iconColor,
                  },
                  "& .MuiOutlinedInput-root": {
                     "& fieldset": {
                        borderColor: textColor,
                     },
                     "&:hover fieldset": {
                        borderColor: textColor,
                     },
                     "&.Mui-focused fieldset": {
                        borderColor: iconColor,
                     },
                  },
               }}
            />
            <TextField
               error={!validPassword && true}
               margin="normal"
               required
               fullWidth
               name="password"
               label="Password"
               type="password"
               id="password"
               autoComplete="current-password"
               helperText={!validPassword && "password must be 6 to 12 characters and should not contain spaces"}
               onChange={handlePasswordChange}
               inputProps={{style: {color: textColor}}}
               sx={{
                  "& label": {
                     color: textColor,
                  },
                  "& label.Mui-focused": {
                     color: iconColor,
                  },
                  "& .MuiInput-underline:after": {
                     borderBottomColor: iconColor,
                  },
                  "& .MuiOutlinedInput-root": {
                     "& fieldset": {
                        borderColor: textColor,
                     },
                     "&:hover fieldset": {
                        borderColor: textColor,
                     },
                     "&.Mui-focused fieldset": {
                        borderColor: iconColor,
                     },
                  },
               }}
            />
            <FormControlLabel
               control={
                  <Checkbox
                     value="remember"
                     color="primary"
                     sx={{
                        color: textColor,
                        "&.Mui-checked": {
                           color: iconColor,
                        },
                     }}
                  />
               }
               label="Remember me"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, p: 1,bgcolor: iconColor,":hover":{bgcolor: deepPurple[500]}}}>
               Sign up
            </Button>
            <Grid container>
               <Grid item xs>
                  <Button sx={{ p: 0, fontSize: 13, textTransform: "none", display: "none",color: iconColor, }} variant="text">
                     Forget Password?
                  </Button>
               </Grid>
               <Grid item>
                  <Button sx={{ p: 0, fontSize: 13, textTransform: "none", color: iconColor }} variant="text" onClick={() => setIsLogin(true)}>
                     Oh !!! I already have an account
                  </Button>
               </Grid>
            </Grid>
         </Box>
      </Box>
   );
};

export default SignupPage;
