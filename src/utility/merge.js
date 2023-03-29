import { readFile, writeFileSync, readFileSync } from 'fs'
import * as CSV from 'csv-string'

//Words from that game I stole
const gameWordsArray = readFileSync('./enable1-172k.txt', 'utf-8').split('\n')

//Top 1/3 million most frequent words
const data = readFileSync('./frequency_list.csv', 'utf-8')
const arr = CSV.parse(data.toString())
const json = {}

arr.forEach((wordFreq) => {
    json[wordFreq[0]] = wordFreq[1]
})

const mergeJson = {}

const dictJson = {}

console.log('Words in my dictionary: ' + gameWordsArray.length)
gameWordsArray.forEach((word) => {
    if (json[word]) {
        mergeJson[word] = json[word]

        const length = word.length
        if (dictJson[length]) {
            dictJson[length] = [...dictJson[length], word.toUpperCase()]
        } else {
            dictJson[length] = [word.toUpperCase()]
        }
    } else {
        //console.log(word)
    }
})

writeFileSync(
    'valid-word-dict.json',
    JSON.stringify(dictJson, null, 2),
    'utf-8'
)

console.log(
    'Words in my dictionary that are in the 1/3 million frequent word set: ' +
        Object.keys(mergeJson).length
)
console.log(
    'Words in my dictionary that dont appear: ' +
        (gameWordsArray.length - Object.keys(mergeJson).length)
)

Object.entries(dictJson).forEach((entry) => {
    const [key, value] = entry
    console.log(key, value.length)
})
