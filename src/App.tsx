import { Box } from '@mui/material';
import GameScreen from './components/GameScreen';
import InformationBar from './components/InformationBar';
import Keyboard from './components/Keyboard';
import TitleBar from './components/TitleBar';
import './styles/App.css';
import { setGameData, Mode, startGame, getDailyGame, loadCachedDaily } from './app/gameSlice';
import { useAppDispatch, useAppSelector } from './app/Hooks';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Zoom } from 'react-toastify';
import './styles/Toast.css';
import { getGameDataRequest, postDailyScoreRequest } from './app/Requests';
import NameScreen from './components/NameScreen';
import { StorageKey, StorageWrapper } from './app/StorageWrapper';

function getCurrentDay() {
    const date = new Date();
    //Month is indexed from zero...
    return [date.getUTCDate(), date.getUTCMonth() + 1, date.getUTCFullYear()].toString();
}

const App = () => {
    const dailyGame = useAppSelector(getDailyGame);
    const lastUpdated = dailyGame.date;
    const dailyGameEnded = !dailyGame.alive && dailyGame.started && dailyGame.loaded;
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
            dispatch(loadCachedDaily(JSON.parse(cachedDaily)));
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
            StorageWrapper.setItem(StorageKey.GAME_SAVED, JSON.stringify(dailyGame));
            StorageWrapper.setItem(StorageKey.DATE_SAVED, currentDay);
        }
    };

    const sendDailyScore = () => {
        const alreadySent = StorageWrapper.getItem(StorageKey.SCORE_SAVED);
        const username = StorageWrapper.getItem(StorageKey.USERNAME);
        if (dailyGameEnded && !alreadySent && lastUpdated == getCurrentDay() && username) {
            const usersAnswers = dailyGame.levels.map((level) => level.usersWord);
            postDailyScoreRequest(username, usersAnswers).then((status: any) => {
                //Status of 200 is successful.
                if (status == 200) {
                    StorageWrapper.setItem(StorageKey.SCORE_SAVED, 'true');
                }
            });
        }
    };
    //In React StrictMode useEffect is run twice as screen is rendered twice to spot bugs
    //Reset cached daily data first if needs the data is old.
    useEffect(resetDailyData, []);
    //Now request new data for both daily and practice.
    useEffect(intialGameLoad, []);
    useEffect(saveDailyGame, [dailyGame]);
    useEffect(sendDailyScore, [dailyGameEnded]);

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
