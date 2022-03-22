import {
  SET_USER,
  IS_LOGGED,
  NOT_LOGGED,
  IS_CHECKING,
  NOT_CHECKING,
  SET_ID,
  SET_PLAYLISTS,
  UPDATE_BY_20,
  SET_ACTIVE_PLAYLIST,
  SET_LIST,
  CLEAR_LIST
} from '../reducers/user_info'

export const set_user = (user = {}) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const user_is_logged = () => {
  return {
    type: IS_LOGGED,
  };
};

export const user_not_logged = () => {
  console.log("is not loggin");
  return {
    type: NOT_LOGGED
  };
};

export const open_video_priv = () => {
  return {
    type: IS_CHECKING,
  };
};
export const close_video_prev = () => {
  return {
    type: NOT_CHECKING,
  };
};

export const set_id = (id) => {
  return {
    type: SET_ID,
    payload: id,
  };
};


export const set_playlists = (playlist = []) => {
  const processed_arr = playlist.map(item => {
    return {
      id: item.id,
      cover_image: item.images[0].url,
      title: item.name,
      owner: item.owner.display_name,
      size: item.tracks.total
    }
  })
  return {
    type: SET_PLAYLISTS,
    payload: processed_arr,
  };
};

export const upate_playlists_by_20 = (playlist = []) => {
  const processed_arr = playlist.map(item => {
    return {
      id: item.id,
      cover_image: item.images[0].url,
      title: item.name,
      owner: item.owner.display_name,
      size: item.tracks.total
    }
  })
  return {
    type: UPDATE_BY_20,
    payload: playlist,
  };
};
export const set_active_playlist = (playlist = {}) => {
  return {
    type: SET_ACTIVE_PLAYLIST,
    payload: playlist,
  };
};

export const set_youtube_list = (lists = []) => {
  return {
    type: SET_LIST,
    payload: lists,
  };
};
export const clear_youtube_list = (lists = []) => {
  return {
    type: CLEAR_LIST,
    payload: lists,
  };
};