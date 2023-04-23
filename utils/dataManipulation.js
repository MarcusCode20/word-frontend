import { readFileSync, writeFileSync, createReadStream } from 'fs';
import * as CSV from 'csv-string';
import lineByLine from 'n-readlines';

/**
 * @returns A list of all the words, around 170k.
 */
export function getAllWords() {
    return readFileSync('public/all_words.txt', 'utf-8').split('\n');
}

/**
 * @returns A list of all the banned words.
 */
export function getBannedWords() {
    return readFileSync('public/banned_words.txt', 'utf-8').split('\r\n');
}

/**
 * @returns the most frequent words (merge between two data sets)
 * //Format: {"there": 100, "name": 135}
 */
export function getAllFrequencyWords() {
    const frequencyData = readFileSync('public/freq_complete_rank.json', 'utf-8');
    return JSON.parse(frequencyData.toString());
}

/**
 * @returns a JSON of all the valid words where it is the intersection of:
 * - not in banned words
 * - in frequent words
 * - in real all words
 * - between the length of 4 and 8
 * the key is the word and the value is the frequency
 */
export function getValidWordsAndFrequency() {
    const arrayBanned = getBannedWords();
    const jsonBanned = {};

    //Just convert to an onbject for quick key lookup
    arrayBanned.forEach((word) => {
        jsonBanned[word.toLowerCase()] = 1;
    });

    const jsonFrequent = getAllFrequencyWords();

    const jsonValid = {};
    const arrayAll = getAllWords();

    arrayAll.forEach((word_upper) => {
        const word = word_upper.toLowerCase();
        if (!jsonBanned[word] && jsonFrequent[word] && 4 <= word.length && word.length <= 8) {
            jsonValid[word] = jsonFrequent[word];
        }
    });

    //Format is now: {"there": 100, "name": 135}
    return jsonValid;
}

//Sorts and groups them by length of the word as well
//Format is now: {4: [{word: "name", rank: 135}, {word: "blue", rank: 99}], 5: [{word: "there", rank: 200}, ...], ...}
export function getValidWordsAndRankByLength() {
    const jsonUnsorted = getValidWordsAndFrequency();
    const jsonSorted = {};

    Object.entries(jsonUnsorted).forEach((wordAndFreq) => {
        const [word, rank] = wordAndFreq;

        if (jsonSorted[word.length]) {
            jsonSorted[word.length].push({ word: word.toUpperCase(), rank: rank });
        } else {
            jsonSorted[word.length] = [{ word: word.toUpperCase(), rank: rank }];
        }
    });

    return jsonSorted;
}

//For each grouping of word length, sort those by score based off their rank:
//So: {4: [{word: "name", rank: 5}, {word: "blue", rank: 99}], 5: [{word: "there", rank: 200}, ...], ...}
//Becomes: {4: [{word: "name", score: 1}, {word: "blue", score: 2}], 5: [{word: "there", score: 4}, ...], ...}
export function getValidsAndScoreByLength() {
    const jsonByLength = getValidWordsAndRankByLength();
    const jsonByScore = {};

    Object.entries(jsonByLength).forEach((lengthAndWords) => {
        const [length, words] = lengthAndWords;

        //First sort the array in ascending order of rank
        //So the first word will be the most frequent
        const arrayByFreq = words.slice().sort((a, b) => a.rank - b.rank);
        const arrayByScore = [];

        //Now iterating from the first word, assign the index number as it's score
        //So the most common word will have a score of 1 and the least common a score of arrayByScore.length
        for (let i = 0; i < arrayByFreq.length; i++) {
            arrayByScore.push({ word: arrayByFreq[i].word, score: i + 1 });
        }

        jsonByScore[length] = arrayByScore;
    });

    //writeFileSync('public/valid_words.json', JSON.stringify(jsonByScore, null, 2), 'utf-8');

    return jsonByScore;
}

export function splitOut(size) {
    const jsonByScore = getValidsAndScoreByLength();
    const jsonSplit = {};
    const firstHalf = {};
    const secondHalf = {};

    Object.entries(jsonByScore).forEach((lengthAndWords) => {
        const [length, words] = lengthAndWords;

        //Will break if size is greater than words.length
        const firstHalfWords = words.slice(0, size);
        const secondHalfWords = words.slice(size);

        firstHalf[length] = firstHalfWords;
        secondHalf[length] = secondHalfWords;
    });

    jsonSplit.first = firstHalf;
    jsonSplit.second = secondHalf;

    writeFileSync('public/game_words.json', JSON.stringify(jsonSplit, null, 2), 'utf-8');

    return jsonSplit;
}
