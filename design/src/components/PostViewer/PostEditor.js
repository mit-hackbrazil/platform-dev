import React, { Component } from "react";
import { Grid, Paper, Card, Typography, CardContent, CardActionArea, CardMedia, IconButton, Button, CardActions, Input, TextField, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Modal, LinearProgress } from "@material-ui/core";
import api from "../../apiConnect";
import CircularProgress from '@material-ui/core/CircularProgress';


export default class PostEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: null,
            title: null,

            imageProgress: 0,
            imageReady: false,
            imageUploading: false,
            imageName: null,
            imageUrl: null,

            fileProgress: 0,
            fileReady: false,
            fileUploading: false,
            fileName: null,
            fileUrl: null
        };
    }

    onChangeContent = event => {
        this.setState({
            content: event.target.value,
        });
    };

    onChangeTitle = event => {
        this.setState({
            title: event.target.value,
        });
    };


    handleClose = () => {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    onImageChange = async (event) => {
        let file = event.target.files[0];
        this.setState({ imageUploading: true, imageReady: false, imageFile: file, imageName: file.name });
        api.posts.uploadImage(file, this.imageProgress, this.imageDone)

    }

    imageProgress = (progress) => {
        this.setState({ imageProgress: progress })
    }

    imageDone = (url) => {
        this.setState({ imageReady: true, imageUploading: false, imageUrl: url });
    }

    onFileChange = async (event) => {
        let file = event.target.files[0];
        api.posts.uploadFile(file, this.fileProgress, this.fileDone);
        this.setState({ fileUploading: true, fileReady: false, file: file, fileName: file.name });
    }

    fileProgress = (progress) => {
        this.setState({ fileProgress: progress })
    }

    fileDone = (url, name, type, size) => {
        this.setState({ fileReady: true, fileUploading: false, fileUrl: url, fileSize: size, fileType: type });
    }

    onSaveChanges = async () => {
        let { id, editKey } = api.getCredentials();
        let { fileUrl, imageUrl, content, title, fileName, fileType, fileSize } = this.state;

        let newPost = {
            title,
            content,
            files: {
                list: [
                    {
                        url: fileUrl,
                        name: fileName,
                        size: fileSize,
                        type: fileType
                    }
                ]
            },
            thumbnail: imageUrl
        }

        let send = await api.posts.add(id, editKey, null, newPost);
        console.log(send);

        this.handleSave();
    }

    handleSave = () => {
        if (this.props.onSave)
            this.props.onSave();
    }

    render() {
        let buttonImage = (
            <div className="upload-file">
                <button className="btn"> <i className="far fa-image fa-lg"></i>  {this.state.imageName ? this.state.imageName : "Selectionar Arquivo... (.png / .jpeg)"}</button>
                <input type="file" name="myfile" onChange={this.onImageChange} />
            </div>
        );

        if (this.state.imageUploading && !this.state.imageReady)
            buttonImage = (<div className="upload-file">
                <button className="btn">
                    <LinearProgress value={this.state.imageProgress} />
                    <i className="far fa-image fa-lg"></i>  {"enviando... " + this.state.imageName}</button>
            </div>
            );

        if (this.state.imageReady) {
            buttonImage = (<div className="upload-file">
                <button className="btn">
                    <i className="far fa-image fa-lg"></i>  {this.state.imageName}  <i className="far fa-check-circle fa-lg success"></i>
                </button>
            </div>);
        }

        //file upload
        let buttonFile = (
            <div className="upload-file">
                <button className="btn"> <i className="fas fa-paperclip fa-lg"></i>  {this.state.fileName ? this.state.fileName : "Selectionar Arquivo... (.pdf)"}</button>
                <input type="file" name="myfile" onChange={this.onFileChange} />
            </div>
        );

        if (this.state.fileUploading && !this.state.fileReady)
            buttonFile = (<div className="upload-file">
                <button className="btn">
                    <LinearProgress value={this.state.fileProgress} />
                    <i className="fas fa-paperclip fa-lg"></i>  {"enviando... " + this.state.fileName}</button>
            </div>
            );

        if (this.state.fileReady) {
            buttonFile = (<div className="upload-file">
                <button className="btn">
                    <i className="fas fa-paperclip fa-lg"></i>  {this.state.fileName}  <i className="far fa-check-circle fa-lg success"></i>
                </button>
            </div>);
        }

        return <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.props.open}
            onClose={this.handleClose}
            className="modal-editor-container"
        >

            <div className="modal-editor modal-inner" >
                <Typography variant="h6" id="modal-title">
                    <i class="far fa-calendar-plus"></i> Escrever Novo Post
                        </Typography>
                <Typography variant="subtitle1" id="simple-modal-description">
                    As alterações só serão salvas quando clicar no botão 'salvar'
                </Typography>

                <Typography variant="subtitle1" id="simple-modal-description">
                    Imagem (Thumbnail)
                </Typography>

                {buttonImage}

                <TextField
                    id="outlined-multiline-static"
                    label="Títutlo"
                    placeholder="Título do Post"
                    margin="normal"
                    variant="outlined"
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                    fullWidth
                />

                <TextField
                    id="outlined-multiline-static"
                    label="Descrição"
                    multiline
                    rows="10"
                    placeholder="Descrição do Arquivo anexado"
                    margin="normal"
                    variant="outlined"
                    value={this.state.content}
                    onChange={this.onChangeContent}
                    fullWidth
                />

                <Typography variant="subtitle1" id="simple-modal-description">
                    Anexar Arquivo
                </Typography>

                {buttonFile}

                <br />
                <br />

                <Button onClick={this.handleClose}>Cancelar</Button>
                <Button onClick={this.onSaveChanges}>Salvar</Button>
            </div>
        </Modal>
    }
}