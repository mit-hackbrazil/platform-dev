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
            <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink">
                <defs>
                    <rect id="path-1" width="60" height="60" />
                    <filter x="-26.7%" y="-23.3%" width="153.3%" height="153.3%" filterUnits="objectBoundingBox"
                        id="filter-2">
                        <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1" />
                        <feGaussianBlur stdDeviation="5" in="shadowOffsetOuter1" result="shadowBlurOuter1"
                        />
                        <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1"
                        />
                        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" in="shadowBlurOuter1"
                        />
                    </filter>
                </defs>
                <g id="Page-1" fill="none" fillRule="evenodd">
                    <g id="Artboard-2" transform="translate(-112 -136)">
                        <g id="Group" transform="translate(122 144)">
                            <g >
                                <rect id="action-button-bg" stroke="#FFF" strokeLinejoin="square" fillOpacity="1.0" fill="#111"
                                    x="0.5" y="0.5" width="59" height="59" />
                            </g>
                            <g id="Add" transform="translate(16.098 15.366)" fill="#FFF">
                                <path d="M26.8682927,14.1538462 L15.1609756,14.1538462 L15.1609756,1.84615385 C15.1609756,1.20890221 14.6695808,0.692307692 14.0634146,0.692307692 C13.4572484,0.692307692 12.9658537,1.20890221 12.9658537,1.84615385 L12.9658537,14.1538462 L1.25853659,14.1538462 C0.652370397,14.1538462 0.16097561,14.6704407 0.16097561,15.3076923 C0.16097561,15.9449439 0.652370397,16.4615385 1.25853659,16.4615385 L12.9658537,16.4615385 L12.9658537,28.7692308 C12.9658537,29.4064824 13.4572484,29.9230769 14.0634146,29.9230769 C14.6695808,29.9230769 15.1609756,29.4064824 15.1609756,28.7692308 L15.1609756,16.4615385 L26.8682927,16.4615385 C27.4744589,16.4615385 27.9658537,15.9449439 27.9658537,15.3076923 C27.9658537,14.6704407 27.4744589,14.1538462 26.8682927,14.1538462 L26.8682927,14.1538462 Z"
                                    id="Shape" />
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
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