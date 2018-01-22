const admin = require('firebase-admin');
const inquirer = require('inquirer');
const serviceAccount = require("../.private/london-challenge.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://london-challenge.firebaseio.com"
});

var db = admin.firestore();

//const usersRef = db.collection('users');
console.log('Script to add or update a new London challenge user');
saveOrUpdateUser();

/*const setSf = citiesRef.doc('').set({
    name: 'San Francisco', state: 'CA', country: 'USA',
    capital: false, population: 860000 });*/


async function saveOrUpdateUser() {
  const answer = await inquirer.prompt([{
    type: 'input',
    name: 'email',
    message: 'User email:'},
    {
      type: 'password',
      name: 'password',
      message: 'password:'},
    {
      type: 'password',
      name: 'passwordConfirmation',
      message: 're-renter password:'},
    {
      type: 'list',
      name: 'type',
      message: 'Quel type d\'utilisateur:',
    choices: [ {name: 'participant', value: 2}, { name: 'admin', value: 1 }]}]);
  console.log(answer);
}
