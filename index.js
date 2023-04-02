import express from 'express';
import getDataForLevels from './utils/createLevelData.js';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.static('dist'));

app.get('/api/words', function (req, res) {
    const words = getDataForLevels();

    res.send(words);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
