import React, { Component } from "react";
import { } from "./team-header.css";
/*
example of props
let team = {
  name: String,
  logo: String,
  description: String,
  link: String
}
*/

export default class TeamHeader extends Component {
    onClickLink = () => {
        let { link } = this.props.team;
        let win = window.open(link, '_blank');
        win.focus();
    }
    render() {
        let { name, logo, description, link } = this.props.team;
        let linkSimplified = link.replace("https://", "").replace("http://", "");

        return <div className="team-header">

            <div className="logo"><img src={logo} /></div>
            <div className="name">{name}</div>
            <div className="description">{description}</div>
            <div className="link"><a hrf={link} onClick={this.onClickLink}>{linkSimplified}</a></div>
        </div>
    }

}