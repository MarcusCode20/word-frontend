import express from 'express';
import getGameData from './utils/createLevelData.js';
import cors from 'cors';
import CryptoJS from 'crypto-js';

const app = express();

const key = 'super secure secret key';

app.use(cors());

app.use(express.static('dist'));

const dailyProblem = getGameData();

app.get('/api/words/daily', function (req, res) {
    const encrypt = CryptoJS.AES.encrypt(JSON.stringify(dailyProblem), key).toString();
    res.send(encrypt);
});

app.get('/api/words/practice', function (req, res) {
    const data = getGameData();
    const encrypt = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
    res.send(encrypt);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
