
import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCXSfjBPr1R1z5F4Ot6Ym6sX-Z-gEtIw14",
    authDomain: "realestate-1676c.firebaseapp.com",
    projectId: "realestate-1676c",
    storageBucket: "realestate-1676c.appspot.com",
    messagingSenderId: "214087128660",
    appId: "1:214087128660:web:165e5a30b651df827f3fc1"
};


const fire = firebase.initializeApp(firebaseConfig);

export default fire;