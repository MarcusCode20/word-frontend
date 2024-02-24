import { Box, CircularProgress } from '@mui/material';
import Level from './level';
import { getCurrentGame } from '../../app/game-slice';
import { useAppSelector } from '../../app/hooks';
import '../../styles/game-screen.css';

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
