import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/initialApp";

const useFetchUsersData = ({id}) => {
    console.log("id:",id)
    const [userData, setUserData] =useState({});
   // console.log("This is problem component");
   console.log("from customHook",userData)   
   useEffect(() => {
      const getData = async () => {
         const docId = id.slice(0, id.indexOf("@"));
         const docRef = doc(db, "users", docId);
         const docSnap = await getDoc(docRef);
         setUserData(docSnap.data());
      };
      getData();
   }, []);
  return userData;
}

export default useFetchUsersData
