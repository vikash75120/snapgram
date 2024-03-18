/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import SmallPostCard from "../cards/SmallPostCard";
import useFetchUsersData from "../hooks/useFetchUsersData";

const SavedCard = ({ data:id }) => {
   const userData = useFetchUsersData({id});
   
   const post = userData.posts && userData.posts.filter((post)=>post.id===id)

   return (
      <Grid item xs={12} sm={12} md={4} lg={3}>
         <SmallPostCard
            userName={userData?.userName}
            userImg={userData?.image}
            id={id}
            like={post&&post[0].like}
            saved={post&&post[0].saved}
            img={post&&post[0].image}
         />
      </Grid>
   );
};

export default SavedCard;
