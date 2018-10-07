/* Post viewer
author: lucascassiano
date: August 23 2018
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

class Post extends Component {
    render() {
        let { title, description, image, date, file } = this.props.post;
        let timestamp = moment(date).format('MMMM Do YYYY');
        return <div className="post" >
            <div className="image"><img src={image} /></div>
            <div className="info">
                <div className="title">{title}</div>
                <div className="description">{description}</div>
                <div className="date">{timestamp}</div>
                <div className="file">
                    <a href={file.url}>{file.name}</a>
                </div>
            </div>




        </div>
    }
}

export default class PostViewer extends Component {

    render() {
        let { posts } = this.props;

        let postsList = posts.map((post) => {
            return <Post post={post} />
        });
        return <div className="post-viewer">
            <div className="pots-list">
                {postsList}
            </div>
        </div>
    }
}