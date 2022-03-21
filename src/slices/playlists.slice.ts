import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface PlaylistI {
   id: string,
   owner : string,
   image: string, 
   playlist_size: number,
   name: string
}

const initialState : Array<PlaylistI> = [];

export const playlistsSlice = createSlice({
    name: "playlists",
    initialState,
    reducers: {
        setPlaylists: (state, action : PayloadAction<PlaylistI[]>) => {
            state = action.payload
        },
        updateBy20 : (state, action : PayloadAction<PlaylistI[]>) => {
            state = [...state, ...action.payload]
        }
    }

})


export const selectPlaylists = (state : RootState) => state;

export const {setPlaylists,} = playlistsSlice.actions;

export default playlistsSlice.reducer;
