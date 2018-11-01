import { GraphQuery, GraphJson } from "./index.js";
import { storage } from "./storage";

export async function getAll(team_id, editKey, viewKey, args = "id, title, content, files, thumbnail, timestamp, update") {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var team_id = url.searchParams.get("id");
    var editKey = url.searchParams.get("edit");
    var viewKey = url.searchParams.get("view");

    let query = `
            query{
                posts(args:{
                    team:${team_id},
                    editKey:"${editKey}",
                    viewKey:"${viewKey}",
                }){
                    ${args}
                }
            }
        `;

    let results = await GraphQuery(query);
    return results;
}

export async function add(team_id, editKey, viewKey, newPost) {
    let { title, content, files, thumbnail } = newPost;
    let filesJSON = GraphJson(files);
    let query = `
        mutation{
            addPost(args:{
                team:${team_id}, 
                editKey:"${editKey}",
                title:"${title}",
                content:"${content}",
                files:${filesJSON},
                thumbnail:"${thumbnail}"
            })
        }
    `;
    console.log("query", query);
    let results = await GraphQuery(query);
    return results;
}

export async function uploadImage(file, progress_callback, done) {
    const uploadTask = storage.ref(`posts/images/${file.name}`).put(file);

    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            if (progress_callback) {
                progress_callback(progress);
            }
        },
        (error) => {
            alert("ERROR: problem with image upload");
            console.log(error);
            if (done)
                done(false);
        },
        () => {
            storage.ref('posts/images/').child(file.name).getDownloadURL().then(url => {
                if (done)
                    done(url, file.name, file.type, file.size);
                // this.setState({ url });
            })
        });
}

export async function uploadFile(file, progress_callback, done) {
    const uploadTask = storage.ref(`posts/files/${file.name}`).put(file);

    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            if (progress_callback) {
                progress_callback(progress);
            }
        },
        (error) => {
            // error function ....
            alert("ERROR: problem with image upload");
            console.log(error);
        },
        () => {
            storage.ref('posts/files/').child(file.name).getDownloadURL().then(url => {
                if (done)
                    done(url, file.name, file.type, file.size);
            })
        });
}