import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {userInfoI} from "../interfaces/spotify.interface";

const initialState : userInfoI = {
    country: "",
    display_name: "",
    href: "",
    id: "",
    images: [{
        height: "" ,
        width: "" ,
        url: "",
    }],
    product: "",
    type: "",
    uri: ""};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        
        setUser: (state, action : PayloadAction<userInfoI>) => {
            state = action.payload
        },
        
    }

})


export const selectUser = (state : RootState) => state;

export const {setUser,} = userSlice.actions;

export default userSlice.reducer;
