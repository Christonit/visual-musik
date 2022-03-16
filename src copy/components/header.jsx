import React, {Component} from 'react';
import {set_user} from '../actions';
import {truncateText} from '../utils/lib';
import { connect } from 'react-redux';

class Header extends Component{
    constructor(props){
        super(props)

        this.header = React.createRef();

        this.logOut = this.logOut.bind(this);
        this.prevRoute = this.prevRoute.bind(this);
        this.nextRoute = this.nextRoute.bind(this);
        this.state = {
            canGoForward : true,
            canGoBack: true
        }
    }


    prevRoute(){

        this.props.history.goBack()
        this.props.history.listen((location, action) => {
            

        });
    }

    nextRoute(){

        this.props.history.goForward()
        this.props.history.listen((location, action) => {
           


        });
    }

    componentDidMount(){
        let scrollPosition = window.scrollY;
        let header = this.header.current;

        window.addEventListener('scroll', function() {

            scrollPosition = window.scrollY;

            if (scrollPosition >= 50) {
                header.classList.add('scrolling');
            } else {
                header.classList.remove('scrolling');
            }

        });

        

        
    }
   
    logOut(){
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.reload();


    }
    render(){
        const {user} = this.props;
        const {canGoForward, canGoBack} = this.state; 


        let current_user_name = user.display_name;
        current_user_name = current_user_name.split(' ');
        current_user_name = current_user_name[0] + ' ' + current_user_name[1];

        return (
        <div ref={this.header} className="header">
            <div  className="naviation-controllers">
                <button 
                    onClick={this.prevRoute}
                    className={"material-icons button-glass mr--16 " + (canGoBack ? "" : "disabled")}>
                    chevron_left
                </button>
                <button
                    onClick={this.nextRoute} 
                    className={"material-icons button-glass " + (canGoForward ? "" : "disabled")}>
                    chevron_right
                </button>
            </div>

            <div className="user-settings">
                <span className="current-user">
                    <img src={user.images[0].url} alt="" />    
                    {truncateText(current_user_name,20)}
                    <span className="material-icons">
                        arrow_drop_down
                    </span>
                </span>    

                <div className="more-menu">
                    <button className="more-menu-item" onClick={this.logOut}>Log out</button>
                </div>
            </div> 
        </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, null)(Header);