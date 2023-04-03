import { getValidsAndScoreByLength, splitOut } from './WordManipulationFunctions.js';
import { writeFileSync } from 'fs';
import getGameData from './createLevelData.js';

//console.log(splitOut(500));
//writeFileSync('public/game_words.json', JSON.stringify(splitOut(1000), null, 2), 'utf-8');
console.log(getGameData());
