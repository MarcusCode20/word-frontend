import axios from 'axios';
import { Mode } from './gameSlice';
import { decrypt, encrypt } from './Security';

const prefix = 'http://localhost:8080/'; //http://localhost:8080/

export const getGameDataRequest = (mode: Mode) =>
    new Promise((resolve) => {
        const request = mode == Mode.DAILY ? 'api/words/daily' : 'api/words/practice';
        axios
            .get(prefix + request)
            .then((response) => {
                resolve(decrypt(response.data));
            })
            .catch((error) => console.log(error))
            .finally(() => ({}));
    });

export const postDailyScoreRequest = (user: string, answers: string[]) =>
    new Promise((resolve) => {
        axios
            .post(prefix + 'api/words/daily/leaderboard', {
                payload: encrypt({ user: user, answers: answers })
            })
            .then((response) => resolve(response.status));
    });

export const getLeaderboardRequest = () =>
    new Promise((resolve) => {
        axios
            .get(prefix + 'api/words/daily/leaderboard')
            .then((response) => {
                resolve(decrypt(response.data));
            })
            .catch((error) => console.log(error))
            .finally(() => ({}));
    });
