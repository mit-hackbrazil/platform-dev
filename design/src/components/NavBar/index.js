import React, { Component } from "react";
import { } from "./navbar.css";
import icon_menu from "./icon_menu.svg";


export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false
        }
    }

    onClickMenu = () => {
        this.setState({
            menuOpen: !this.state.menuOpen
        })
    }

    render() {
        let { menuOpen } = this.state;

        return <div className="menu-navbar">
            <div className="group-left" onClick={this.onClickMenu}>
                <div className="menu-dropdown" >
                    <img className="icon" src={icon_menu} />
                </div>
                <div>
                    HackBrazil 2019
                </div>
            </div>

            <div className="group-right">
                username
            </div>

            <div className={menuOpen ? "menu-content-open" : "menu-content-hidden"}>
                <ul>
                    <li>
                        Calendar
                    </li>
                    <li>
                        Posts
                    </li>
                    <li>
                        Equipe
                    </li>
                    <li>
                        Contato
                    </li>
                </ul>
            </div>
        </div>
    }
}