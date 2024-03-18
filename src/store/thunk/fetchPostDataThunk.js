import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/initialApp";

// console.log("from fetchPostDatathunk")
export const getPostDataThunk = createAsyncThunk(
    'users/getPostData',
    async (docId) => {
        const docSnap = await getDoc(doc(db, "users", docId));
        return docSnap.data().posts;
    },
  )

