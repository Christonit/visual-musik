import { combineReducers } from 'redux'

const user_info = ( state = {}, action) => {
    switch(action.type){
        case 'SET_USER':
            return  state = action.payload;
        default:
            return state;
    }
}

const user_id =  ( state = null, action ) => {
    switch (action.type) {
        case 'SET_ID':
            return state = action.payload;
        case 'UNSET_ID':
            return state = null;
        default:
            return state;
    }
}
const is_logged = ( state = false, action) => {
    switch (action.type) {
        case 'IS_LOGGED':
            return state = action.payload;
        case 'NOT_LOGGED':
            return state = action.payload;
        default:
            return state;
    }
        
    
}

const is_checking_video = ( state = false, action) =>{
    switch (action.type){
        case 'IS_CHECKING':
            return state = true;
        case 'NOT_CHECKING':
            return state = false;
        default:
            return state;
    }
}

const playlists = (state = [], action)=>{
    switch(action.type) {
        case 'SET_PLAYLISTS':
            return state = action.payload;
        case 'UPDATE_BY_20':
            return state.push(action.payload);
        default:
            return state;
    }
}

const active_playlist = (state = {}, action) => {
    switch(action.type) {
        case 'SET_ACTIVE_PLAYLIST':
            return state = action.payload;
        default:
            return state;
    }
}

const youtube_list = ( state = [] , action) =>{
    switch(action.type){
        case 'SET_LIST':
            return state = action.payload
        case 'CLEAR_LIST':
            return state = []
        default:
            return state;
    }
}
export default combineReducers({
    user: user_info, 
    user_id,
    playlists,
    active_playlist,
    youtube_list,
    is_checking_video,
    is_logged});