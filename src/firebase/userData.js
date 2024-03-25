import { db } from "../firebase/initialApp";
import { collection, getDocs } from "firebase/firestore";
import {setUserData} from '../reducer/tokenReducer'
import {setCurrentUserDocId} from '../reducer/tokenReducer'
import { useState } from "react";


const getUserData= async (token,dispatch)=>{
    const querySnapshot = await getDocs(collection(db, "users"));
    const [state,setState] = useState(querySnapshot.docs);
    querySnapshot.forEach((doc)=>{
        const data = doc.data();
        // console.log((`token with data.userToken   "${data.userToken}"`))
        // console.log((`token with token   "${token}"`))
        if(`"${data.userToken}"` === token){
            dispatch(setUserData(data));
            console.log("when this run?????",data)
        }
    })
}

const getUserDataToUpdate= async (email,dispatch)=>{
    let docId;
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc)=>{
        const data = doc.data();
        if(data.email === email){
            dispatch(setCurrentUserDocId(doc.id))
            docId= doc.id;
        }
    })
    return docId;
}

export {getUserData,getUserDataToUpdate}
