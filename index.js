import express from 'express';
import getGameData from './utils/createLevelData.js';
import cors from 'cors';
import CryptoJS from 'crypto-js';

const app = express();

app.use(cors());

app.use(express.static('dist'));

app.use(express.json());

const key = 'super secure secret key';

const leaderboard = [];

const dailyProblem = getGameData();

function encrypt(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
}

function decrypt(data) {
    const decrypt = CryptoJS.AES.decrypt(data, key);
    return JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));
}

app.get('/api/words/daily', function (req, res) {
    res.send(encrypt(dailyProblem));
});

app.get('/api/words/practice', function (req, res) {
    res.send(encrypt(getGameData()));
});

app.get('/api/words/daily/leaderboard', function (req, res) {
    res.send(encrypt(leaderboard));
});

app.post('/api/words/daily/leaderboard', function (req, res) {
    const score = decrypt(req.body.payload);
    leaderboard.push(score);
    res.status(200).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
