/* eslint-disable react/prop-types */
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/initialApp";
import { setUserData } from "../reducer/tokenReducer";

const CustomIcon = ({ like, id, fontSize, icon, saved }) => {
   let userData = useSelector((state) => state.authToken.userData);
   const { iconColor } = useSelector((state) => state.theme);
   let userPost = userData.posts;
   const dispatch = useDispatch();
   userPost = userPost && JSON.parse(JSON.stringify(userPost));
   // console.log("comment for userPost", userPost);

   const handleLike = async (id) => {
      const post = userPost.filter((post) => post.id === id);
      // console.log(post);
      const docId = id.slice(0, id.indexOf("@"));
      const docRef = doc(db, "users", docId);
      if (post && !post[0].like) {
         const newPost = userPost.map((post) => {
            if (post.id === id) {
               post.like = !post.like;
            }
            return post;
         });
         await updateDoc(docRef, {
            posts: newPost,
            liked: [...userData.liked, id],
         });
         dispatch(setUserData({ posts: newPost, liked: [...userData.liked, id] }));
      } else {
         const newPost = userPost.map((post) => {
            if (post.id === id) {
               post.like = !post.like;
            }
            return post;
         });
         const newLiked = [...userData.liked];
         newLiked.splice(newLiked.indexOf(id), 1);
         await updateDoc(docRef, {
            posts: newPost,
            liked: newLiked,
         });
         console.log(dispatch(setUserData({ posts: newPost, liked: newLiked })));
      }
   };

   const handleSaved = async (id) => {
      const post = userPost.filter((post) => post.id === id);
      // console.log(post);
      const docId = id.slice(0, id.indexOf("@"));
      const docRef = doc(db, "users", docId);
      if (post && !post[0].saved) {
         const newPost = userPost.map((post) => {
            if (post.id === id) {
               post.saved = !post.saved;
            }
            return post;
         });
         await updateDoc(docRef, {
            posts: newPost,
            saved: [...userData.saved, id],
         });
         dispatch(setUserData({ posts: newPost, saved: [...userData.saved, id] }));
      } else {
         const newPost = userPost.map((post) => {
            if (post.id === id) {
               post.saved = !post.saved;
            }
            return post;
         });
         const newSaved = [...userData.saved];
         newSaved.splice(newSaved.indexOf(id), 1);
         await updateDoc(docRef, {
            posts: newPost,
            saved: newSaved,
         });
         dispatch(setUserData({ posts: newPost, saved: newSaved }));
      }
   };

   return icon === "like" ? (
      <IconButton aria-label="add to favorites" onClick={() => handleLike(id)}>
         {like ? (
            <FavoriteIcon sx={{ color: iconColor, fontSize: fontSize && fontSize }} />
         ) : (
            <FavoriteBorderIcon sx={{ color: iconColor, fontSize: fontSize }} />
         )}
      </IconButton>
   ) : (
      <IconButton aria-label="add to favorites" onClick={() => handleSaved(id)}>
         {saved ? (
            <BookmarkIcon sx={{ color: iconColor, fontSize: fontSize }} />
         ) : (
            <BookmarkBorderIcon sx={{ color: iconColor, fontSize: fontSize }} />
         )}
      </IconButton>
   );
};

export default CustomIcon;
