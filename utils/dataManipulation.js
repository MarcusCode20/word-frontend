import { readFileSync } from 'fs';
import * as CSV from 'csv-string';

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
 * @returns the most frequent 1/3 millions words (not necessarily a real word)
 * Format, [["the", 1000], ["name", 135], ...]
 */
export function getMostFrequentWords() {
    const frequencyData = readFileSync('public/frequency_list.csv', 'utf-8');
    return CSV.parse(frequencyData.toString());
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
        jsonBanned[word] = 1;
    });

    const arrayFrequent = getMostFrequentWords();
    const jsonFrequent = {};

    //Format is now: {"the": 1000, "name": 135}
    arrayFrequent.forEach((wordAndFreq) => {
        jsonFrequent[wordAndFreq[0]] = wordAndFreq[1];
    });

    const jsonValid = {};
    const arrayAll = getAllWords();

    arrayAll.forEach((word) => {
        if (!jsonBanned[word] && jsonFrequent[word] && 4 <= word.length && word.length <= 8) {
            jsonValid[word] = jsonFrequent[word];
        }
    });

    //Format is now: {"there": 100, "name": 135}
    return jsonValid;
}

//Sorts and groups them by length of the word as well
//Format is now: {4: [{word: "name", freq: 135}, {word: "blue", freq: 99}], 5: [{word: "there", freq: 200}, ...], ...}
export function getValidWordsAndFrequencyByLength() {
    const jsonUnsorted = getValidWordsAndFrequency();
    const jsonSorted = {};

    Object.entries(jsonUnsorted).forEach((wordAndFreq) => {
        const [word, freq] = wordAndFreq;

        if (jsonSorted[word.length]) {
            jsonSorted[word.length].push({ word: word.toUpperCase(), freq: freq });
        } else {
            jsonSorted[word.length] = [{ word: word.toUpperCase(), freq: freq }];
        }
    });

    return jsonSorted;
}

//For each grouping of word length, sort those by score based off inverse frequency:
//So: {4: [{word: "name", freq: 135}, {word: "blue", freq: 99}], 5: [{word: "there", freq: 200}, ...], ...}
//Becomes: {4: [{word: "name", score: 1}, {word: "blue", score: 2}], 5: [{word: "there", score: 4}, ...], ...}
export function getValidsAndScoreByLength() {
    const jsonByLength = getValidWordsAndFrequencyByLength();
    const jsonByScore = {};

    Object.entries(jsonByLength).forEach((lengthAndWords) => {
        const [length, words] = lengthAndWords;

        //First sort the array in descending order of frequency
        //So the first word will be the most frequent
        const arrayByFreq = words.slice().sort((a, b) => b.freq - a.freq);
        const arrayByScore = [];

        //Now iterating from the first word, assign the index number as it's score
        //So the most common word will have a score of 1 and the least common a score of arrayByScore.length
        for (let i = 0; i < arrayByFreq.length; i++) {
            arrayByScore.push({ word: arrayByFreq[i].word, score: i + 1 });
        }

        jsonByScore[length] = arrayByScore;
    });

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

    return jsonSplit;
}

// writeFileSync('public/valid_words.json', JSON.stringify(finalSortedDictionary, null, 2), 'utf-8');
