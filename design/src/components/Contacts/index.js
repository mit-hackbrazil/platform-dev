import React, { Component } from "react";
import { } from "./contacts.css";
import api from "../../apiConnect";

import { Button, Modal, Typography, TextField } from "@material-ui/core";
import LinearProgress from '@material-ui/core/LinearProgress';

export default class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            editorOpen: false,
            contacts: {
                whatsapp: null,
                facebook: null,
                slack: null
            },
            whatsappEdit: null,
            facebookEdit: null,
            slackEdit: null
        }

        this.loadCurrentTeam();
    }

    loadCurrentTeam = async () => {
        let loadedTeam = await api.teams.getCurrent();
        console.log('loaded team contacts', loadedTeam);

        let { contacts } = loadedTeam;

        console.log("contacts", contacts);
        if (!contacts) {
            contacts = {
                whatsapp: "insira um link para o grupo de whatsapp",
                facebook: "insira um link para o grupo do facebook ou messenger",
                slack: "insira um link para o canal do slack"
            }
        }

        let { whatsapp, facebook, slack } = contacts;

        contacts = { whatsapp, facebook, slack };

        this.setState({
            contacts,
            team_id: loadedTeam.id,
            whatsappEdit: whatsapp,
            facebookEdit: facebook,
            slackEdit: slack,
            ready: true,
            editorOpen: false
        });

        //console.log("api TEAM", loadedTeam);
    }

    toggleEditor = () => {
        this.setState({ editorOpen: !this.state.editorOpen });
    }

    handleClose = () => {
        this.setState({ editorOpen: false });
    }

    onEditWhatsapp = (event) => {
        this.setState({
            whatsappEdit: event.target.value,
        });
    }

    onEditFacebook = (event) => {
        this.setState({
            facebookEdit: event.target.value,
        });
    }

    onEditSlack = (event) => {
        this.setState({
            slackEdit: event.target.value,
        });
    }

    onSaveChanges = () => {
        let { id, editKey } = api.getCredentials();
        let { team_id, contacts, whatsappEdit, facebookEdit, slackEdit } = this.state;

        let _contacts = {
            whatsapp: whatsappEdit,
            facebook: facebookEdit,
            slack: slackEdit
        }

        api.teams.update({ id: team_id, contacts: _contacts, edit_key: editKey }, this.loadCurrentTeam);

    }

    copyStringToClipboard(str) {
        // Create new element
        var el = document.createElement('textarea');
        // Set value (string to be copied)
        el.value = str;
        // Set non-editable to avoid focus and move outside of view
        el.setAttribute('readonly', '');
        el.style = { position: 'absolute', left: '-9999px' };
        document.body.appendChild(el);
        // Select text inside element
        el.select();
        // Copy text to clipboard
        document.execCommand('copy');
        // Remove temporary element
        document.body.removeChild(el);
    }

    render() {


        if (!this.state.ready)
            return <div className="contacts card">
                <LinearProgress />
            </div>

        let { canEdit } = this.props;
        let cardClass = canEdit ? "contacts card card-edit" : "contacts card";
        /*
    <div className="contact-button whatsapp"><i class="fab fa-whatsapp fa-lg"></i>
                        {/*this.state.contacts.whatsapp}
                        </div>
    <div className="contact-button facebook"><i class="fab fa-facebook fa-lg"></i>{this.state.contacts.facebook}</div>
    <div className="contact-button slack"><i class="fab fa-slack fa-lg"></i>{this.state.contacts.slack}</div>
        */

        /*
    
    <div class="dropdown">
    <span>Mouse over me</span>
    <div class="dropdown-content">
    <p>Hello World!</p>
    </div>
    </div>
        */
        return (
            <div className={cardClass}>
                <div className="contacts-list">
                    <div className="contact-button whatsapp"><i className="fab fa-whatsapp fa-lg"></i>
                        <div class="contact-content">
                            <i className="far fa-copy" onClick={() => this.copyStringToClipboard(this.state.contacts.whatsapp)}></i> <div>{this.state.contacts.whatsapp}</div>
                        </div>
                    </div>
                    <div className="contact-button facebook"><i class="fab fa-facebook fa-lg"></i>
                        <div class="contact-content">
                            <i className="far fa-copy" onClick={() => this.copyStringToClipboard(this.state.contacts.facebook)}></i> <div>{this.state.contacts.facebook}</div>
                        </div>
                    </div>
                    <div className="contact-button slack"><i class="fab fa-slack fa-lg"></i>
                        <div class="contact-content">
                            <i className="far fa-copy" onClick={() => this.copyStringToClipboard(this.state.contacts.slack)}></i> <div>{this.state.contacts.slack}</div>
                        </div>
                    </div>
                </div>

                {this.props.canEdit ? <Button onClick={this.toggleEditor} >Editar</Button> : null}

                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.editorOpen}
                    onClose={this.handleClose}
                    className="modal-editor-container"
                >
                    <div className="modal-editor" >
                        <Typography variant="h6" id="modal-title">
                            Editar Perfil
                        </Typography>
                        <TextField
                            id="standard-name"
                            label="Whatsapp"
                            value={this.state.whatsappEdit}
                            onChange={this.onEditWhatsapp}
                            margin="normal"
                            placeholder="Grupo do whatsapp..."
                            className="editor-text"
                        />
                        <TextField
                            id="standard-name"
                            label="Facebook"
                            value={this.state.facebookEdit}
                            onChange={this.onEditFacebook}
                            margin="normal"
                            placeholder="Grupo do Facebook..."
                            className="editor-text"
                        />
                        <TextField
                            id="standard-name"
                            label="Slack"
                            value={this.state.slackEdit}
                            onChange={this.onEditSlack}
                            margin="normal"
                            placeholder="Canal no Slack..."
                            className="editor-text"
                        />



                        <Button onClick={this.toggleEditor}>Cancelar</Button>

                        <Button onClick={this.onSaveChanges}>Salvar</Button>

                    </div>
                </Modal>
            </div >
        );
    }

}