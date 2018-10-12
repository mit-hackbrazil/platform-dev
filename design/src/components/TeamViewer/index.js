import React, { Component } from "react";
import { } from "./teamviewer.css";
import icon_user from "./icon_user.svg";

import { Grid, Paper, Card, Typography, CardContent, CardActionArea, CardMedia, IconButton, Button, CardActions, Input, TextField, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Modal } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

import api from "../../apiConnect";
import { Spinner } from "@blueprintjs/core";
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
        this.state = {
            editorOpen: false,
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

    render() {
        let { name, role, link, github, linkedin, photo } = this.props.member;
        let defaultPhoto = "https://github.com/mit-hackbrazil/platform-dev/blob/master/assets/user-logo.png?raw=true";

        photo = photo ? photo : defaultPhoto;

        let editMenu = null;

        if (this.props.canEdit)
            editMenu = (<CardActions>
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
                        <Typography variant="subtitle1" id="simple-modal-description">
                            As alterações só serão salvas quando clicar no botão 'salvar'
                        </Typography>
                        <TextField
                            id="standard-name"
                            label="Nome"

                            value={this.state.name}
                            onChange={(name) => this.setState({ name })}
                            margin="normal"
                            placeholder="Rita Saldanha"
                            className="editor-text"
                        />
                        <TextField
                            id="standard-name"
                            label="Posição na equipe"
                            value={this.state.name}
                            onChange={(name) => this.setState({ name })}
                            margin="normal"
                            className="editor-text"
                            helperText="separe por vírgula"
                            placeholder="CEO, CTO"
                        />

                        <TextField
                            id="standard-name"
                            label="Github (link)"
                            value={this.state.name}
                            onChange={(name) => this.setState({ name })}
                            margin="normal"
                            className="editor-text"
                            helperText="repositório de projetos"
                            placeholder="http://github.com/lucascassiano"
                        />

                        <TextField
                            id="standard-name"
                            label="Linkedin (link)"
                            value={this.state.name}
                            onChange={(name) => this.setState({ name })}
                            margin="normal"
                            placeholder="http://linkedin.com/lucascassiano"
                        />

                        <TextField
                            id="standard-name"
                            label="Site Pessoal / Portfolio (link)"
                            value={this.state.name}
                            onChange={(name) => this.setState({ name })}
                            margin="normal"
                            className="editor-text"
                            helperText="Site pessoal ou portfolio"
                            placeholder="http://linkedin.com/lucascassiano"
                        />

                        <div><Button variant="contained">Cancelar</Button>
                            <Button variant="contained" color="primary">Salvar</Button>
                        </div>

                    </div>
                </Modal>


            </CardActions>)


        return (
            <Grid item xs={6} sm={4}>
                <Card className="member-card">
                    <div className="member-card-image" >
                        <img
                            src={photo}></img>
                    </div>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Typography component="p">
                        {role}
                    </Typography>
                    <div className="member-contact">
                        <IconButton className={github ? "link-active" : null}><a href={github}><i className="fab fa-github"></i></a></ IconButton>
                        <IconButton> <i className="fab fa-linkedin-in"></i> </IconButton>
                        <IconButton> <i className="fas fa-link"></i> </ IconButton>
                    </div>

                    {editMenu}

                </Card>
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
            members: []
        }

        this.loadCurrentTeam();
    }

    loadCurrentTeam = async () => {
        let loadedTeam = await api.teams.getCurrent();
        let { members } = loadedTeam;

        //        console.log("members", members.members[0]);

        this.setState({ members: members.members, ready: true });

        //console.log("api TEAM", loadedTeam);
    }



    render() {

        let { members, canEdit } = this.state;
        console.log("members from state", members);
        let members_div = {};

        if (members)
            members_div = members.map((member) => {
                return (<MemberCard member={member} canEdit={canEdit} />);
            });

        return (<Grid container spacing={24}>
            {members_div}
        </Grid>);

    }

}