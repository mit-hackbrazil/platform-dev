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
import { AnchorButton, Button, Classes, Code, Dialog, H5, Intent, Switch, Tooltip, Spinner } from "@blueprintjs/core";
import apiConnect from "../../apiConnect";

import PostEditor from "./PostEditor";

class ButtonAddPost extends Component {
    render() {
        return <div className="action-button-add-post" onClick={this.props.onCLick}>
            <i class="fas fa-plus fa-2x"></i>
        </div>
    }
}

class Post extends Component {
    render() {
        let { title, content, description, thumbnail, date, files } = this.props.post;
        let timestamp = moment(date).format('MMMM Do YYYY');

        //settings default thumbnail github/assets/
        thumbnail = thumbnail ? thumbnail : "https://github.com/mit-hackbrazil/platform-dev/blob/master/assets/place-holder-thumbnail.png?raw=true";
        console.log("files", files);
        let filesList = files.list.map((file) => {
            return <div>
                <div>
                    {file.name}
                </div>
                <div>
                    {file.size}
                </div>
            </div>
        });

        return <div className="card post" >
            <div className="image"><img src={thumbnail} /></div>
            <div className="info">
                <div className="title">{title}</div>
                <div className="post-content">{content}</div>
                <div className="date">{timestamp}</div>
                <div className="file">
                    {filesList}
                </div>
            </div>


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

        }
        this.loadPosts();
    }

    loadPosts = async () => {
        let posts = await apiConnect.posts.getAll();
        if (posts.posts)
            this.setState({ posts: posts.posts, ready: true });
    }
    onOpenEditor = () => {
        this.setState({ isOpen: true });
    }

    onCloseEditor = () => {
        this.setState({ isOpen: false });
    }


    render() {
        let { posts, ready } = this.state;

        let postsList = posts.map((post) => {
            return <Post post={post} />
        });

        if (!ready)
            return <Spinner size={50} />
        return <div className="post-viewer">
            <ButtonAddPost onCLick={this.onOpenEditor} />
            <div className="pots-list">
                {postsList}
            </div>
            <PostEditor isOpen={this.state.isOpen} onClose={this.onCloseEditor} />
        </div>
    }
}