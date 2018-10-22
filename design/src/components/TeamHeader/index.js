import React, { Component } from "react";
import { } from "./team-header.css";
import icon_edit from "./icon_edit.svg";

import {
    AnchorButton,
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
import apiConnect from "../../apiConnect";

import { Button, TextField, Modal, LinearProgress } from "@material-ui/core";

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

        api.teams.uploadLogo(file, null, (url) => {
            this.props.callback(url);
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
            ready: false,
            editorOpen: false,
            nameEdit: name,
            logoEdit: logo,
            descriptionEdit: description,
            linkEdit: link,
            logoFile: null
        }
        this.loadCurrentTeam();
    }

    loadCurrentTeam = async () => {
        let loadedTeam = await api.teams.getCurrent();
        let { name, description, link, logo } = loadedTeam;
        this.setState({ team_id: loadedTeam.id, name, description, link, logo, nameEdit: name, descriptionEdit: description, linkEdit: link, ready: true, editorOpen: false });
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

    onNewLogo = (imageUrl) => {
        this.setState({ logo: imageUrl });
        let { editKey } = api.getCredentials();
        let { team_id } = this.state;
        api.teams.update({ id: team_id, edit_key: editKey, logo: imageUrl });
    }

    onInputChange = async (event) => {
        let file = event.target.files[0];
        this.setState({ logoFile: file, fileName: file.name });
    }

    onSaveChanges = () => {
        let { id, editKey } = api.getCredentials();
        let { team_id, nameEdit, descriptionEdit, linkEdit } = this.state;
        api.teams.update({ id: team_id, name: nameEdit, description: descriptionEdit, link: linkEdit, edit_key: editKey }, this.loadCurrentTeam);
        //check if needs to upload file
        if (this.state.logoFile)
            api.teams.uploadLogo(this.state.logoFile, null, (url) => {
                this.onNewLogo(url);
            });
    }

    toggleEditor = () => {
        this.setState({ editorOpen: !this.state.editorOpen });
    }


    handleClose = () => {
        this.setState({ editorOpen: false });
    }

    editName = event => {
        this.setState({
            nameEdit: event.target.value,
        });
    };

    editDescription = event => {
        this.setState({
            descriptionEdit: event.target.value,
        });
    }

    editLink = event => {
        this.setState({
            linkEdit: event.target.value,
        });
    }

    render() {
        let { name, logo, description, link } = this.props.team;
        let linkSimplified = link.replace("https://", "").replace("http://", "");
        let defaultImageUrl = "https://github.com/mit-hackbrazil/platform-dev/blob/master/assets/add-logo.png?raw=true";

        let cardClass = this.props.canEdit ? "team-header card card-edit" : "team-header card";

        let content = <div className={cardClass}>
            <div className="logo">
                <div className="image">
                    <img src={this.state.logo ? this.state.logo : defaultImageUrl} />
                    <Popover className="logo-edit" content={<UploadTeamLogo callback={this.onNewLogo} />}>
                        <Button icon="edit" />
                    </Popover>
                </div>
            </div>

            <div className="info">
                <div className="name-0">{this.state.name}</div>
                <div className="name-1">{this.state.description ? this.state.description : "Adicionar descrição da equipe ..."}</div>
                <div className="name-2">{this.state.link ? this.state.link : "Adicionar website da equipe ..."} <a hrf={this.state.link} onClick={this.onClickLink}><Icon icon="link" /></a></div>
            </div>

            {this.props.canEdit ? <Button onClick={this.toggleEditor} className="card-edit-button">Editar</Button> : null}

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.editorOpen}
                onClose={this.handleClose}
                className="modal-editor-container"
            >
                <div className="modal-editor" >
                    <div className="modal-inner">
                        <p>Logo do Time</p>
                        <div className="upload-file">
                            <button className="btn"> <i className="fas fa-file-upload fa-lg"></i>  {this.state.fileName ? this.state.fileName : "Selectionar Arquivo.."}</button>
                            <input type="file" name="myfile" onChange={this.onInputChange} />
                        </div>

                        <TextField
                            id="standard-name"
                            label="Nome do Time"
                            value={this.state.nameEdit}
                            onChange={this.editName}
                            margin="normal"
                            placeholder="Minha equipe..."
                            className="editor-text"
                        />

                        <TextField
                            id="standard-name"
                            label="Descrição"
                            value={this.state.descriptionEdit}
                            onChange={this.editDescription}
                            margin="normal"
                            placeholder="Descrição do time, em poucas linhas"
                            className="editor-text"
                        />

                        <TextField
                            label="Website da equipe"
                            value={this.state.linkEdit}
                            onChange={this.editLink}
                            margin="normal"
                            placeholder="http://meuprojeto.com"
                            className="editor-text"
                        />
                    </div>


                    <Button onClick={this.toggleEditor}>Cancelar</Button>

                    <Button onClick={this.onSaveChanges}>Salvar</Button>

                </div>
            </Modal>
        </div>;

        //end of content

        let mockup = <div className="team-header card">


            <div className="logo">
                <div className="image mockup">
                </div>
            </div>

            <div className="info">
                <LinearProgress />
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