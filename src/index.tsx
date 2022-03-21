import React from "react";
import ReactDOM from "react-dom";
import "./scss/styles.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import registerServiceWorker from "./registerServiceWorker";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";

import {youtube_list, playlists, active_playlist} from "./reducers/playlists.reducer";
import {user_info} from "./reducers/user.reducer";

const reducers = combineReducers({youtube_list, playlists, active_playlist, user: user_info});

const myStore = createStore(reducers, composeWithDevTools());

ReactDOM.render(
    <React.StrictMode>
        <Provider store={myStore}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
registerServiceWorker();
