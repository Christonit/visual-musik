import {useEffect, useState} from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Sidebar from "./components/sidebar.jsx";
import Header from "./components/header.jsx";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {useSelector, useDispatch, RootStateOrAny} from "react-redux";
import Login from "./views/login.jsx";
import Dashboard from "./views/dashboard.jsx";
import Playlist from "./views/playlist.jsx";
import YoutubeComponent from "./views/youtube-component.jsx";
import {SpotifyService} from "./services/spotify.service";
import * as actions from "./actions/index";
import {RootState, AppDispatch} from "./index";

const spotifyApi = new SpotifyWebApi();

function App() {
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const is_logged = useSelector((state: RootStateOrAny) => state.logged);
    const user = useSelector((state: RootStateOrAny) => state.user);

    const handleFailure = (error: any) => {
        console.log(error);
    };

    const getHashParams = () => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        let access_token = urlSearchParams.has("access_token") ? urlSearchParams.get("access_token") : null;
        let token_type = urlSearchParams.has("token_type") ? urlSearchParams.get("token_type") : null;
        let scope = urlSearchParams.has("scope") ? urlSearchParams.get("scope") : null;
        let expires_in = urlSearchParams.has("expires_in") ? urlSearchParams.get("expires_in") : null;
        let refresh_token = urlSearchParams.has("refresh_token") ? urlSearchParams.get("refresh_token") : null;

        urlSearchParams.delete("access_token");
        urlSearchParams.delete("token_type");
        urlSearchParams.delete("scope");
        urlSearchParams.delete("expires_in");
        urlSearchParams.delete("refresh_token");

        return {
            access_token,
            token_type,
            scope,
            expires_in,
            refresh_token,
        };
    };

    const getPlaylists = () => {
        spotifyApi.getUserPlaylists(user.id).then(
            function (data) {
                dispatch(actions.set_playlists(data.items));
            },
            function (err) {},
        );
    };
    useEffect(() => {
        const params = getHashParams();

        if (params.access_token != null) {
            localStorage.setItem("access_token", params.access_token || "");
            localStorage.setItem("refresh_token", params.refresh_token || "");
        }

        window.onresize = () => {
            setIsVisible(window.innerWidth >= 1280 ? true : false);
        };
    }, []);

    useEffect(() => {
        const handleSuccessSpotifyAccess = (data: string) => {
            let new_tokens = JSON.parse(data);

            if (new_tokens.access_token) {
                localStorage.setItem("access_token", new_tokens.access_token);
                localStorage.removeItem("refresh_token");

                spotifyApi.setAccessToken(accessToken || "");
                spotifyApi.getMe().then(
                    function (data) {
                        if (data) {
                            actions.set_user(data);
                            actions.user_is_logged();
                        }
                        return;
                    },
                    function (err) {
                        if (err.status === 401) {
                            actions.user_not_logged();
                        }
                    },
                );
            }
        };
        setAccessToken(localStorage.getItem("access_token") || "");
        setRefreshToken(localStorage.getItem("refresh_token") || "");

        if (accessToken) {
            if (accessToken === "null" || accessToken === null) {
                return;
            }

            spotifyApi.setAccessToken(accessToken);
            spotifyApi.getMe().then(
                function (data) {
                    dispatch(actions.set_user(data));
                    dispatch(actions.user_is_logged());
                    return;
                },
                function (err) {
                    if (err.status === 401) {
                        if (refreshToken === "null" || !refreshToken || refreshToken === null) {
                            dispatch(actions.set_user());
                            dispatch(actions.user_not_logged());
                            return;
                        }

                        //Endpoint to get new access token
                        SpotifyService.getNewAccessToken(refreshToken, handleSuccessSpotifyAccess, handleFailure);
                    }
                },
            );
        }
    }, [accessToken, refreshToken, dispatch]);

    useEffect(() => {
        if (user) {
            getPlaylists();
        }
    }, [user]);

    return (
        <>
            {!is_logged && isVisible && <Login />}

            {is_logged && isVisible && (
                <Router>
                    {/* <Sidebar /> */}
                    <section className="app-container">
                        <div className="music-container">
                            <Header />
                            <Switch>
                                {/* <Route exact path="/" component={Dashboard} /> */}
                                {/* <Route path="/playlist/:playlistId" component={Playlist} /> */}
                            </Switch>
                        </div>

                        {/* <YoutubeComponent /> */}
                    </section>
                </Router>
            )}

            {!isVisible && (
                <h1>Tablet and Mobile versions are still on development. Please switch to a bigger device.</h1>
            )}
        </>
    );
}

export default App;
