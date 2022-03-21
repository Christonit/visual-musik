import React, {Component} from "react";
import SpotifyWebApi from "spotify-web-api-js";
import {withRouter} from "react-router";
import {Link, useParams} from "react-router-dom";
import {connect} from "react-redux";
import {active_playlist} from "../actions";

const spotifyApi = new SpotifyWebApi();

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.setActivePlaylist = this.setActivePlaylist.bind(this);
    }
    setActivePlaylist(id) {
        let active_playlist = this.props.active_playlist;
        let access_token = localStorage.getItem("access_token");
        let header = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
        };

        fetch(`https://api.spotify.com/v1/playlists/${id}`, {
            method: "GET",
            headers: header,
        })
            .then(res => {
                if (res.status == 200) {
                    return res.text();
                }
            })
            .then(data => {
                let info = JSON.parse(data);

                active_playlist(info);
            });
    }

    render() {
        const {playlists} = this.props;
        return (
            <div className="container">
                <div className="playlists-grid grid">
                    {playlists.map((playlist, key) => {
                        let name = playlist.name.toLocaleLowerCase().split("/");
                        name = name.join("").split(" ").join("-");

                        return (
                            <Link className="playlist-grid-item" to={`/playlist/${playlist.id}`} key={key}>
                                <img src={playlist.images[0].url} alt="" className="playlist-img-thumbnail" />
                                <p className="grid-item-title">{playlist.name}</p>
                                <span className="grid-item-label">
                                    {" "}
                                    <b>{playlist.tracks.total}</b> tracks | by {playlist.owner.display_name}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    active_playlist,
};

const mapStateToProps = state => ({
    playlists: state.playlists,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
