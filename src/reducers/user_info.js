import { combineReducers } from "redux";

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

const user_info = (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return (state = action.payload);
    default:
      return state;
  }
};

const user_id = (state = null, action) => {
  let user_id = action.payload;
  switch (action.type) {
    case SET_ID:
      return user_id;
    case UNSET_ID:
      state = null
      return { ...state, user_id: null };
    default:
      return state;
  }
};
const is_logged = (state = false, action) => {
  switch (action.type) {
    case IS_LOGGED:
      return (state = action.payload);
    case NOT_LOGGED:
      return (state = action.payload);
    default:
      return state;
  }
};

const is_checking_video = (state = false, action) => {
  switch (action.type) {
    case IS_CHECKING:
      return (state = true);
    case NOT_CHECKING:
      return (state = false);
    default:
      return state;
  }
};

const playlists = (state = [], action) => {
  switch (action.type) {
    case SET_PLAYLISTS:
      return (state = action.payload);
    case UPDATE_BY_20:
      return state.push(action.payload);
    default:
      return state;
  }
};

const active_playlist = (state = {}, action) => {
  switch (action.type) {
    case SET_ACTIVE_PLAYLIST:
      return (state = action.payload);
    default:
      return state;
  }
};

const youtube_list = (state = [], action) => {
  switch (action.type) {
    case SET_LIST:
      return (state = action.payload);
    case CLEAR_LIST:
      return (state = []);
    default:
      return state;
  }
};
export default combineReducers({
  user: user_info,
  user_id,
  playlists,
  active_playlist,
  youtube_list,
  is_checking_video,
  is_logged,
});
