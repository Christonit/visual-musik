import React, {Component} from 'react';

import { connect } from 'react-redux';

class Login extends Component {
    render(){
        return (
            <div>
                <h1>You are not logged in</h1>
                <p>Please loggin so you can look for videos of your favorite songs.</p>
                <a href="http://localhost:8888/login">Login into Spotify</a>
            </div>
        )
    }

}

export default connect(null, null)(Login);