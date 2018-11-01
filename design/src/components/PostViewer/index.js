/* Post viewer
author: lucascassiano
date: August 23 2018
last updated: October 8 2018
example of props: 

const posts = [
  {
    title: STRING,
    description: STRING (long),
    image: URL,
    date: TIMESTAMP,
    file: {
      name: STRING,
      url: URL
    }
  }
]

*/
import React, { Component } from "react";
import { } from "./post-viewer.css";
import moment from "moment";

import { Grid, Paper, Card, Typography, CardContent, CardActionArea, CardMedia, IconButton, Button, CardActions, Input, TextField, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Modal, LinearProgress } from "@material-ui/core";

import apiConnect from "../../apiConnect";

import PostEditor from "./PostEditor";

import addIcon from "./addIcon.svg";

class ButtonAddPost extends Component {
    render() {
        return <div className="action-button-add-post" onClick={this.props.onCLick}>
            <img src={addIcon} />
        </div>
    }
}

class PostModal extends Component {
    handleClose = () => {
        if (this.props.onClose)
            this.props.onClose();
    }

    render() {
        let files = this.props.files;

        let filesList = files.list.map((file) => {
            if (file.name == 'undefined' || !file || !file.name) {
                return null;
            }

            return <li>
                <div>
                    {file.name}
                </div>
                <div>
                    {file.size}
                </div>
                <a href={file.url}>
                    download
                </a>
            </li>
        });


        return <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.props.open}
            onClose={this.handleClose}
            className="modal-editor-container"
        >

            <div className="modal-editor modal-inne post-open" >
                <Typography variant="h6" id="modal-title">
                    <i class="far fa-calendar-plus"></i> {this.props.title}
                </Typography>
                <Typography variant="subtitle1" id="simple-modal-description">
                    {this.props.date}
                </Typography>
                <div className="post-open-content">
                    <p>
                        {this.props.content}
                    </p>

                    <h2>
                        {filesList ? "Arquivos Anexados" : null}
                    </h2>
                    <ul className="files">
                        {filesList}
                    </ul>
                </div>
                <br />
                <Button onClick={this.handleClose}>Fechar</Button>
            </div>
        </Modal>
    }
}

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewerOpen: false
        }
    }

    openPost = () => {
        this.setState({ viewerOpen: true })
    }

    closePost = () => {
        this.setState({ viewerOpen: false })
    }

    render() {
        let { title, content, description, thumbnail, date, files } = this.props.post;
        let timestamp = moment(date).format('DD/MM/YY');
        thumbnail = thumbnail != null && thumbnail != 'null' ? thumbnail : "https://github.com/mit-hackbrazil/platform-dev/blob/master/assets/place-holder-thumbnail.png?raw=true";

        let filesList = files.list.map((file) => {
            if (file.name == 'undefined' || !file || !file.name) {
                return null;
            }
            return <div>
                <div>
                    {file.name}
                </div>
                <div>
                    {file.size}
                </div>
            </div>
        });

        return <div className="card post">
            <div className="image" onClick={this.openPost}><img src={thumbnail} /></div>
            <div className="info" onClick={this.openPost}>
                <div className="title">{title}</div>
                <div className="post-content">{content}</div>
                <div className="date">{timestamp}</div>
                <div className="file">
                    {filesList ? filesList : null}
                </div>
            </div>

            <Button onClick={this.openPost}>Abrir</Button>

            <PostModal
                content={content}
                title={title}
                date={date}
                files={files}
                open={this.state.viewerOpen}
                onClose={this.closePost} />
        </div>
    }
}

export default class PostViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            posts: [],
            ready: false,
            editorOpen: false
        }
        this.loadPosts();
    }

    loadPosts = async () => {
        let posts = await apiConnect.posts.getAll();
        if (posts.posts)
            this.setState({ posts: posts.posts, ready: true });
        else
            this.setState({ posts: null, ready: true });
    }
    onOpenEditor = () => {
        this.setState({ editorOpen: true });
    }

    onCloseEditor = () => {
        this.setState({ editorOpen: false });
    }

    onSave = () => {
        this.loadPosts();
        this.setState({ editorOpen: false });
    }

    render() {
        let { posts, ready } = this.state;
        let postsList = <div className="card"> <h2>Nenhum Post ainda?</h2><p>Adicione Posts clicando no Botão  <img src={addIcon} width="30px" /> no canto inferior direito</p></div>
        if (posts != null)
            postsList = posts.map((post) => {
                return <Grid item sm={12} sm={6}>
                    <Post post={post} />
                </Grid>
            });


        if (!ready)
            return <div> <LinearProgress /> <ButtonAddPost onCLick={this.onOpenEditor} /></div>
        return <div className="post-viewer">
            <Grid container spacing={16}>
                {postsList}
            </Grid>

            <ButtonAddPost onCLick={this.onOpenEditor} />
            <PostEditor open={this.state.editorOpen} onClose={this.onCloseEditor} onSave={this.onSave} />
        </div>
    }
}