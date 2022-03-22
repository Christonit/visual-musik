import { combineReducers } from "redux";
import { createSlice } from "@reduxjs/toolkit";

export const USER = "SESSION/USER";
export const SET_USER = "SESSION/SET_USER";
export const IS_LOGGED = "SESSION/IS_LOGGED";
export const NOT_LOGGED = "SESSION/NOT_LOGGED";
export const IS_CHECKING = "SESSION/IS_CHECKING";
export const NOT_CHECKING = "SESSION/NOT_CHECKING";
export const SET_ID = "SESSION/SET_ID";
export const UNSET_ID = "SESSION/UNSET_ID";
export const SET_PLAYLISTS = "PLAYLIST/SET_PLAYLISTS";
export const UPDATE_BY_20 = "PLAYLIST/UPDATE_BY_20";
export const SET_ACTIVE_PLAYLIST = "PLAYLIST/SET_ACTIVE_PLAYLIST";
export const SET_LIST = "PLAYLIST/SET_LIST";
export const CLEAR_LIST = "PLAYLIST/CLEAR_LIST";

interface trackI {
    id : string,
    name: string,
    duration: string,
    artists : {id : string, name: string}[],
}

interface ActivePlaylistI {
    id : string,
    cover_image : string,
    name: string,
    owner : string,
    tracks : trackI[]
}

interface youtubeI {
    id: string,
    title: string,
    channel: string,
    url : string,
    date: string,
    thumbnail : string 
}  
 interface playlistI {
    id : string,
    cover_image : string,
    title: string,
    owner : string,
    size: number
 }
 interface spotifyPlaylistI {
    id : string,
    images : {height: number, width: number, url : string}[],
    name: string,
    owner : {
        display_name : string
    },
    tracks: {total: number}
 }
export interface ActivePlaylistsReducerI  {
    type : string,
    payload : ActivePlaylistI
}
export interface YoutubeListReducerI  {
    type : string,
    payload : youtubeI[]
}

export const youtube_list = (state: youtubeI[] = [], action : YoutubeListReducerI) => {
    switch (action.type) {
        case SET_LIST:
        return action.payload;
        case CLEAR_LIST:
        return [];
        default:
        return state;
    }
};

export const playlists = (state : playlistI[] = [], action : { type: string, payload : playlistI[]} ) => {
    
    switch (action.type) {
      case SET_PLAYLISTS:
        return  [...action.payload];
      case UPDATE_BY_20:
        return [...state, ...action.payload];
      default:
        return state;
    }
    
  };
  
export const active_playlist = (state  : ActivePlaylistI | null, action : ActivePlaylistsReducerI) => {
    switch (action.type) {
      case SET_ACTIVE_PLAYLIST:
        return action.payload;
      default:
        return state;
    }
  };

