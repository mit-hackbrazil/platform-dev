import React, { Component } from "react";
import { } from "./team-header.css";
import icon_edit from "./icon_edit.svg";

import {
    AnchorButton,
    Button,
    Classes,
    Code,
    FormGroup,
    H5,
    HTMLSelect,
    Intent,
    Label,
    Menu,
    MenuDivider,
    MenuItem,
    Popover,
    PopoverInteractionKind,
    Position,
    RadioGroup,
    Slider,
    Switch,
    Icon
} from "@blueprintjs/core";

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

            <div className="logo">
                <div className="image">
                    <img src={logo} />
                    <div className="logo-edit">
                        <Popover content={<div className="popup-content">Selecionar arquivossss sasdklald <br /> askaklsdk</div>}>
                            <Button icon="edit" />
                        </Popover>
                    </div>
                </div>

            </div>
            <div className="name">{name}</div>
            <div className="description">{description}</div>
            <div className="link"><a hrf={link} onClick={this.onClickLink}>{linkSimplified}</a></div>
        </div>
    }

}