import { Box, CircularProgress } from '@mui/material';
import Level from './Level';
import { getCurrentGame } from '../app/gameSlice';
import { useAppSelector } from '../app/Hooks';
import '../styles/GameScreen.css';

const GameScreen = () => {
    const game = useAppSelector(getCurrentGame);
    const levels = game.levels.map((level) => <Level key={level.hiddenWord} data={level}></Level>);

    return (
        <Box className="gameScreen-container">
            {game.loaded ? levels : <CircularProgress sx={{ margin: 'auto' }} />}
        </Box>
    );
};

export default GameScreen;
