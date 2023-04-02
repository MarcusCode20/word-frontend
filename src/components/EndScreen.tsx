import { MAX_LEVEL, getGameState } from '../features/gameSlice';
import { useAppSelector } from '../app/hooks';
import { Box, Dialog } from '@mui/material';

const WelcomeScreen = () => {
    const gameState = useAppSelector(getGameState);
    const shouldShow = !gameState.alive && gameState.currentLevelNo > MAX_LEVEL;

    return (
        <Dialog
            open={shouldShow}
            PaperProps={{
                style: { borderRadius: '15px', background: 'transparent' }
            }}
        >
            <Box
                sx={{
                    margin: 0,
                    padding: 0,
                    width: '300px',
                    height: '100px',
                    fontSize: '40px',
                    lineHeight: '200%',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    background: 'white',
                    border: '7px solid #4CAF50',
                    borderRadius: '15px',
                    color: 'black'
                }}
            >
                Game Ended
            </Box>
        </Dialog>
    );
};

export default WelcomeScreen;
