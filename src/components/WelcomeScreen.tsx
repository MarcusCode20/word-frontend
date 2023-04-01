import { startGame } from '../features/gameSlice';
import { useAppDispatch } from '../app/hooks';
import { useState } from 'react';
import { Button, Dialog } from '@mui/material';

const WelcomeScreen = () => {
    const dispatch = useAppDispatch();

    const [started, setStarted] = useState(false); //Set to false to show

    const onClose = () => {
        setStarted(true);
        dispatch(startGame());
    };

    return (
        <Dialog
            open={!started}
            PaperProps={{
                style: { borderRadius: '15px', background: 'transparent' }
            }}
        >
            <Button
                sx={{
                    margin: 0,
                    padding: 0,
                    width: '200px',
                    height: '100px',
                    fontSize: '40px',
                    lineHeight: '100%',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    background: 'white',
                    border: '7px solid #4CAF50',
                    borderRadius: '15px',
                    color: 'black',
                    overflow: 'hidden',
                    '&:hover': {
                        background: '#4CAF50',
                        border: '7px solid white',
                        color: 'white'
                    }
                }}
                onClick={onClose}
            >
                Start
            </Button>
        </Dialog>
    );
};

export default WelcomeScreen;
