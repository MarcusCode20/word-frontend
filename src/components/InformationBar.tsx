import { Box } from '@mui/material';
import { getGameState } from '../features/gameSlice';
import { useAppSelector } from '../app/hooks';

const InformationBar = () => {
    const score = 'Score: ' + useAppSelector(getGameState).score;

    return (
        <Box
            sx={{
                //CSS for itself
                margin: 0,
                width: '100%',
                height: '10%',
                maxHeight: '55px',
                backgroundColor: 'pink',
                //CSS for children
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'stretch',
                justifyContent: 'center'
            }}
        >
            {score}
        </Box>
    );
};

export default InformationBar;
