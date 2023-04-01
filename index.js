import express from 'express';
import getDataForLevels from './utils/createLevelData.js';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.static('dist'));

const words = getDataForLevels();

app.get('/api/words', function (req, res) {
    const words = getDataForLevels();

    console.log(words);

    res.send(words);
});

app.listen(3000);
