// eslint-disable-next-line

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/auth'
import 'firebase/storage'

let firebaseConfig = {
    apiKey: 'AIzaSyAVKx98FE8ymceaYrjTJTASTzhbQhdZ_x8',
    authDomain: 'projeto-xis.firebaseapp.com',
    databaseURL: 'https://projeto-xis-default-rtdb.firebaseio.com',
    projectId: 'projeto-xis',
    storageBucket: 'projeto-xis.appspot.com',
    messagingSenderId: '276636384485',
    appId: '1:276636384485:web:7360be0a2bb1d0611f280c'
};

export function fireload(){
    if(!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
    } 

}


export default firebase