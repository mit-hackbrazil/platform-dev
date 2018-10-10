import React, { Component } from "react";
import { } from "./navbar.css";
import {
    Alignment,
    Button,
    Classes,
    H5,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,
    Switch,
} from "@blueprintjs/core";

let icon_hack = <svg width="30" height="34" viewBox="0 0 30 34" xmlns="http://www.w3.org/2000/svg">
    <g id="Page-1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
        <g id="Artboard-2" transform="translate(-52 -26)" stroke="#FFF" strokeWidth="1.2">
            <g id="icon" transform="translate(53 27)">
                <polygon id="Polygon" points="13.9887009 0 27.9774019 8.1007802 27.9774019 24.3023406 13.9887009 32.4031208 3.01980663e-14 24.3023406 2.13162821e-14 8.1007802"
                />
                <polygon id="Polygon-2" points="13.9156627 8.03625378 27.8313253 16.2839879 13.9156627 24.5317221 0 16.2839879"
                />
                <ellipse id="Oval" cx="14.042" cy="16.284" rx="4.596" ry="4.61" />
            </g>
        </g>
    </g>
</svg>;

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
        /* google forms
        https://goo.gl/forms/kFAs13YK8ZJDxT8e2
        */
        let formsUrl = "https://goo.gl/forms/kFAs13YK8ZJDxT8e2";

        return (<Navbar className="top-menu">
            <NavbarGroup align={Alignment.LEFT}>
                <NavbarHeading>{icon_hack}</NavbarHeading>
                <NavbarDivider />
                <Button className={Classes.MINIMAL} icon="home" text="Home" />
                <Button className={Classes.MINIMAL} icon="form" text="Enviar Feedback" />
                <Button className={Classes.MINIMAL} icon="cog" text="Configurações" />
            </NavbarGroup>
        </Navbar>)
    }
}