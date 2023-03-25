import express from 'express'
import getWords from './utility/chooseWords.js'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.static('dist'))

app.get('/api/words', function (req, res) {
    const words = getWords()

    console.log(words)

    res.send(words)
})

app.listen(3000)
