import { readFileSync } from 'fs'

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

function shuffleArray(origArray) {
    const array = [...origArray]
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

function removeLettersFromWords(indexes, words) {
    const wordsWithLettersRemoved = {}

    for (let word of words) {
        const missWordArray = [...word]

        indexes.forEach((index) => (missWordArray[index] = '_'))

        const missingWord = missWordArray.join('')

        if (wordsWithLettersRemoved[missingWord]) {
            wordsWithLettersRemoved[missingWord] = [
                ...wordsWithLettersRemoved[missingWord],
                word,
            ]
        } else {
            wordsWithLettersRemoved[missingWord] = [word]
        }
    }

    return Object.keys(wordsWithLettersRemoved).map((missingWord) => {
        return {
            missingWord: missingWord,
            solutions: wordsWithLettersRemoved[missingWord],
            inputLength: indexes.length,
        }
    })
}

export default function getWords() {
    const data = readFileSync('valid-word-dict.json')

    const dictionary = JSON.parse(data.toString())

    const levels = [
        [4],
        [5],
        [6],
        [7],
        [8],
    ]

    const words = []

    Object.entries(levels).forEach((level) => {
        const [levelNumber, choices] = level
        const chosenLength = choices[getRandomInt(0, choices.length)]
        const validWords = dictionary[chosenLength]
        const lettersOfIndexToRemove = shuffleArray([
            ...Array(chosenLength).keys(),
        ]).slice(0, getRandomInt(1, chosenLength))
        const wordsWithLettersRemoved = removeLettersFromWords(
            lettersOfIndexToRemove,
            validWords
        )

        words.push(
            wordsWithLettersRemoved[
                getRandomInt(0, wordsWithLettersRemoved.length)
            ]
        )
    })

    return words
}
