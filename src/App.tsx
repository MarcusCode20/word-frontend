import { Box } from '@mui/material';
import GameScreen from './components/GameScreen';
import InformationBar from './components/InformationBar';
import Keyboard from './components/Keyboard';
import TitleBar from './components/TitleBar';
import WelcomeScreen from './components/WelcomeScreen';
import StatScreen from './components/StatScreen';
import {
    setGameData,
    getCurrentGame,
    Mode,
    getCurrentMode,
    startGame,
    getDailyGame,
    loadCachedDaily
} from './features/gameSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Zoom } from 'react-toastify';
import './styles/Toast.css';
import './styles/App.css';
import { getGameDataRequest, postDailyScoreRequest } from './requests/Requests';
import NameScreen from './components/NameScreen';

export enum StorageKey {
    GAME_SAVED = 'game',
    SCORE_SAVED = 'score',
    DATE_SAVED = 'date',
    USERNAME = 'username'
}

function getCurrentDay() {
    const date = new Date();
    //Month is indexed from zero...
    return [date.getUTCDate(), date.getUTCMonth() + 1, date.getUTCFullYear()].toString();
}

const App = () => {
    const game = useAppSelector(getCurrentGame);
    const mode = useAppSelector(getCurrentMode);
    const dailyGame = useAppSelector(getDailyGame);
    const lastUpdated = dailyGame.date;
    const dailyGameEnded = !dailyGame.alive && dailyGame.started && dailyGame.loaded;
    const dispatch = useAppDispatch();

    const resetDailyData = () => {
        const currentDay = getCurrentDay();
        const lastSavedDay = localStorage.getItem(StorageKey.DATE_SAVED);
        if (lastSavedDay != currentDay) {
            localStorage.clear();
        }
    };

    const getGameData = () => {
        if (!game.loaded) {
            const cachedDaily = localStorage.getItem(StorageKey.GAME_SAVED);
            if (cachedDaily && mode == Mode.DAILY) {
                dispatch(loadCachedDaily(JSON.parse(cachedDaily)));
            } else {
                getGameDataRequest(mode).then((data: any) => {
                    dispatch(setGameData(data));
                    dispatch(startGame());
                });
            }
        }
    };

    const saveDailyGame = () => {
        const currentDay = getCurrentDay();
        if (dailyGame.loaded && lastUpdated == currentDay) {
            localStorage.setItem(StorageKey.GAME_SAVED, JSON.stringify(dailyGame));
            localStorage.setItem(StorageKey.DATE_SAVED, currentDay);
        }
    };

    const sendDailyScore = () => {
        const alreadySent = localStorage.getItem(StorageKey.SCORE_SAVED);
        const username = localStorage.getItem(StorageKey.USERNAME);
        if (dailyGameEnded && !alreadySent && lastUpdated == getCurrentDay() && username) {
            const score = dailyGame.levels.reduce((partialSum, level) => partialSum + level.score, 0);
            postDailyScoreRequest(username, score).then((status: any) => {
                if (status == 200) {
                    localStorage.setItem(StorageKey.SCORE_SAVED, 'true');
                }
            });
        }
    };
    //In React StrictMode useEffect is run twice as screen is rendered twice to spot bugs
    useEffect(resetDailyData, []);
    useEffect(getGameData, [mode]);
    useEffect(saveDailyGame, [dailyGame]);
    useEffect(sendDailyScore, [dailyGameEnded]);

    return (
        <Box
            className="app-container"
            sx={{
                '& .MuiPaper-root': {
                    border: 'solid',
                    borderWidth: 'thin',
                    borderRadius: '10px',
                    borderColor: '#858786'
                }
            }}
        >
            <NameScreen />
            <StatScreen />
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
                className="container"
                toastClassName="toast"
            />
        </Box>
    );
};

export default App;
