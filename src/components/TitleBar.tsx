import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { getCurrentMode, Mode, setMode } from '../features/gameSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Leaderboard from './Leaderboard';
import '../styles/TitleBar.css';

const TitleBar = () => {
    const dispatch = useAppDispatch();
    const mode = useAppSelector(getCurrentMode);
    const handleChange = (event: React.MouseEvent<HTMLElement>, newMode: Mode) => {
        if (newMode != null) {
            dispatch(setMode(newMode));
        }
    };

    return (
        <Box className="titleBar-container">
            <Leaderboard />
            <ToggleButtonGroup
                size="small"
                value={mode}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                className="titleBar-toggleGroup"
            >
                <ToggleButton value={Mode.DAILY}>Daily Mode</ToggleButton>
                <ToggleButton value={Mode.PRACTICE}>Practice Mode</ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
};

export default TitleBar;
