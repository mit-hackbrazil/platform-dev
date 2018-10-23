import React, { Component } from "react";
import { } from "./teamviewer.css";

import { Grid, Paper, Card, Typography, CardContent, CardActionArea, CardMedia, IconButton, Button, CardActions, Input, TextField, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Modal } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import api from "../../apiConnect";
/*
{"members":
[{
    "name":"Lucas Cassiano",
    "role":";) seduzente",
    "link":"http://google.com",
    "photo":null},
 {
     "name":"Lara Timbó",
     "role":"moral",
     "link":"http:''airbnb.com",
     "photo":null
  },
  {"name":"Allan Costa","role":"bixao","link":"http://nasa.gov","photo":null}]}
*/

class MemberCard extends Component {
    constructor(props) {
        super(props);
        let { name, role, link, github, linkedin } = props.member;

        this.state = {
            editorOpen: false,
            nameEdit: name,
            roleEdit: role != undefined ? role : null,
            linkEdit: link != undefined ? link : null,
            githubEdit: github ? github : null,
            linkedinEdit: linkedin ? linkedin : null,
            photoFile: null,
            fileName: null
        }
    }

    toggleEditor = () => {
        this.setState({ editorOpen: !this.state.editorOpen });
    }

    handleClose = () => {
        this.setState({ editorOpen: false });
    }

    getModalStyle = () => {
        const top = 50;
        const left = 50;

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    styles = theme => ({
        paper: {
            position: 'absolute',
            width: "100vw",
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing.unit * 4,
        },
    });

    editName = event => {
        this.setState({
            nameEdit: event.target.value,
        });
    };

    editRole = event => {
        this.setState({
            roleEdit: event.target.value,
        });
    };

    editLink = event => {
        this.setState({
            linkEdit: event.target.value,
        });
    };

    editGithub = event => {
        this.setState({
            githubEdit: event.target.value,
        });
    };

    editLinkedin = event => {
        this.setState({
            linkedinEdit: event.target.value,
        });
    };

    editPhoto = event => {
        this.setState({
            photoEdit: event.target.value,
        });
    };

    onInputChange = async (event) => {
        let file = event.target.files[0];
        this.setState({ photoFile: file, fileName: file.name });
    }

    onSaveChanges = () => {
        let { id, editKey } = api.getCredentials();
        let { team_id, memberIndex, members } = this.props;

        let { nameEdit, roleEdit, linkedinEdit, linkEdit, githubEdit, photoEdit, fileName, photoFile } = this.state;

        //console.log("member index", memberIndex);
        let member = {
            name: nameEdit,
            role: roleEdit,
            linkedin: linkedinEdit,
            link: linkEdit,
            github: githubEdit,
        }

        if (this.props.onChange)
            this.props.onChange(memberIndex, member, photoFile);

        this.toggleEditor();
    }

    render() {
        let { name, role, link, github, linkedin, photo } = this.props.member;
        let defaultPhoto = "https://github.com/mit-hackbrazil/platform-dev/blob/master/assets/user-logo.png?raw=true";
        let { canEdit } = this.props;

        photo = photo ? photo : defaultPhoto;

        let editMenu = null;

        if (this.props.canEdit)
            editMenu = (<Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.editorOpen}
                onClose={this.handleClose}
                className="modal-editor-container"
            >

                <div className="modal-editor modal-inner" >
                    <Typography variant="h6" id="modal-title">
                        <i class="far fa-user"></i> Editar Perfil
                        </Typography>
                    <Typography variant="subtitle1" id="simple-modal-description">
                        As alterações só serão salvas quando clicar no botão 'salvar'
                        </Typography>

                    <p>Foto do Perfil</p>

                    <div className="upload-file">
                        <button className="btn"> <i className="fas fa-file-upload fa-lg"></i>  {this.state.fileName ? this.state.fileName : "Selectionar Arquivo... (.pdf)"}</button>
                        <input type="file" name="myfile" onChange={this.onInputChange} />
                    </div>

                    <TextField
                        id="standard-name"
                        label="Nome"
                        value={this.state.nameEdit}
                        onChange={this.editName}
                        margin="normal"
                        placeholder="Nome do Participante"
                        className="editor-text"
                    />
                    <TextField
                        id="role-name"
                        label="Posição na equipe"
                        value={this.state.roleEdit}
                        onChange={this.editRole}
                        margin="normal"
                        className="editor-text"
                        helperText="separe por vírgula"
                        placeholder="CEO, CTO"
                    />

                    <TextField
                        id="standard-name"
                        label="Github (link)"
                        value={this.state.githubEdit}
                        onChange={this.editGithub}
                        margin="normal"
                        className="editor-text"
                        helperText="repositório de projetos"
                        placeholder="http://github.com/lucascassiano"
                    />

                    <TextField
                        id="standard-name"
                        label="Linkedin (link)"
                        value={this.state.linkedinEdit}
                        onChange={this.editLinkedin}
                        margin="normal"
                        placeholder="http://linkedin.com/lucascassiano"
                    />

                    <TextField
                        id="standard-name"
                        label="Site Pessoal / Portfolio (link)"
                        value={this.state.linkEdit}
                        onChange={this.linkEdit}
                        margin="normal"
                        className="editor-text"
                        helperText="Site pessoal ou portfolio"
                        placeholder="http://linkedin.com/lucascassiano"
                    />

                    <Button onClick={this.toggleEditor}>Cancelar</Button>
                    <Button onClick={this.onSaveChanges}>Salvar</Button>
                </div>
            </Modal>);

        let cardClass = canEdit ? "member-card card card-edit" : "member-card card";

        return (
            <Grid item xs={12} sm={4}>
                <div className={cardClass}>

                    <div className="image" >
                        <img
                            src={photo}></img>
                    </div>
                    <div className="name">
                        {name}
                    </div>
                    <div className="role">
                        {role}
                    </div>
                    <div className="contact">
                        <IconButton className={github ? "link-active" : null}><a href={github}><i className="fab fa-github"></i></a></ IconButton>
                        <IconButton> <i className="fab fa-linkedin-in"></i> </IconButton>
                        <IconButton> <i className="fas fa-link"></i> </ IconButton>
                    </div>

                    {this.props.canEdit ? <Button className="card-edit-button" onClick={this.toggleEditor}>Editar</Button> : null}

                    {editMenu}

                </div>
            </Grid>
        )
    }
}
export default class TeamViewer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            canEdit: props.canEdit ? props.canEdit : false,
            team_id: 0,
            members: []
        }

        this.loadCurrentTeam();
    }

    loadCurrentTeam = async () => {
        let loadedTeam = await api.teams.getCurrent();
        let { members } = loadedTeam;

        this.setState({ team_id: loadedTeam.id, members: members.members, ready: true });
    }

    onMemberChange = async (index, member, photo) => {
        let { id, editKey } = api.getCredentials();
        let { team_id, members } = this.state;


        if (photo) {
            //Updloading User Photos
            api.teams.uploadProfileImage(photo, null, (url) => {
                member.photo = url;
                members[index] = member;
                let _members = {
                    members: members
                };
                api.teams.update({ id: team_id, members: _members, edit_key: editKey }, this.loadCurrentTeam);
            });
        }
        else {
            members[index] = member;

            let _members = {
                members: members
            };

            api.teams.update({ id: team_id, members: _members, edit_key: editKey }, this.loadCurrentTeam);
        }

    }

    render() {
        let { team_id, members, canEdit } = this.state;
        let members_div = <div className="contacts"><LinearProgress /></div>;

        if (members && members.length)
            members_div = members.map((member, index) => {
                return (<MemberCard key={"member_card_" + index} team_id={team_id} member={member} canEdit={canEdit} memberIndex={index} onChange={this.onMemberChange} />);
            });

        return (<Grid container spacing={24}>
            {members_div}
        </Grid>);

    }

}