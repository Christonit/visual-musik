import React, {Component} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { connect } from 'react-redux';
import {songMstoSeconds,truncateText} from '../utils/lib';
import {YoutubeSearchForVideos} from '../utils/youtube';
import {
    close_video_prev,
    set_youtube_list,
    clear_youtube_list } from '../actions';

const spotifyApi = new SpotifyWebApi();


class Playlist extends Component {
    constructor(props){
        super(props)

        this.searchForVideo = this.searchForVideo.bind(this);
        this.searchForPlaylist = this.searchForPlaylist.bind(this);
        this.access_token = localStorage.getItem('access_token');
        this.header = { 
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${this.access_token}`};
        this.state = {
            is_loading:true,
            active_playlist: null,
            inspected_sond: null,
            tracks: []
        }
    }

    componentDidMount(){


        this.searchForPlaylist();


    }
    componentDidUpdate(prevProps) {
      if(this.props.match.params.playlistId !== prevProps.match.params.playlistId){
        this.searchForPlaylist();
        
      }


    }
    searchForPlaylist(){
        this.setState({is_loading:true});
        let id = this.props.match.params.playlistId;
        fetch(`https://api.spotify.com/v1/playlists/${id}`,
          {method:'GET',
          headers:this.header})
          .then( res => {
              if(res.status == 200 || res.status == 304 ){
                  return res.text()
              }
          })
          .then(data => {
            let info  = JSON.parse(data)

            this.setState({
                is_loading:false,
                active_playlist: info,
                tracks: info.tracks.items
            })

        })
    }
    searchForVideo(query){
        YoutubeSearchForVideos(query).then(data => {
            let yt_response =  JSON.parse(data)
            this.props.set_youtube_list(yt_response.items);
            this.props.close_video_prev();
            
        });
    }
    render(){
        const {active_playlist,tracks} = this.state;

       
        return (
            <>
                {active_playlist != null && <div className="container">
    
                    <div className="playlist-header">
                        <img 
                        className="music-image-medium"
                        src={active_playlist.images[0].url} alt="" />
                        <div className="ml--20">
                            <p className="text bold small mb--16">PLAYLIST</p>
                            <h2 className="hero-title mb--24">{active_playlist.name}</h2>
                            <h4 className="text bold">{active_playlist.owner.display_name}</h4>   
                        </div>
                    </div>
                    <div className="playlist-tracks">
                        <div className="playlist-tracks-header">
                            <span className="text label">#</span>
                            <span className="text label">Name</span>
                            <span className="text label">Duration</span>
                            <span className="text label">Actions</span>
                        </div>

                        {tracks.map( (song, key) =>{
                            let duration = songMstoSeconds(song.track.duration_ms);
                            let song_name = song.track.name;
                            let artists = song.track.artists;
                            let artists_length = artists.length;
                            let search_param = null
                            let art_list = [];
                            for(const artist of artists){
                                art_list.push(artist.name);
                            }

                            art_list = art_list.join(', ');

                            search_param = song_name + ' - ' + art_list;
                            

                            return <div className="playlist-tracks-row">
                                        <span>{key + 1}</span>
                                        <span>
                                            <p className="text bold">
                                                { truncateText(song.track.name,44)}
                                            </p>
                                            <p className="text label">
                                                {artists.map((item, key) => key == (artists_length - 1) ? `${item.name}` : `${item.name}, ` )}
                                            </p>
                                        </span>
                                        <span className="text label">{duration.min} {duration.min >= 10 ? 'mins' : 'min'} {duration.sec} sec</span>
                                        <span className="mr--16">
                                            <button className="button" onClick={() => this.searchForVideo(search_param) }>Search</button>
                                        </span>
                                    </div>
                        })}
                        
                    </div>
                </div>}


            </>


        )
    }

}

const mapDispatchToProps = {
    close_video_prev,
    set_youtube_list,
    clear_youtube_list
}

export default connect(null,mapDispatchToProps)(Playlist);