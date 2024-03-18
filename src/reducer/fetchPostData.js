import { createSlice } from "@reduxjs/toolkit";
import { getPostDataThunk } from "../store/thunk/fetchPostDataThunk";

const fetchPostData = createSlice({
    name: "fetchPostData",
    initialState: {
        postData: [],
        isLoading: false,
        error: "",
    },
    extraReducers: (builder) => {
        // console.log("from fetchPostData")
        builder.addCase (getPostDataThunk.pending,(state) => {
            // console.log("from fetchPostData1")            
            state.isLoading = true;   
        }),
        builder.addCase (getPostDataThunk.fulfilled,(state,action) => {
            state.postData = action.payload;
            // console.log("from fetchPostData2")
            state.isLoading = false;   
        }),
        builder.addCase (getPostDataThunk.rejected,(state,action) => {
            // console.log("from fetchPostData3")
            state.error = action.payload;
            state.isLoading = false;   
        })
    }
})

export default fetchPostData.reducer;