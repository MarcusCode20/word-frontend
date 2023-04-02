import { Box, Paper } from '@mui/material';
import { getGameState } from '../features/gameSlice';
import { useAppSelector } from '../app/hooks';

const InformationBar = () => {
    const score = 'Score: ' + useAppSelector(getGameState).score;

    const scoreboard = (
        <Paper
            sx={{
                flexGrow: 1,
                margin: '0 1%',
                width: '100%',
                maxWidth: '450px',
                height: '60px',
                maxHeight: '40px',
                fontSize: '20px',
                //CSS for styling
                lineHeight: '160%',
                fontWeight: 'bold',
                textAlign: 'center',
                userSelect: 'none',
                verticalAlign: 'middle'
            }}
        >
            {score}
        </Paper>
    );

    return (
        <Box
            sx={{
                //CSS for itself
                margin: 0,
                width: '100%',
                height: '10%',
                maxHeight: '55px',
                backgroundColor: '#FFFBFB',
                //CSS for children
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            {scoreboard}
        </Box>
    );
};

export default InformationBar;
