#!/usr/bin/env node

import admin from 'firebase-admin';
import inquirer from 'inquirer';
import serviceAccount from '../.private/dublin-challenge.mjs';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dublin-challenge.firebaseio.com"
});

var db = admin.firestore();

console.log('Script to add or update a new London challenge Day');
await saveOrUpdateDay();
process.exit();
async function saveOrUpdateDay() {
  const answer = await inquirer.prompt([{
      type: 'input',
      name: 'date',
      message: 'Date (YYYY-MM-DD):'
    }
  ]);
  console.log(answer);
  const usersRef = db.collection('days');
  await usersRef.doc(answer.date).set({
    dayName: answer.date,
    labelShort: answer.date,
    labelLong: answer.date,
  });
}
