import { Box } from '@mui/material';
import GameScreen from './components/GameScreen';
import InformationBar from './components/InformationBar';
import Keyboard from './components/Keyboard';
import TitleBar from './components/TitleBar';

const App = () => {
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
            <TitleBar />
            <InformationBar />
            <GameScreen />
            <Keyboard />
        </Box>
    );
};

export default App;
