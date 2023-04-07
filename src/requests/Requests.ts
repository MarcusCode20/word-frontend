import axios from 'axios';
import { Mode } from '../features/gameSlice';
import CryptoJS from 'crypto-js';

const key = 'super secure secret key';

const prefix = ''; //http://localhost:3000/

function encrypt(data: any) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
}

function decrypt(data: any) {
    const decrypt = CryptoJS.AES.decrypt(data, key);
    return JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));
}

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

export const postDailyScoreRequest = (user: string, score: number) =>
    new Promise((resolve) => {
        axios
            .post(prefix + 'api/words/daily/leaderboard', {
                payload: encrypt({ user: user, score: score })
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
