// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import firebaseConfig from './firebase.config';

export const environment = {
  production: false,
  firebase: {
    projectId: 'dublin-challenge-376221',
    appId: '1:324882948265:web:28cb3cb65876b70a4fc9b8',
    storageBucket: 'dublin-challenge-376221.appspot.com',
    apiKey: 'AIzaSyDUCFJIRwp7_zVyvrXiHLmloZdHDwK-pmY',
    authDomain: 'dublin-challenge-376221.firebaseapp.com',
    messagingSenderId: '324882948265',
  }
};
