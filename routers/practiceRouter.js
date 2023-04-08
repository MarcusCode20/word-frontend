import express from 'express';
import { getGameData } from '../utils/levelData.js';
import { encrypt } from '../utils/security.js';

export const practiceRouter = express.Router();

practiceRouter.get('/', function (req, res) {
    res.send(encrypt({ data: getGameData(), mode: 'PRACTICE' }));
});
