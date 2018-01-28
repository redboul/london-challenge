const admin = require('firebase-admin');
const inquirer = require('inquirer');
const serviceAccount = require("../.private/london-challenge.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://london-challenge.firebaseio.com"
});

var db = admin.firestore();

console.log('Script to add or update a new London challenge user');
saveOrUpdateUser();

async function saveOrUpdateUser() {
  const answer = await inquirer.prompt([{
    type: 'input',
    name: 'email',
    message: 'User email:'},
    {
      type: 'input',
      name: 'teamName',
      message: 'Team Name:'},
    {
      type: 'list',
      name: 'type',
      message: 'Quel type d\'utilisateur:',
    choices: [ {name: 'participant', value: 2}, { name: 'admin', value: 1 }]}]);
  console.log(answer);
  const usersRef = db.collection('users');
  const setSf = usersRef.doc(answer.email).set({
    email: answer.email, teamName: answer.teamName, accountType: answer.type });
}
