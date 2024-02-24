import { Box } from '@mui/material';
import GameScreen from './components/game/game-screen';
import InformationBar from './components/game/information-bar';
import Keyboard from './components/keyboard/keyboard';
import TitleBar from './components/title-bar';
import './styles/app.css';
import { setGameData, Mode, startGame, getDailyGame, loadCachedDaily } from './app/game-slice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Zoom } from 'react-toastify';
import './styles/toast.css';
import { getGameDataRequest, postDailyScoreRequest } from './app/requests';
import NameScreen from './components/name-screen';
import { StorageKey, StorageWrapper } from './app/storage-wrapper';
import { DailyStatsData, Stat, initialStatsData } from './components/statistics/daily/daily-stats-info';
import moment from 'moment';

function getCurrentDay() {
    return dateToArrayString(new Date());
}

function dateToArrayString(date: Date) {
    //Month is indexed from zero...
    return [date.getUTCDate(), date.getUTCMonth() + 1, date.getUTCFullYear()].toString();
}

const App = () => {
    const dailyGame = useAppSelector(getDailyGame);
    const lastUpdated = dailyGame.date;
    const dispatch = useAppDispatch();

    const resetDailyData = () => {
        const currentDay = getCurrentDay();
        const lastSavedDay = StorageWrapper.getItem(StorageKey.DATE_SAVED);
        if (lastSavedDay != currentDay) {
            StorageWrapper.clear();
        }
    };

    const intialGameLoad = () => {
        getGameDataRequest(Mode.PRACTICE).then((data: any) => {
            dispatch(setGameData([data, Mode.PRACTICE]));
            dispatch(startGame(Mode.PRACTICE));
        });
        const cachedDaily = StorageWrapper.getItem(StorageKey.GAME_SAVED);
        if (cachedDaily) {
            dispatch(loadCachedDaily(cachedDaily));
        } else {
            getGameDataRequest(Mode.DAILY).then((data: any) => {
                dispatch(setGameData([data, Mode.DAILY]));
                dispatch(startGame(Mode.DAILY));
            });
        }
    };

    const saveDailyGame = () => {
        const currentDay = getCurrentDay();
        if (dailyGame.loaded && lastUpdated == currentDay) {
            StorageWrapper.setItem(StorageKey.GAME_SAVED, dailyGame);
            StorageWrapper.setItem(StorageKey.DATE_SAVED, currentDay);
        }
    };

    const sendDailyScore = () => {
        const alreadySent = StorageWrapper.getItem(StorageKey.SCORE_SAVED);
        const username = StorageWrapper.getItem(StorageKey.USERNAME);
        if (dailyGame.ended && !alreadySent && lastUpdated == getCurrentDay() && username) {
            const usersAnswers = dailyGame.levels.map((level) => level.usersWord);
            postDailyScoreRequest(username, usersAnswers).then((status: any) => {
                //Status of 200 is successful.
                if (status == 200) {
                    StorageWrapper.setItem(StorageKey.SCORE_SAVED, 'true');
                }
            });
        }
    };
    const saveDailyStats = () => {
        const statsData = StorageWrapper.getItem(StorageKey.DAILY_STATS) as DailyStatsData;
        const hasSavedStats = StorageWrapper.getItem(StorageKey.DAILY_STATS_SAVED);
        if (!statsData) {
            //Should only execute when a user first ever plays
            StorageWrapper.setItem(StorageKey.DAILY_STATS, initialStatsData);
        } else if (dailyGame.ended && !hasSavedStats) {
            statsData[Stat.PLAYED]++;
            if (dailyGame.completed) {
                statsData[Stat.COMPLETED]++;
                const currentStreak = statsData[Stat.CURRENT_STREAK];
                const yesterday = dateToArrayString(moment.utc().subtract(1, 'day').toDate());
                //If there is a valid current streak
                if (currentStreak.lastDate == yesterday) {
                    statsData[Stat.CURRENT_STREAK].streak++;
                } else {
                    statsData[Stat.CURRENT_STREAK].streak = 1;
                }
            } else {
                statsData[Stat.CURRENT_STREAK].streak = 0;
            }
            statsData[Stat.CURRENT_STREAK].lastDate = getCurrentDay();
            statsData[Stat.BEST_STREAK] = Math.max(statsData[Stat.BEST_STREAK], statsData[Stat.CURRENT_STREAK].streak);
            const score = dailyGame.levels.reduce((partialSum, level) => partialSum + level.score, 0);
            const maxScore = dailyGame.levels.reduce(
                (partialSum, level) => partialSum + Math.max(...Object.values(level.solutions)),
                0
            );
            const percentage = Math.floor((score * 100) / maxScore);
            statsData[Stat.AVG_OF_MAX].push(percentage);
            StorageWrapper.setItem(StorageKey.DAILY_STATS, statsData);
            StorageWrapper.setItem(StorageKey.DAILY_STATS_SAVED, 'true');
        }
    };
    //In React StrictMode useEffect is run twice as screen is rendered twice to spot bugs
    //Reset cached daily data first if needs the data is old.
    useEffect(resetDailyData, []);
    //Now request new data for both daily and practice.
    useEffect(intialGameLoad, []);
    useEffect(saveDailyGame, [dailyGame]);
    useEffect(saveDailyStats, [dailyGame.ended]);
    useEffect(sendDailyScore, [dailyGame.ended]);

    return (
        <Box className="app-container">
            <NameScreen />
            <TitleBar />
            <InformationBar />
            <GameScreen />
            <Keyboard />
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={true}
                newestOnTop={false}
                closeButton={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                transition={Zoom}
                className="toast-container"
                toastClassName="toast-toast"
            />
        </Box>
    );
};

export default App;
