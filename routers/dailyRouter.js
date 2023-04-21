import express from 'express';
import { encrypt, decrypt } from '../utils/security.js';
import { getGameData } from '../utils/levelData.js';
import moment from 'moment';

export const dailyRouter = express.Router();

let leaderboard = [];

let dailyProblem = getGameData();
let currentDate = getCurrentDay();

changeDailyProblem();

dailyRouter.get('/', function (req, res) {
    res.send(encrypt({ data: dailyProblem, date: currentDate, mode: 'DAILY' }));
});

dailyRouter.get('/leaderboard', function (req, res) {
    res.send(encrypt(leaderboard));
});

dailyRouter.post('/leaderboard', function (req, res) {
    const userAndAnswers = decrypt(req.body.payload);
    const answers = userAndAnswers.answers;
    let score = 0;
    for (let i = 0; i < dailyProblem.length; i++) {
        const level = dailyProblem[i];
        const answer = answers[i];
        if (level.solutions[answer]) {
            score += level.solutions[answer];
        }
    }
    leaderboard.push({
        user: userAndAnswers.user,
        score: score
    });
    res.status(200).send();
});

export function getCurrentDay() {
    const date = new Date();
    //Month is indexed from zero...
    return [date.getUTCDate(), date.getUTCMonth() + 1, date.getUTCFullYear()];
}

function updateValues() {
    dailyProblem = getGameData();
    currentDate = getCurrentDay();
    leaderboard = [];
}

function changeDailyProblem() {
    const now = moment.utc();
    const eod = moment.utc().add(1, 'days').startOf('day');
    const diff = eod.diff(now);

    setTimeout(() => {
        updateValues();
        changeDailyProblem();
    }, diff);
}
