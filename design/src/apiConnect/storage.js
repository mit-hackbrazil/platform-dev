import firebase from "firebase";
import 'firebase/storage';

var config = {
    apiKey: "AIzaSyDe7sKBJyuHpW8TQlKml-z_XT7wa6FmCtI",
    authDomain: "hackbrazil-files.firebaseapp.com",
    databaseURL: "https://hackbrazil-files.firebaseio.com",
    projectId: "hackbrazil-files",
    storageBucket: "hackbrazil-files.appspot.com",
    messagingSenderId: "381639451152"
};

firebase.initializeApp(config);

const storage = firebase.storage();

export {
    storage, firebase as default
}

