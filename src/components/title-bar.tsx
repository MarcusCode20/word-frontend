import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { getCurrentMode, Mode, setMode } from '../app/game-slice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import '../styles/title-bar.css';
import GameStatScreen from './statistics/game/game-stats-screen';
import RestartButton from './game/restart-button';
import DailyStatScreen from './statistics/daily/daily-stat-screen';

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
                <DailyStatScreen />
                <GameStatScreen />
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
