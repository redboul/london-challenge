const admin = require('firebase-admin');
const inquirer = require('inquirer');
const serviceAccount = require('../.private/london-challenge.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://london-challenge.firebaseio.com',
});

var db = admin.firestore();

console.log('Script to add or update a London challenge');
saveOrUpdateChallenge();

async function saveOrUpdateChallenge() {
  const answer = await inquirer.prompt([{
      type: 'input',
      name: 'identifier',
      message: 'Identifiant:',
    },
    {
      type: 'input',
      name: 'label',
      message: 'Label:',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description:',
    },
    {
      type: 'input',
      name: 'image',
      message: 'Image name:',
    },
    {
      type: 'input',
      name: 'day',
      message: 'Day (YYYY-MM-DD):',
    },
    {
      type: 'input',
      name: 'category',
      message: 'Category:',
    },
    {
      type: 'input',
      name: 'dayLabel',
      message: 'Day label shown (MMMM, dd\'th\'):',
    },
    {
      type: 'list',
      name: 'type',
      message: 'Challenge expected answer ?',
      choices: [{
          name: 'text',
          value: 1,
        },
        {
          name: 'image',
          value: 2,
        },
        {
          name: 'media',
          value: 3,
        },
      ],
    },
    {
      type: 'input',
      name: 'allowedAnswer',
      message: 'How many answers allowed ?',
    },
  ]);
  console.log(answer);
  const usersRef = db.collection('challenges');
  const setSf = usersRef
    .doc(answer.identifier)
    .set({
      identifier: answer.identifier,
      label: answer.label,
      description: answer.description,
      day: answer.day,
      dayLabel: answer.dayLabel,
      type: answer.type,
      image: answer.image,
      category: answer.category,
      maxAnswers:
        (answer.allowedAnswer &&
          answer.allowedAnswer.length &&
          answer.allowedAnswer) ||
        1,
    })
    .catch(err => console.log(err));
}
