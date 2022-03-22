import { combineReducers } from "redux";

import { userInfoI } from "../interfaces/spotify.interface";

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

type actionI = 
  {type : string, payload: userInfoI}

type initialStateI = {
  user : userInfoI | null
}
const initialState : initialStateI  = {
  user : null 
}
export const user_info = (state = null, action : actionI) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    default:
      return state;
  }
};


