import express from 'express';
import { encrypt } from '../utils/security.js';

export const tokenRouter = express.Router();

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//Use to know if the server has restarted or a new version has been pushed out.
//Need to inform the client to delete it's cache.
const token = getRandomInt(10000000000);

tokenRouter.get('/', function (req, res) {
    res.send(encrypt({ token: token }));
});
