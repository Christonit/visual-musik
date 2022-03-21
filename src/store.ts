import { configureStore, createSlice } from '@reduxjs/toolkit'

import playlistsSlice from './slices/playlists.slice';

export const store = configureStore({
    reducer:{ 
        playlistsSlice : playlistsSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
