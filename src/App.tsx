import { Box } from '@mui/material';
import GameScreen from './components/GameScreen';
import InformationBar from './components/InformationBar';
import Keyboard from './components/Keyboard';
import TitleBar from './components/TitleBar';
import WelcomeScreen from './components/WelcomeScreen';
import EndScreen from './components/StatScreen';
import { setGameData } from './features/gameSlice';
import { useAppDispatch } from './app/hooks';
import { useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Zoom } from 'react-toastify';
import './toastify.css';

const App = () => {
    const dispatch = useAppDispatch();

    const sendGameRequest = () => {
        axios
            .get('api/words')
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
            <WelcomeScreen />
            <EndScreen />
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
