import { Box } from '@mui/material';
import Level from './Level';
import { getCurrentGame } from '../app/gameSlice';
import { useAppSelector } from '../app/Hooks';
import '../styles/GameScreen.css';

const GameScreen = () => {
    const levels = useAppSelector(getCurrentGame).levels.map((level) => (
        <Level key={level.hiddenWord} data={level}></Level>
    ));

    return <Box className="gameScreen-container">{levels}</Box>;
};

export default GameScreen;
