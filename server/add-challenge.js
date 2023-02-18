#!/usr/bin/env node

import admin from 'firebase-admin';
import inquirer from 'inquirer';
import serviceAccount from '../.private/dublin-challenge.mjs';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://dublin-challenge.firebaseio.com',
});

var db = admin.firestore();

console.log('Script to add or update a London challenge');
await saveOrUpdateChallenge();

process.exit();

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
          name: 'Dublin',
          value: 'Dublin',
        },
        {
          name: 'Dubliners',
          value: 'Dubliners',
        },
        {
          name: 'Epic Museum',
          value: 'Epic Museum',
        },
        {
          name: 'Journey',
          value: 'Journey',
        },
        {
          name: 'Sport',
          value: 'Sport',
        },
      ],
    },
    {
      type: 'input',
      name: 'category',
      message: 'Category:',
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
  await usersRef
    .doc(answer.identifier)
    .set({
      identifier: answer.identifier,
      label: answer.label,
      description: answer.description,
      day: answer.day,
      dayLabel: answer.day,
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
