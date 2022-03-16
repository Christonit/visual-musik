import logo from './logo.svg';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {set_user, user_is_logged, user_not_logged, set_id } from './actions';
import SpotifyWebApi from 'spotify-web-api-js';
import Sidebar from './components/sidebar.jsx';
import Header from './components/header.jsx';

import {  BrowserRouter as Router,
Route,
Switch} from 'react-router-dom';

import { createBrowserHistory } from "history";

import Login from './views/login.jsx';
import Dashboard from './views/dashboard.jsx';
import Playlist from './views/playlist.jsx';
import YoutubeComponent from './views/youtube-component.jsx';

const spotifyApi = new SpotifyWebApi();


class App extends Component {

  constructor(props){
    super(props);

    const params = this.getHashParams();
    this.state = {
      user_logged_in : false,
      access_token : null,
      user_info:null,
      isVisible: window.innerWidth >= 1280 ? true : false
    }

    // this.is_logged = this.user_is_logged.bind(this);
    // this.not_logged = this.user_not_logged.bind(this);

    if(params.access_token != null){
      localStorage.setItem('access_token', params.access_token)
      localStorage.setItem('refresh_token', params.refresh_token)
    }

    // window.innerWidth > 1280

  }
  


  componentDidMount(){
    let access_token = localStorage.getItem('access_token');
    let refresh_token = localStorage.getItem('refresh_token');
    const set_user = this.props.set_user;
    const set_is_logged = this.props.user_is_logged;
    const set_not_logged = this.props.user_not_logged;
    const set_user_id = this.props.set_id;
    // const is_logged = this.is_logged;

    window.onresize = () => {
      this.setState({
        isVisible: window.innerWidth >= 1280 ? true : false
      })
    }
    if(access_token ){

      if(access_token === "null" || access_token === null){
        return ;
      }

      spotifyApi.setAccessToken(access_token);
      spotifyApi.getMe().then( 
        function (data){
          // if(data){   
            set_user(data)
            set_user_id(data.id)
            set_is_logged()    

          // }
          return ;
          
          
        },
        function (err){
          if(err.status === 401){

            console.log(refresh_token)
            if(refresh_token === "null" ||  !refresh_token || refresh_token === null){
              set_user_id();
              set_user();
              set_not_logged()
              return;
            }

            //Endpoint to get new access token
            fetch('http://localhost:8888/refresh_token?refresh_token='+refresh_token)
            .then(res => {
              return res.text()
            })
            .then(data => {

              let new_tokens = JSON.parse(data);

              if(new_tokens.access_token){
                localStorage.setItem('access_token', new_tokens.access_token)
                localStorage.removeItem('refresh_token')

                spotifyApi.setAccessToken(access_token);
                spotifyApi.getMe().then( 
                  function (data){

                    if(data){       
                      set_user(data)
                      set_user_id(data.id)
                      set_is_logged()
                    }
                    return ;
                  
                  },
                  function (err){
                    console.log('2: fjksd')

                    if(err.status === 401){
                      set_not_logged()
                      // set_user_id();
                      // set_user();
                    }
                  },
                )
              }
              
            })
            .catch(e => console.log(e))

          }
        }
      );

    }
  }

  getHashParams() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    let access_token = urlSearchParams.has('access_token') ? urlSearchParams.get('access_token') : null;
    let token_type = urlSearchParams.has('token_type') ? urlSearchParams.get('token_type') : null;
    let scope = urlSearchParams.has('scope') ? urlSearchParams.get('scope') : null;
    let expires_in = urlSearchParams.has('expires_in') ? urlSearchParams.get('expires_in') : null;
    let refresh_token = urlSearchParams.has('refresh_token') ? urlSearchParams.get('refresh_token') : null;
    
    urlSearchParams.delete('access_token')
    urlSearchParams.delete('token_type')
    urlSearchParams.delete('scope')
    urlSearchParams.delete('expires_in')
    urlSearchParams.delete('refresh_token')
  
    return {
      access_token,
      token_type,
      scope,
      expires_in,
      refresh_token
    };
  }

  render(){
    const {is_logged } = this.props;
    const {isVisible} = this.state;
    const customHistory = createBrowserHistory();

    return (
      <>
      {(!is_logged  && isVisible) && <Login/>}
      
      {(is_logged && isVisible )&&
        <Router>
          <Sidebar/>
          <section className="app-container">
              <div className="music-container">
                <Header history={customHistory}/>
                <Switch>
                  <Route exact path="/" component={Dashboard}/>
                  <Route path="/playlist/:playlistId" component={Playlist}/>
                </Switch>
              </div>

              <YoutubeComponent/>
              
          </section>
        </Router>
      }

      {!isVisible && <h1>Tablet and Mobile versions are still on development. Please switch to a bigger device.</h1>}

      </>
    );
  }

}

const mapDispatchToProps = {
  set_user,
  user_is_logged,
  user_not_logged,
  set_id
}

const mapStateToProps = state => ({
  is_logged : state.is_logged,
  user : state.user_info
})

export default connect(mapStateToProps, mapDispatchToProps ) (App);
