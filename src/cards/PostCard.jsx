/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux";
import CustomIcon from "../icons/CustomIcon";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Fade } from "transitions-kit";

const PostCard = ({ id, img, description, like, saved, name, datePosted, userImg }) => {
   const { textColor, cardColor } = useSelector((state) => state.theme);
   // const navigate = useNavigate();

   const myRef = useRef();
   const [eleVisible, setEleVisible] = useState(false);
   // console.log("eleVisible", eleVisible);
   useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
         const entry = entries[0];
         setEleVisible(entry.isIntersecting);
      });
      observer.observe(myRef.current);
   }, []);

   return (
      <Fade in={eleVisible} timeout={1000}>
         <Card
            sx={{
               maxWidth: { xs: "90%", sm: "80%" },
               borderRadius: "10px",
               bgcolor: cardColor,
               ml: { xs: "5%", sm: "10%" },
               mr: { xs: "5%", sm: "10%" },
               mb: { xs: "5%" },
               cursor: "pointer",
            }}
            // onClick={() => navigate(`/card/${id}`)}
            ref={myRef}
         >
            <CardHeader
               avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                     {userImg ? <img src={userImg} style={{ objectFit: "contain", width: "55px" }} /> : ""}
                  </Avatar>
               }
               action={
                  <IconButton aria-label="settings">
                     <MoreVertIcon sx={{ color: textColor }} />
                  </IconButton>
               }
               title={name}
               subheader={
                  <Typography sx={{ color: textColor, fontSize: 12, opacity: "80%" }}>
                     {datePosted ? datePosted : " sun September 14, 2016"}
                  </Typography>
               }
               sx={{ color: textColor }}
            />
            <CardContent>
               <Typography variant="body2" color="text.secondary" sx={{ color: textColor }}>
                  {description}
               </Typography>
            </CardContent>
            <CardMedia
               component="img"
               height="300"
               image={img}
               alt="Paella dish"
               sx={{
                  width: "90%",
                  display: "block",
                  margin: "auto",
                  borderRadius: "10px",
               }}
            />
            <CardActions disableSpacing sx={{ display: "flex", justifyContent: "space-between" }}>
               <CustomIcon like={like} id={id} icon="like" />
               <CustomIcon saved={saved} id={id} icon="saved" />
            </CardActions>
         </Card>
      </Fade>
   );
};

export default PostCard;
