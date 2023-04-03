import { readFileSync } from 'fs';

export default function getGameData() {
    const data = readFileSync('public/game_words.json');

    const levelMetaData = [];
    levelMetaData.push(createLevelMetaData(4, 3));
    levelMetaData.push(createLevelMetaData(5, 3));
    levelMetaData.push(createLevelMetaData(6, 3));
    levelMetaData.push(createLevelMetaData(7, 4));
    levelMetaData.push(createLevelMetaData(8, 5));

    const wordsAndScoresSplit = JSON.parse(data.toString());

    const easyWordsAndScore = wordsAndScoresSplit.first;
    const hardWordsAndScore = wordsAndScoresSplit.second;

    const levels = [];

    levelMetaData.forEach((levelMetaData) => {
        const wordLength = levelMetaData.wordLength;
        const inputLength = levelMetaData.inputLength;
        const indexesToRemove = shuffleArray([...Array(wordLength).keys()]).slice(0, inputLength);
        const easyHalf = getLevelData(indexesToRemove, easyWordsAndScore[wordLength]);
        const hardHalf = getLevelData(indexesToRemove, hardWordsAndScore[wordLength]);

        const easyHiddenWords = Object.keys(easyHalf);
        const startingHiddenWord = easyHiddenWords[getRandomInt(0, easyHiddenWords.length)];

        let solutions = easyHalf[startingHiddenWord];
        if (hardHalf[startingHiddenWord]) {
            solutions = { ...solutions, ...hardHalf[startingHiddenWord] };
        }

        levels.push({
            hiddenWord: startingHiddenWord,
            solutions: solutions,
            inputLength: inputLength
        });
    });
    return levels;
}

function getLevelData(indexes, wordsAndScores) {
    const wordsWithLettersRemoved = {};

    for (const wordAndScore of wordsAndScores) {
        const word = wordAndScore.word;
        const score = wordAndScore.score;
        //Take a copy of the word in an array format
        const hiddenWordArray = [...word];
        //Remove the required letters
        indexes.forEach((index) => (hiddenWordArray[index] = '_'));
        //Transform the word back to a string
        const hiddenWord = hiddenWordArray.join('');

        /*
        Now create a object where the key is the word with the letters removed
        and the value is a list of the original word e.g.
            {
                w_ord:  {"word": 100, "ward": 1000},
                b__n:   {"bean": 72, "been": 324}
            }
        */
        if (wordsWithLettersRemoved[hiddenWord]) {
            wordsWithLettersRemoved[hiddenWord][word] = score;
        } else {
            wordsWithLettersRemoved[hiddenWord] = { [word]: score };
        }
    }

    return wordsWithLettersRemoved;
}

/**
 * @param {number} min - the minimum number that can be chosen (inclusive)
 * @param {number} max - the maximum number (exclusive)
 * @returns a random number between an interval
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * @param {any} array - the array to shuffle
 * @returns the array where to contents are randomly shuffled
 */
function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

function createLevelMetaData(wordLength, inputLength) {
    return {
        wordLength: wordLength,
        inputLength: inputLength
    };
}
