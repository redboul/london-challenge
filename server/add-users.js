import admin from 'firebase-admin';
import inquirer from 'inquirer';
import { v4 as uuidv4 } from'uuid';
import serviceAccount from '../.private/dublin-challenge.mjs';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://dublin-challenge.firebaseio.com',
});

var db = admin.firestore();

console.log('Script to add or update a new London challenge user');
saveOrUpdateUser();

async function saveOrUpdateUser() {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'email',
      message: 'User email:',
    },
    {
      type: 'input',
      name: 'teamName',
      message: 'Team Name:',
    },
    {
      type: 'input',
      name: 'logo',
      message: 'logo file name:',
    },
    {
      type: 'list',
      name: 'type',
      message: "Quel type d'utilisateur:",
      choices: [{ name: 'participant', value: 1 }, { name: 'admin', value: 2 }],
    },
  ]);
  console.log(answer);
  const usersRef = db.collection('users');
  const setSf = usersRef.doc(answer.email).set({
    email: answer.email,
    teamName: answer.teamName,
    accountType: answer.type,
    logo: answer.logo,
    uuid: uuidv4(),
  });
}
