import { Box } from '@mui/material';
import Level from './Level';
import { getGameState } from '../features/gameSlice';
import { useAppSelector } from '../app/hooks';

const GameScreen = () => {
    const levels = useAppSelector(getGameState).levels.map((level) => (
        <Level key={level.hiddenWord} data={level}></Level>
    ));

    return (
        <Box
            sx={{
                //CSS for itself
                flexGrow: 1,
                margin: '0 auto 0 auto',
                width: '100%',
                maxWidth: '450px',
                height: '50%',
                maxHeight: '600px',
                backgroundColor: '#FFFBFB',
                //CSS for  children
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'stretch',
                '& .MuiPaper-root': {
                    borderColor: '#858786'
                }
            }}
        >
            {levels}
        </Box>
    );
};

export default GameScreen;
