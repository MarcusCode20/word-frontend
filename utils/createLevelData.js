import { readFileSync } from 'fs';

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

function createLevel(indexes, words) {
    const wordsWithLettersRemoved = {};

    for (let word of words) {
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
                w_ord:  ["word", "ward"],
                b__n:   ["bean", "been"]
            }
        */
        if (wordsWithLettersRemoved[hiddenWord]) {
            wordsWithLettersRemoved[hiddenWord] = [...wordsWithLettersRemoved[hiddenWord], word];
        } else {
            wordsWithLettersRemoved[hiddenWord] = [word];
        }
    }

    /*
    An array of where each element is of the form:
        {
            hiddenWord: "w_rd",
            solutions: ["word", "ward"],
            inputLength: 1
        }
    */
    const possibilties = Object.keys(wordsWithLettersRemoved).map((hiddenWord) => {
        return {
            hiddenWord: hiddenWord,
            solutions: wordsWithLettersRemoved[hiddenWord],
            inputLength: indexes.length
        };
    });

    //Choose a random one
    return possibilties[getRandomInt(0, possibilties.length)];
}

export default function getDataForLevels() {
    const data = readFileSync('public/valid_words.json');

    const dictionary = JSON.parse(data.toString());

    //Five levels with each level incrementing the word length from 4 to 8.
    const lengthOfWordInLevel = [4, 5, 6, 7, 8];

    /*
    An array where each element holds all the data for a level.
    The element is an object:
        {
            hiddenWord: "w_rd",
            solutions: ["word", "ward"],
            inputLength: 1
        }
    */
    const wordLevelsData = [];

    lengthOfWordInLevel.forEach((levelLength) => {
        const allowedWords = dictionary[levelLength];
        //Takes the numbers of letters in a word e.g. n = 5
        //Creates an array: [0, 1, 2, 3, 4]
        //Randomly shuffle the array: [3, 2, 0, 4, 1]
        //Choose a random between 1 and n - 1, say 3.
        //Now take the first 3 numbers from the array: [3, 2, 0]
        const lettersOfIndexToRemove = shuffleArray([...Array(levelLength).keys()]).slice(
            0,
            getRandomInt(1, levelLength) //Will not include the levelLength (exclusive)
        );
        const levelData = createLevel(lettersOfIndexToRemove, allowedWords);

        wordLevelsData.push(levelData);
    });

    return wordLevelsData;
}
