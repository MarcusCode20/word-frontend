import express from 'express';
import { encrypt, decrypt } from '../utils/security.js';
import { getGameData } from '../utils/levelData.js';
import moment from 'moment';
import { sortedInsert } from '../utils/dataManipulation.js';
import { fakeUserScores } from '../utils/mockData.js';

export const dailyRouter = express.Router();

//The order of this matters
//Must intialize the game before creating the answer store.
let dailyProblem = getGameData();
let currentDate = getCurrentDay();
let leaderboard = {
    TODAY: fakeUserScores(20),
    YESTERDAY: fakeUserScores(30)
};
let allUserAnswers = createAnswerStore();

changeDailyProblem();

dailyRouter.get('/', function (req, res) {
    res.send(encrypt({ data: dailyProblem, date: currentDate, mode: 'DAILY' }));
});

dailyRouter.get('/count', function (req, res) {
    res.send(encrypt(allUserAnswers));
});

dailyRouter.get('/leaderboard', function (req, res) {
    res.send(encrypt(leaderboard));
});

dailyRouter.post('/leaderboard', function (req, res) {
    const userAndAnswers = decrypt(req.body.payload);
    const answers = userAndAnswers.answers;
    let score = 0;
    //Recalculate the score to prevent anyone cheating...
    for (let i = 0; i < dailyProblem.length; i++) {
        const level = dailyProblem[i];
        const answer = answers[i];
        if (level.solutions[answer]) {
            score += level.solutions[answer];
            allUserAnswers[i][answer].count++;
        }
    }
    leaderboard.TODAY = sortedInsert(
        leaderboard.TODAY,
        {
            user: userAndAnswers.user,
            score: score
        },
        //For the first element to be the highest (Descending)
        (a, b) => b.score - a.score
    );
    res.status(200).send();
});

function getCurrentDay() {
    const date = new Date();
    //Month is indexed from zero...
    return [date.getUTCDate(), date.getUTCMonth() + 1, date.getUTCFullYear()];
}

function createAnswerStore() {
    const totalCount = [];
    for (let i = 0; i < dailyProblem.length; i++) {
        const level = dailyProblem[i];
        const solutions = level.solutions;
        const data = {};
        Object.keys(solutions).forEach((word) => {
            const score = solutions[word];
            data[word] = {
                score: score,
                count: 0
            };
        });
        totalCount.push(data);
    }

    return totalCount;
}

function updateValues() {
    dailyProblem = getGameData();
    currentDate = getCurrentDay();
    allUserAnswers = createAnswerStore();
    leaderboard.YESTERDAY = leaderboard.TODAY;
    leaderboard.TODAY = [];
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
