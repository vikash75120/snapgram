import { createSlice } from "@reduxjs/toolkit";

const token = createSlice({
    name: "token",
    initialState: {
        token: localStorage.getItem("token"),
        userData:{},
        currentUserDocId:""
    },
    reducers: {
        setToken: (state,action ) => {
            if(action.payload === "logout"){
                state.token = "";
                state.userData={};
                localStorage.removeItem("token");
            }else{
                state.token = localStorage.getItem("token");
            }
        },
        setUserData:(state,action)=>{
            const userData = action.payload;
            // console.log(userData)
            state.userData={...state.userData,...userData}
        },
        setCurrentUserDocId:(state,action)=>{
            state.currentUserDocId=action.payload;
        }
    },
});

export const { setToken,setUserData,setCurrentUserDocId } = token.actions;
export default token.reducer;