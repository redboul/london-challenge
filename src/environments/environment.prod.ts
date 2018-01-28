import firebaseConfig from './firebase.config';
import * as firebase from 'firebase';

export const environment = {
  production: true,
  firebase: firebaseConfig
};

firebase.initializeApp(environment.firebase);
