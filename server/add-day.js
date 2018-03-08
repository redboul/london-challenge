const admin = require('firebase-admin');
const inquirer = require('inquirer');
const serviceAccount = require("../.private/london-challenge.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://london-challenge.firebaseio.com"
});

var db = admin.firestore();

console.log('Script to add or update a new London challenge Day');
saveOrUpdateDay();

async function saveOrUpdateDay() {
  const answer = await inquirer.prompt([{
      type: 'input',
      name: 'date',
      message: 'Date (YYYY-MM-DD):'
    },
    {
      type: 'input',
      name: 'labelShort',
      message: 'Label short:'
    },
    {
      type: 'input',
      name: 'labelLong',
      message: 'Label long:'
    },
    {
      type: 'input',
      name: 'dayName',
      message: 'day name (monday, tuesday,...):'
    },
  ]);
  console.log(answer);
  const usersRef = db.collection('days');
  const setSf = usersRef.doc(answer.date).set({
    dayName: answer.dayName,
    labelShort: answer.labelShort,
    labelLong: answer.labelLong,
  });
}
