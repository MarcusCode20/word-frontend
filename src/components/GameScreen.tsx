import { Box } from '@mui/material';
import Level from './Level';
import { getGameState } from '../features/gameSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';

const GameScreen = () => {
    const dispatch = useAppDispatch();

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
                backgroundColor: 'red',
                //CSS for  children
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'stretch'
            }}
        >
            {levels}
        </Box>
    );
};

export default GameScreen;
