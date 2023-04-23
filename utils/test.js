import { getAllWords, getValidWordsAndFrequency, getValidsAndScoreByLength, splitOut } from './dataManipulation.js';
import { writeFileSync, readFileSync } from 'fs';
import { getGameData } from './levelData.js';
import { getDifference, mergeFreq, testSample } from './newData.js';
import moment from 'moment';

import lineByLine from 'n-readlines';
const liner = new lineByLine('public/sample.txt');

let line;
let lineNumber = 0;

while ((line = liner.next())) {
    console.log('Line ' + lineNumber + ': ' + line.toString('utf8'));
    lineNumber++;
}

console.log('end of line reached');

const data = splitOut(500);
