import firebaseConfig from './firebase.config';
import * as firebase from 'firebase/compat';

export const environment = {
  production: true,
  firebase: firebaseConfig
};

firebase.initializeApp(environment.firebase);
