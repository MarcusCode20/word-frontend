import { Box } from '@mui/material';
import GameScreen from './components/GameScreen';
import InformationBar from './components/InformationBar';
import Keyboard from './components/Keyboard';
import TitleBar from './components/TitleBar';
import WelcomeScreen from './components/WelcomeScreen';
import EndScreen from './components/EndScreen';
import { MAX_LEVEL, endGame, getGameState, setGameData } from './features/gameSlice';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const dispatch = useAppDispatch();

    const sendGameRequest = () => {
        axios
            .get('/api/words')
            .then(function (response) {
                dispatch(setGameData(response.data));
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    };
    //In React StrictMode useEffect is run twice as screen is rendered twice to spot bugs
    useEffect(sendGameRequest, []);

    const currentLevel = useAppSelector(getGameState).currentLevelNo;

    const checkGameEnded = () => {
        console.log(currentLevel);
        if (currentLevel > MAX_LEVEL) {
            console.log('Game end');
            dispatch(endGame());
        }
    };

    useEffect(checkGameEnded, [currentLevel]);

    return (
        <Box
            sx={{
                margin: '0px',
                width: '100vw',
                height: '100vh',
                backgroundColor: 'black',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start'
            }}
        >
            <WelcomeScreen />
            <EndScreen />
            <TitleBar />
            <InformationBar />
            <GameScreen />
            <Keyboard />
        </Box>
    );
};

export default App;
