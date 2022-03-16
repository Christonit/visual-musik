import React, {Component} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { set_playlists, upate_playlists_by_20, active_playlist} from '../actions';
import { connect } from 'react-redux';
import {truncateText} from '../utils/lib';

import {
    NavLink
  } from "react-router-dom";

const spotifyApi = new SpotifyWebApi();


class Sidebar extends Component {
    constructor(props){
        super(props)
        let access_token = localStorage.getItem('access_token');
        spotifyApi.setAccessToken(access_token);
        this.setActivePlaylist = this.setActivePlaylist.bind(this);
    }
    componentDidMount(){
        let id = this.props.user_id;
        let set_playlists = this.props.set_playlists;
        spotifyApi.getUserPlaylists(id).then(
            function (data){

                set_playlists(data.items);

            },
            function (err){

            }
        )
        


    }

    setActivePlaylist(id){
        let active_playlist = this.props.active_playlist;
        let access_token = localStorage.getItem('access_token');
        console.log(id)
        let header = { 
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${access_token}`};
        
        fetch(`https://api.spotify.com/v1/playlists/${id}`,
            {method:'GET',
            headers:header})
            .then( res => {
                if(res.status == 200){
                    return res.text()
                }
            })
            .then(data => {
                let info  = JSON.parse(data)

                active_playlist(info)
            })

        
    }

    render(){

        const {playlists} = this.props;
        return(
            <div className="sidebar">
                <div className="sidebar-header">
                    <a href="#" className="branding text-center"><img src="https://via.placeholder.com/120x40" alt="Visual Musik Logo" /></a>
                    
                    <NavLink to="/" className="nav-link ">
                        <span className="material-icons mr--8 size-32" alt="Visual Musik Logo">
                            playlist_play
                        </span>
                        {/* <img src="https://via.placeholder.com/20x20" className="mr--12" alt="Visual Musik Logo" />  */}
                        Your playlists
                    </NavLink>

                </div>

                <div className="sidebar-playlist-list">
                {playlists.map((item, key) =>{

                    let name = item.name.toLocaleLowerCase().split('/');
                    name = name.join('').split(' ').join('-')

                    return <NavLink 
                    className="nav-link-playlist"
                    key={key} 
                    id={item.id}
                    to={`/playlist/${item.id}`}
                    >{truncateText(item.name,24)}</NavLink>
                })} 

                </div>
                
                <div className="playback-container">

                </div>

            </div>
        );
    }
}

const mapDispatchToProps = {
    set_playlists,
    active_playlist
};

const mapStateToProps = state => ({
    user_id: state.user_id,
    playlists: state.playlists
})

export default connect(mapStateToProps, mapDispatchToProps ) (Sidebar);
