import { Box } from '@mui/material';
import { getCurrentGame } from '../app/gameSlice';
import { useAppSelector } from '../app/Hooks';
import '../styles/InformationBar.css';

const InformationBar = () => {
    const game = useAppSelector(getCurrentGame);

    const possiblities =
        game.loaded && game.started
            ? 'Possibilities: ' + Object.keys(game.levels[game.currentLevelNo].solutions).length
            : 'Possibilities: 0';
    const score = 'Score: ' + game.levels.reduce((partialSum, level) => partialSum + level.score, 0);

    const scoreboard = (
        <Box key="scoreComp" className="informationBar-info informationBar-info-left">
            {score}
        </Box>
    );

    const solutionBoard = (
        <Box key="solutionComp" className="informationBar-info informationBar-info-right">
            {possiblities}
        </Box>
    );

    return <Box className="informationBar-container">{[scoreboard, solutionBoard]}</Box>;
};

export default InformationBar;
