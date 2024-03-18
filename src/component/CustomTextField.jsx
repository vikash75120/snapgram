import {  FormLabel, TextField } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import React from "react";
import { useSelector } from "react-redux";

const CustomTextField = ({ id, label, name, rows, defaultValue ,placeholder,validateEmail}) => {
   const { textColor, iconColor, bgColor } = useSelector((state) => state.theme);
   return (
      <>
      <FormControlLabel
               control={
                  <FormLabel/>
               }
               label={label}
               sx={{mb:0,mt:2,ml:0}}
            />
         <TextField
            margin="normal"
            fullWidth
            id={id}
            name={name}
            multiline
            rows={rows}
            defaultValue={defaultValue}
            placeholder={placeholder}
            helperText={name ==='email' && !validateEmail ? 'use ypur common sense':""}
            inputProps={{ style: { color: textColor }, }}
            sx={{mt:0,
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
                  }
               },
               '&::placeholder': {
                  opacity:"10%",
                  color:"red"
                },
            }}
         />
      </>
   );
};

export default CustomTextField;
