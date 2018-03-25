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
  const answer = await inquirer.prompt([
    {
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
      type: 'list',
      name: 'day',
      message: 'Day (YYYY-MM-DD):',
      choices: [
        {
          name: 'none',
          value: '',
        },
        {
          name: '26',
          value: '2018-03-26',
        },
        {
          name: '27',
          value: '2018-03-27',
        },
        {
          name: '28',
          value: '2018-03-28',
        },
        {
          name: '29',
          value: '2018-03-29',
        },
        {
          name: '30',
          value: '2018-03-30',
        },
      ],
    },
    {
      type: 'list',
      name: 'category',
      message: 'Category:',
      choices: [
        {
          name: 'Tourist',
          value: 'Tourist Tour',
        },
        {
          name: 'Olympic park',
          value: 'Olympic park',
        },
        {
          name: 'Bank of England',
          value: 'Bank of England',
        },
        {
          name: 'The City',
          value: 'The City',
        },
        {
          name: 'Spitafields',
          value: 'Spitafields',
        },
        {
          name: 'Family',
          value: 'Family',
        },
      ],
    },
    {
      type: 'list',
      name: 'dayLabel',
      message: "Day label shown (MMMM, dd'th'):",
      choices: [
        {
          name: 'none',
          value: '',
        },
        {
          name: '26',
          value: 'March, 26th',
        },
        {
          name: '27',
          value: 'March, 27th',
        },
        {
          name: '28',
          value: 'March, 28th',
        },
        {
          name: '29',
          value: 'March, 29th',
        },
        {
          name: '30',
          value: 'March, 30th',
        },
      ],
    },
    {
      type: 'list',
      name: 'type',
      message: 'Challenge expected answer ?',
      choices: [
        {
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
        Number(
          answer.allowedAnswer &&
            answer.allowedAnswer.length &&
            answer.allowedAnswer,
        ) || 1,
    })
    .catch(err => console.log(err));
}
