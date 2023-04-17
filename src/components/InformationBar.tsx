import { Box, Paper } from '@mui/material';
import { getCurrentGame } from '../features/gameSlice';
import { useAppSelector } from '../app/hooks';
import '../styles/InformationBar.css';

const InformationBar = () => {
    const game = useAppSelector(getCurrentGame);

    const possiblities =
        game.loaded && game.started
            ? 'Possibilities: ' + Object.keys(game.levels[game.currentLevelNo].solutions).length
            : 'Possibilities: 0';
    const score = 'Score: ' + game.levels.reduce((partialSum, level) => partialSum + level.score, 0);

    const scoreboard = (
        <Paper key="scoreComp" className="informationBar-info">
            {score}
        </Paper>
    );

    const solutionBoard = (
        <Paper key="solutionComp" className="informationBar-info">
            {possiblities}
        </Paper>
    );

    return <Box className="informationBar-container">{[scoreboard, solutionBoard]}</Box>;
};

export default InformationBar;
