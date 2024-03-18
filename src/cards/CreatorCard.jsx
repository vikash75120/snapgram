import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useSelector } from "react-redux";
import { deepPurple } from "@mui/material/colors";

const CreatorCard = ({ cardWidth,name,userName,userImg }) => {
   const { bgColor, textColor, iconColor, cardColor } = useSelector((state) => state.theme);
   return (
      <Card
         sx={{
            maxWidth: cardWidth,
            pl: "5px",
            pr: "5px",
            pt: "20px",
            pb: "20px",
            border: "none",
            boxShadow: "none",
            bgcolor: cardColor,
            display: "block",
            m: "auto",
         }}
      >
         <CardActionArea
            sx={{
               mt: "5px",
               pointerEvents: "none",
               ".MuiCardActionArea-focusHighlight": {
                  background: "transparent",
               },
            }}
         >
            <CardMedia
               component="img"
               height="60"
               image={userImg?userImg:"https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"}
               alt="userImg"
               sx={{
                  borderRadius: "50%",
                  width: "60px",
                  display: "block",
                  margin: "auto",
               }}
            />
            <CardContent sx={{ p: "0", mt: 1, color: textColor }}>
               <Typography gutterBottom variant="subtitle2" component="div" sx={{ textAlign: "center", m: 0, p: 0 }}>
                  {name?name:"Lizard"}
               </Typography>
               <Typography variant="subtitle1" color="text.secondary" sx={{ textAlign: "center", m: 0, p: 0, fontSize: "10px", color: textColor }}>
                  {userName?userName:"@Lizard"}
               </Typography>
            </CardContent>
         </CardActionArea>
         <CardActions>
            <Button
               size="small"
               color="primary"
               variant="contained"
               sx={{ display: "block", margin: "auto", bgcolor: iconColor, ":hover": { bgcolor: deepPurple[500] } }}
            >
               Follow
            </Button>
         </CardActions>
      </Card>
   );
};

export default CreatorCard;
