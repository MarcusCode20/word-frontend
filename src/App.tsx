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
    loadCachedDaily,
    getLastUpdated
} from './features/gameSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Zoom } from 'react-toastify';
import './toastify.css';
import { getGameDataRequest, postDailyScoreRequest } from './requests/Requests';

enum StorageKey {
    GAME_SAVED = 'word.game.guess.daily.data.game',
    SCORE_SAVED = 'word.game.guess.daily.data.score',
    DATE_SAVED = 'word.game.guess.daily.data.date'
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
    const lastUpdated = useAppSelector(getLastUpdated);
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
        if (dailyGameEnded && !alreadySent && lastUpdated == getCurrentDay()) {
            const score = dailyGame.levels.reduce((partialSum, level) => partialSum + level.score, 0);
            postDailyScoreRequest('Marcus', score).then((status: any) => {
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
            sx={{
                position: 'fixed',
                margin: '0px',
                width: '100%',
                height: '100%',
                backgroundColor: '#FFFBFB',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                '& .MuiPaper-root': {
                    border: 'solid',
                    borderWidth: 'thin',
                    borderRadius: '10px',
                    borderColor: '#858786'
                }
            }}
        >
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
                className="alert"
                style={{
                    width: '100%',
                    maxWidth: '200px',
                    backgroundColor: 'transparent'
                }}
                toastStyle={{
                    margin: '4px',
                    padding: 0,
                    width: '100%',
                    background: '#FFFBFB',
                    fontSize: '15px',
                    lineHeight: '160%',
                    fontWeight: 'bold',
                    color: 'black',
                    textAlign: 'center',
                    userSelect: 'none',
                    verticalAlign: 'middle',
                    border: 'solid',
                    borderWidth: 'thin',
                    borderRadius: '10px',
                    borderColor: '#858786'
                }}
            />
        </Box>
    );
};

export default App;
