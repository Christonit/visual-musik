import {useEffect, useState, useRef} from "react";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {truncateText} from "../utils/lib";

const Header = () => {
    const header = useRef();
    const history = useHistory();
    const user = useSelector(state => state.user);
    const [username, setUsername] = useState("");

    const [localNavigation] = useState({
        canGoForward: true,
        canGoBack: true,
    });

    const prevRoute = () => {
        history.goBack();
        history.listen((location, action) => {});
    };

    const nextRoute = () => {
        history.goForward();
        history.listen((location, action) => {});
    };

    useEffect(() => {
        let scrollPosition = window.scrollY;
        let header_el = header.current;
        window.addEventListener("scroll", function () {
            scrollPosition = window.scrollY;

            if (scrollPosition >= 50) {
                header_el.classList.add("scrolling");
            } else {
                header_el.classList.remove("scrolling");
            }
        });
    }, []);

    useEffect(() => {
        let current_user_name = user.display_name;
        current_user_name = current_user_name.split(" ");
        current_user_name = current_user_name[0] + " " + current_user_name[1];
        setUsername(current_user_name);
    }, [user]);

    const logOut = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.reload();
    };

    return (
        <div ref={header} className="header">
            <div className="naviation-controllers">
                <button
                    onClick={prevRoute}
                    className={"material-icons button-glass mr--16 " + (localNavigation.canGoBack ? "" : "disabled")}>
                    chevron_left
                </button>
                <button
                    onClick={nextRoute}
                    className={"material-icons button-glass " + (localNavigation.canGoForward ? "" : "disabled")}>
                    chevron_right
                </button>
            </div>

            <div className="user-settings">
                <span className="current-user">
                    <img src={user.images[0].url} alt="" />
                    {truncateText(username, 20)}
                    <span className="material-icons">arrow_drop_down</span>
                </span>

                <div className="more-menu">
                    <button className="more-menu-item" onClick={logOut}>
                        Log out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
