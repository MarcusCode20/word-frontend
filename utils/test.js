import { getValidsAndScoreByLength, splitOut } from './dataManipulation.js';
import { writeFileSync } from 'fs';
import { getGameData } from './levelData.js';
import moment from 'moment';
moment().format();

import CryptoJS from 'crypto-js';

//console.log(splitOut(500));
//writeFileSync('public/game_words.json', JSON.stringify(splitOut(1000), null, 2), 'utf-8');
//console.log(getGameData());

// const data = getGameData();
// const encrypt = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123').toString();
// console.log(encrypt);
// const decrypt = CryptoJS.AES.decrypt(encrypt, 'secret key 123');
// const decryptedData = JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));
// console.log(decryptedData);

const now = moment.utc();
const eod = moment.utc().add(1, 'days').startOf('day');

console.log(now);
console.log(eod);
console.log(eod.diff(now));
console.log(now.toArray().slice(0, 3));
console.log(undefined != 'hello');

// setInterval(() => {
//     now = 'hello';
//     console.log(now);
// }, 1000);

let value = 0;

function updateValue() {
    console.log(value++);
}

function changeDailyProblem() {
    setTimeout(() => {
        console.log(value++);
        changeDailyProblem();
    }, 1000);
}

changeDailyProblem();
