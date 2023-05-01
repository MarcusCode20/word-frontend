import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { getCurrentMode, Mode, setMode } from '../app/gameSlice';
import { useAppDispatch, useAppSelector } from '../app/Hooks';
import Leaderboard from './Leaderboard';
import '../styles/TitleBar.css';
import StatScreen from './StatScreen';
import RestartButton from './RestartButton';

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
            <Box className="titleBar-groupLeft">
                <Leaderboard />
                <StatScreen />
                <RestartButton />
            </Box>
            <ToggleButtonGroup
                size="small"
                value={mode}
                exclusive
                onChange={handleChange}
                className="titleBar-toggleGroup"
            >
                <ToggleButton className="titleBar-toggleGroup-button" value={Mode.DAILY}>
                    Daily
                </ToggleButton>
                <ToggleButton className="titleBar-toggleGroup-button" value={Mode.PRACTICE}>
                    Practice
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
};

export default TitleBar;
