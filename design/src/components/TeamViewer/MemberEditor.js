import React, { Component } from "react";
import { Grid, Paper, Card, Typography, CardContent, CardActionArea, CardMedia, IconButton, Button, CardActions, Input, TextField, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Modal } from "@material-ui/core";

export default class MemberEditor extends Component {
    render() {
        return <Modal
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
                    placeholder="http://github.com/<SEU_PERFIL>"
                />

                <TextField
                    id="standard-name"
                    label="Linkedin (link)"
                    value={this.state.linkedinEdit}
                    onChange={this.editLinkedin}
                    margin="normal"
                    helperText="link para perfil do Linkedin"
                    placeholder="http://linkedin.com/<SEU_PERFIL>"
                    fullWidth
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
        </Modal>
    }
}