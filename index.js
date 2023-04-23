import express from 'express';
import cors from 'cors';
import { dailyRouter } from './routers/dailyRouter.js';
import { practiceRouter } from './routers/practiceRouter.js';
import { tokenRouter } from './routers/tokenRouter.js';

const app = express();

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());

app.use('/api/token', tokenRouter);
app.use('/api/words/practice', practiceRouter);
app.use('/api/words/daily', dailyRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('App is listening on port', port);
});
