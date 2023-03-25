//For converting unflitered dictionary to json
import { readFile, writeFileSync } from 'fs'
import * as CSV from 'csv-string'
import axios from 'axios'

axios
    .get(
        'https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json'
    )
    .then(function (response) {
        const json = {}

        Object.keys(response.data).forEach((word) => {
            var length = word.length

            if (isValid(word)) {
                if (json[length]) {
                    json[length].add(word.toUpperCase())
                } else {
                    json[length] = new Set()
                    json[length].add(word.toUpperCase())
                }
            }
        })

        for (const length in json) {
            json[length] = Array.from(json[length])
        }

        writeFileSync(
            './structureDict.json',
            JSON.stringify(json, null, 2),
            'utf-8'
        )

        Object.entries(json).forEach((entry) => {
            const [key, value] = entry
            console.log(key, value.length)
        })
    })

const isValid = (word) => {
    const notValid = [
        ' ',
        '-',
        "'",
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '\\',
    ]

    for (let char of word) {
        const index = notValid.indexOf(char)

        if (index > -1) {
            return false
        }
    }

    return true
}
