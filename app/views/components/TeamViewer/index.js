import React, { Component } from "react";
import { } from "./teamviewer.css";
//import icon_user from "./icon_user.svg";


class MemberCard extends Component {
    render() {
        return (
            <div className="team-member">
                <div className="image-info">
      
                    <div className="name">
                        <h1>Lara Timbó</h1>
                        <p>Engenheira</p>
                        <p>Universidade da Gela</p>
                    </div>
                </div>
                <div className="links">
                    <div>linkedin</div>
                </div>
            </div>
        )
    }
}
export default class TeamViewer extends Component {

    render() {
        return (<div className="teamviewer">
            < MemberCard />
            < MemberCard />
            < MemberCard />
        </div>)
    }

}