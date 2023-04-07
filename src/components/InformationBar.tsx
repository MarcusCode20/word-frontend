import { Box, Paper } from '@mui/material';
import { getCurrentGame } from '../features/gameSlice';
import { useAppSelector } from '../app/hooks';

const infoCss = {
    flexGrow: 1,
    margin: '0 1%',
    width: '100%',
    height: '60px',
    maxHeight: '40px',
    fontSize: '20px',
    //CSS for styling
    lineHeight: '160%',
    fontWeight: 'bold',
    textAlign: 'center',
    userSelect: 'none',
    verticalAlign: 'middle'
};

const InformationBar = () => {
    const game = useAppSelector(getCurrentGame);

    const possiblities =
        game.loaded && game.started
            ? 'Possibilities: ' + Object.keys(game.levels[game.currentLevelNo].solutions).length
            : 'Possibilities: 0';
    const score = 'Score: ' + game.levels.reduce((partialSum, level) => partialSum + level.score, 0);

    const scoreboard = (
        <Paper key="scoreComp" sx={infoCss}>
            {score}
        </Paper>
    );

    const solutionBoard = (
        <Paper key="solutionComp" sx={infoCss}>
            {possiblities}
        </Paper>
    );

    return (
        <Box
            sx={{
                //CSS for itself
                margin: '0 auto 0 auto',
                width: '100%',
                height: '10%',
                maxHeight: '55px',
                maxWidth: '450px',
                backgroundColor: '#FFFBFB',
                //CSS for children
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            {[scoreboard, solutionBoard]}
        </Box>
    );
};

export default InformationBar;
