import { Box, Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { getCurrentMode, Mode, setMode } from '../features/gameSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useState } from 'react';
import Leaderboard from './Leaderboard';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

const TitleBar = () => {
    const dispatch = useAppDispatch();
    const mode = useAppSelector(getCurrentMode);
    const [showLeaderboard, setShowLeaderboard] = useState(false);

    const handleChange = (event: React.MouseEvent<HTMLElement>, newMode: Mode) => {
        if (newMode != null) {
            dispatch(setMode(newMode));
        }
    };

    return (
        <Box
            sx={{
                margin: 0,
                width: '100%',
                height: '10%',
                maxHeight: '55px',
                backgroundColor: '#FFFBFB',
                borderBottom: 'solid',
                borderColor: '#858786',
                borderWidth: 'thin',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}
        >
            <Button
                sx={{
                    background: '#FFFBFB',
                    color: 'black'
                }}
                onClick={() => setShowLeaderboard(true)}
            >
                <LeaderboardIcon sx={{ width: '100%', height: '100%' }} />
            </Button>
            <Leaderboard show={showLeaderboard} onclose={() => setShowLeaderboard(false)} />
            <ToggleButtonGroup
                size="small"
                value={mode}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                sx={{
                    '& .MuiToggleButton-root': {
                        background: '#FFFBFB',
                        fontFamily: 'Times New Roman',
                        fontWeight: 'bold',
                        border: 'none',
                        borderRadius: '0px'
                    },
                    '& .Mui-selected': {
                        background: '#C3BFC7'
                    }
                }}
            >
                <ToggleButton value={Mode.DAILY}>Daily Mode</ToggleButton>
                <ToggleButton value={Mode.PRACTICE}>Practice Mode</ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
};

export default TitleBar;
