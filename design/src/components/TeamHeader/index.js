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
    Icon,
    FileInput,
    EditableText
} from "@blueprintjs/core";

//API connect

import api from "../../apiConnect";

/*
example of props
let team = {
  name: String,
  logo: String,
  description: String,
  link: String
}
*/

function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        console.log(reader.result);
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

function canUploadFile(file) {
    let fileSize = file.size / 1024 / 1024; //in MB
    let type = file.type.split("/")[0];
    if (fileSize <= 10 && type == "image") {
        return true;
    }
    else
        return false;
}

class UploadTeamLogo extends Component {
    onInputChange = (event) => {
        let file = event.target.files[0];

        console.log("fileevent", file);
        console.log("canUploadFile", canUploadFile(file));
        let base64 = getBase64(file);
    }
    render() {
        return (<div className="popup-content">
            <p>Apenas arquivos dos tipos .png, .jpeg e .jpg abaixo de 10Mb serão aceitos.</p>
            <p>Sugerimos a resolução de 1024x1024 pixels para a imagem da sua logo.</p>

            <label class="bp3-file-input .modifier">
                <input type="file" accept='image/*' onChange={this.onInputChange} />
                <span class="bp3-file-upload-input">Selecionar Imagem...</span>
            </label>
        </div >);
    }
}

export default class TeamHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,

        }

        console.log("api TEST:", api.teams.get(12));
    }

    onChangeName = (name) => {
        // this.setState({ name });
    }

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
                        <Popover content={<UploadTeamLogo />}>
                            <Button icon="edit" />
                        </Popover>
                    </div>
                </div>

            </div>


            <EditableText
                className="editable-text team-name"
                maxLength={200}
                maxLines={1}
                minLines={1}
                multiline={false}
                placeholder="Editar nome do time..."
                value={this.state.name}
            />

            <div className="description">{description}</div>
            <div className="link"><a hrf={link} onClick={this.onClickLink}>{linkSimplified}</a></div>
        </div>
    }

}