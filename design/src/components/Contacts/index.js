import React, { Component } from "react";
import { } from "./contacts.css";
import api from "../../apiConnect";

import { Button, Modal, Typography, TextField } from "@material-ui/core";

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
        let loadedTeam = await api.teams.getCurrent("contacts");
        let { contacts } = loadedTeam;
        console.log("contacts", contacts);

        this.setState({
            contacts,
            whatsappEdit: contacts.whatsapp,
            facebookEdit: contacts.facebook,
            slackEdit: contacts.slack,
            ready: true
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

        api.teams.update({ id: team_id, contacts: _contacts }, () =>
            this.setState({
                contacts: _contacts,
                editorOpen: false
            })
        );
    }

    render() {
        return (
            <div className="contacts card">
                <div className="contacts-list">
                    <div><i class="fab fa-whatsapp fa-lg"></i>{this.state.contacts.whatsapp}</div>
                    <div><i class="fab fa-facebook fa-lg"></i>{this.state.contacts.facebook}</div>
                    <div><i class="fab fa-slack fa-lg"></i>{this.state.contacts.slack}</div>
                </div>

                <Button onClick={this.toggleEditor}>Editar</Button>

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
                            onChange={this.onEditWhatsapp}
                            margin="normal"
                            placeholder="Grupo do Facebook..."
                            className="editor-text"
                        />
                        <TextField
                            id="standard-name"
                            label="Slack"
                            value={this.state.slackEdit}
                            onChange={this.onEditWhatsapp}
                            margin="normal"
                            placeholder="Canal no Slack..."
                            className="editor-text"
                        />



                        <Button onClick={this.toggleEditor}>Cancelar</Button>

                        <Button onClick={this.onSaveChanges}>Salvar</Button>

                    </div>
                </Modal>
            </div>
        );
    }

}