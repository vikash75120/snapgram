import { blueGrey, deepPurple, grey, red } from "@mui/material/colors";
import { createSlice } from "@reduxjs/toolkit";

const darkTheme = {
   code: "dark",
   textColor: grey[50],
   bgColor: grey[900],
   iconColor: deepPurple[400],
   cardColor:"#242424",
   hoverCardColor: "#262626"
};
const lightTheme = {
   code: "light",
   textColor: grey[900],
   bgColor: grey[50],
   iconColor: deepPurple[400],
   cardColor:blueGrey[50],
   hoverCardColor:blueGrey[100]
};
const theme = localStorage.getItem("theme")==="dark"? darkTheme:lightTheme
// localStorage.setItem("theme", theme.code);

const themeSlice = createSlice({
   name: " toggleTheme",
   initialState: theme,
   reducers: {
      toggleTheme: (state) => {
         if (state.code === "light") {
            localStorage.setItem("theme", "dark");
            return darkTheme;
         } else {
            localStorage.setItem("theme", "light");
            return lightTheme;
         }
      },
   },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
