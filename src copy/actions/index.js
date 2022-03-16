export const set_user = (user = {}) => {
    return {
        type: 'SET_USER',
        payload: user, 
    };
};

export const user_is_logged = () => {
    console.log('is loggin')
    return {
        type: 'IS_LOGGED',
        payload: true, 
    };
};

export const user_not_logged = () => {
    console.log('is not loggin')
    return {
        type: 'NOT_LOGGED',
        payload: false 
    };
};

export const open_video_priv = () => {
    return {
        type: 'IS_CHECKING'};
};
export const close_video_prev = () => {
    return {
        type: 'NOT_CHECKING' };
};

export const set_id = (id = null) => {
    return {
        type: 'SET_ID',
        payload: id 
    };
};
export const set_playlists = (playlist = []) => {
    return {
        type: 'SET_PLAYLISTS',
        payload: playlist
    };
};
export const upate_playlists_by_20 = (playlist = []) => {
    return {
        type: 'UPDATE_BY_20',
        payload: playlist
    };
};
export const active_playlist = (playlist = {}) => {
    return {
        type: 'SET_ACTIVE_PLAYLIST',
        payload: playlist
    };
};

export const set_youtube_list = ( lists = []) => {
    return {
        type: 'SET_LIST',
        payload: lists
    }
};
export const clear_youtube_list = ( lists = []) => {
    return {
        type: 'CLEAR_LIST',
        payload: lists
    }
};