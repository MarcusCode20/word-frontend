import express from 'express';
import cors from 'cors';
import { dailyRouter } from './routers/dailyRouter.js';
import { practiceRouter } from './routers/practiceRouter.js';

const app = express();

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());

app.use('/api/words/practice', practiceRouter);
app.use('/api/words/daily', dailyRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
