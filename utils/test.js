import { getValidsAndScoreByLength, splitOut } from './WordManipulationFunctions.js';
import { writeFileSync } from 'fs';
import getGameData from './createLevelData.js';

import CryptoJS from 'crypto-js';

//console.log(splitOut(500));
//writeFileSync('public/game_words.json', JSON.stringify(splitOut(1000), null, 2), 'utf-8');
//console.log(getGameData());

const data = getGameData();
const encrypt = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123').toString();
console.log(encrypt);
const decrypt = CryptoJS.AES.decrypt(encrypt, 'secret key 123');
const decryptedData = JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));
console.log(decryptedData);
