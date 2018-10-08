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
    Spinner,
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
  link: String,
  members:JSON
}
*/

function getBase64(file, callback) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        console.log(reader.result);
        callback(reader.result);
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
    constructor(props) {
        super(props);
        this.state = {
            fileName: "Selecionar Imagem...",
            fileSrc: null
        }
    }

    onInputChange = async (event) => {
        let file = event.target.files[0];

        getBase64(file, (base64) => {
            this.setState({ fileName: file.name, fileSrc: base64 });
            if (this.props.callback) {
                this.props.callback(base64);
            }
        });
    }

    render() {
        return (<div className="popup-content">
            <p>Apenas arquivos dos tipos .png, .jpeg e .jpg abaixo de 10Mb serão aceitos.</p>
            <p>Sugerimos a resolução de 1024x1024 pixels para a imagem da sua logo.</p>

            <label className="bp3-file-input .modifier">
                <input type="file" accept='image/*' onChange={this.onInputChange} />
                <span className="bp3-file-upload-input">{this.state.fileName}</span>
            </label>
        </div >);
    }
}

export default class TeamHeader extends Component {
    constructor(props) {
        super(props);
        let { name, logo, description, link } = props.team;
        this.state = {
            name, logo, description, link,
            canEdit: props.canEdit ? props.canEdit : false,
            ready: false
        }

        this.loadCurrentTeam();
    }

    loadCurrentTeam = async () => {
        let loadedTeam = await api.teams.getCurrent();
        let { name, description, link, logo } = loadedTeam;

        this.setState({ name, description, link, logo, ready: true });

        console.log("api TEAM", loadedTeam);
    }

    onChangeName = (name) => {
        this.setState({ name });
    }

    onChangeDescription = (description) => {
        this.setState({ description });
    }

    onChangeLink = (link) => {
        this.setState({ link });
    }

    onClickLink = () => {
        let { link } = this.props.team;
        let win = window.open(link, '_blank');
        win.focus();
    }

    onNewLogo = (imageSrc) => {
        console.log("new logo", imageSrc);
        this.setState({ logo: imageSrc });
    }

    onUpdateParameter = () => {
        console.log("updated the header :)");
        let { id, editKey } = api.getCredentials;

        let { name, logo, description, link } = this.state;
        api.teams.update({ id, name, logo, description, link, edit_key: editKey });
    }

    render() {
        let { name, logo, description, link } = this.props.team;
        let linkSimplified = link.replace("https://", "").replace("http://", "");

        let content = <div className="team-header">

            <div className="logo">
                <div className="image">
                    <img src={this.state.logo} />
                    <Popover className="logo-edit" content={<UploadTeamLogo callback={this.onNewLogo} />}>
                        <Button icon="edit" className={Classes.MINIMAL} />
                    </Popover>
                </div>
            </div>

            <div className="info">
                <EditableText
                    className="editable-text team-name"
                    maxLength={200}
                    maxLines={1}
                    minLines={1}
                    multiline={false}
                    placeholder="Editar nome do time..."
                    onConfirm={this.onUpdateParameter}
                    value={this.state.name}
                    disabled={!this.state.canEdit}
                    onChange={this.onChangeName}
                />

                <EditableText
                    className="editable-text team-description"
                    maxLength={400}
                    maxLines={2}
                    minLines={1}
                    multiline={true}
                    placeholder="Editar descrição do time..."
                    value={this.state.description}
                    disabled={!this.state.canEdit}
                    onChange={this.onChangeDescription}
                />
                <div className="link">
                    <a hrf={this.state.link} onClick={this.onClickLink}><Icon icon="link" /></a>
                    <EditableText
                        className="editable-text team-description"
                        maxLength={100}
                        maxLines={1}
                        minLines={1}
                        multiline={false}
                        placeholder="Editar link para site do time..."
                        value={this.state.link}
                        disabled={!this.state.canEdit}
                        onChange={this.onChangeLink}
                    />

                </div>
            </div>
        </div>;

        //end of content

        let mockup = <div className="team-header ">

            <div className="logo">
                <div className="image mockup">
                </div>
            </div>

            <div className="info">
                <div className="name-mockup"></div>
                <div className="description-mockup"></div>
                <div className="link-mockup"></div>
            </div>
        </div>;

        if (this.state.ready)
            return content;
        else
            return mockup;
        //return <Spinner size={100} />

    }

}