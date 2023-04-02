import { MAX_LEVEL, getGameState } from '../features/gameSlice';
import { useAppSelector } from '../app/hooks';
import { Dialog } from '@mui/material';

const WelcomeScreen = () => {
    const gameState = useAppSelector(getGameState);
    const shouldShow = !gameState.alive && gameState.currentLevelNo > MAX_LEVEL;

    return (
        <Dialog
            open={shouldShow}
            PaperProps={{
                style: {
                    margin: 0,
                    width: '100%',
                    maxWidth: '300px',
                    height: '100px',
                    fontSize: '40px',
                    lineHeight: '180%',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    background: 'white',
                    border: '7px solid #4CAF50',
                    borderRadius: '15px',
                    color: '#858786'
                }
            }}
        >
            Game Ended
        </Dialog>
    );
};

export default WelcomeScreen;
