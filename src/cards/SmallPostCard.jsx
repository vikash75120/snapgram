import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import Like from "../icons/CustomIcon";
import CustomIcon from "../icons/CustomIcon";

const ExploreCard = ({ img, userName, userImg, id, like, saved }) => {
   const { textColor, bgColor, iconColor } = useSelector((state) => state.theme);

   return (
      <Card sx={{ maxWidth: 250, border: "none", borderRadius: 5, bgcolor: "transparent", boxShadow: "none", display: "block", m: "auto" }}>
         {/* <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ1Y2tqZMiN_FHEi72Jzi4Sve5Y6ckCjvAaXAXRy0eAh-3dWTXzuXJHDTTuX8ToEwwEEw&usqp=CAU"
            alt=""
            style={{height:"250px"}}
         /> */}
         <Box sx={{ position: "relative" }}>
            <CardMedia component="img" height="250" image={img && img} alt="Post Img" />
            <Box
               sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  color: "white",
                  background: "linear-gradient(to bottom, transparent 0%, #1D1D1D 100%)",
                  border: "none",
               }}
            >
               <CardHeader
                  avatar={
                     <Avatar sx={{ bgcolor: red[500], height: 20, width: 20 }} aria-label="recipe">
                        {userImg ? <img src={userImg} style={{ objectFit: "contain", width: "35px" }} /> : ""}
                     </Avatar>
                  }
                  titleTypographyProps={{ fontSize: "10px", color: "white" }}
                  title={userName ? userName : "Shrimp Chorizo "}
               />
               <CardActions disableSpacing>
                  <CustomIcon like={like} id={id} icon="like" fontSize={18} />
                  <CustomIcon saved={saved} id={id} icon="saved" fontSize={18} />
               </CardActions>
            </Box>
         </Box>
      </Card>
   );
};
export default ExploreCard;
