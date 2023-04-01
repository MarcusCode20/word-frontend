import { MAX_LEVEL, getGameState } from '../features/gameSlice';
import { useAppSelector } from '../app/hooks';
import { Dialog, Paper } from '@mui/material';

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
            <Paper
                sx={{
                    margin: 0,
                    width: '400px',
                    height: '100px',
                    fontSize: '40px',
                    lineHeight: '100%',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    background: 'white',
                    border: '7px solid #4CAF50',
                    borderRadius: '15px',
                    color: 'black',
                    overflow: 'hidden'
                }}
            >
                Game Ended
            </Paper>
        </Dialog>
    );
};

export default WelcomeScreen;
