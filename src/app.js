import { MDCRipple } from '@material/ripple';
import { MDCTopAppBar } from "@material/top-app-bar";
import { MDCDrawer } from "@material/drawer";
import { MDCList } from "@material/list";
import firebase from 'firebase/app';
import 'firebase/auth';

const google_signin_btn = document.getElementById('google-signin-button');

const list = MDCList.attachTo(document.querySelector('.mdc-list'));
list.wrapFocus = true;

const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
const topAppBar = MDCTopAppBar.attachTo(document.getElementById('app-bar'));
topAppBar.setScrollTarget(document.getElementById('main-content'));
topAppBar.listen('MDCTopAppBar:nav', () => {
    drawer.open = !drawer.open;
});

const ripple = new MDCRipple(google_signin_btn);

firebase.initializeApp({
    apiKey: "AIzaSyAAR_MqMf_2xYmcx-WEpG8iITmaKXwhK4w",
    authDomain: "mirror-happi.firebaseapp.com",
    databaseURL: "https://mirror-happi.firebaseio.com",
    projectId: "mirror-happi",
    storageBucket: "mirror-happi.appspot.com",
    messagingSenderId: "948740577789"
});

google_signin_btn.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');
    provider.addScope('https://www.googleapis.com/auth/calendar');

    firebase.auth().signInWithRedirect(provider).catch(error => {
        console.error(`Error while logging in user" ${error}`);
    });
});

firebase.auth().onAuthStateChanged(user => {
    if (typeof user !== undefined && user) {
        google_signin_btn.style.display = 'none';
        document.querySelector('.content').innerHTML = `Greetings ${user.displayName}!`;
    }
});