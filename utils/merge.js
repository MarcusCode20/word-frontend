import { readFile, writeFileSync, readFileSync } from 'fs';
import * as CSV from 'csv-string';

//Words from that game I stole
const gameWordsArray = readFileSync('public/all_words.txt', 'utf-8').split('\n');
console.log('Words in my dictionary: ' + gameWordsArray.length);

//Banned words
const bannedWordsArray = readFileSync('public/banned_words.txt', 'utf-8').split('\r\n');
const bannedJson = {};
bannedWordsArray.forEach((word) => {
    bannedJson[word] = 1;
});
const validWordArray = [];
gameWordsArray.forEach((word) => {
    //'constructor' as a key will return a function
    if (!bannedJson[word] || word == 'constructor') {
        validWordArray.push(word);
    }
});
console.log('Words in my dictionary after banned words: ' + validWordArray.length);

//Top 1/3 million most frequent words
const frequencyData = readFileSync('public/frequency_list.csv', 'utf-8');
const frequencyArray = CSV.parse(frequencyData.toString());
const frequencyJson = {};

frequencyArray.forEach((wordFreq) => {
    frequencyJson[wordFreq[0]] = wordFreq[1];
});

const mergeJson = {};

const finalSortedDictionary = {};

validWordArray.forEach((word) => {
    if (frequencyJson[word]) {
        mergeJson[word] = frequencyJson[word];

        const length = word.length;
        if (finalSortedDictionary[length]) {
            finalSortedDictionary[length] = [...finalSortedDictionary[length], word.toUpperCase()];
        } else {
            finalSortedDictionary[length] = [word.toUpperCase()];
        }
    } else {
        //console.log(word)
    }
});

writeFileSync('valid-word-dict.json', JSON.stringify(finalSortedDictionary, null, 2), 'utf-8');
