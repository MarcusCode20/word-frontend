import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { getCurrentMode, Mode, setMode } from '../app/gameSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import '../styles/TitleBar.css';
import GameStatScreen from './statistics/game/GameStatScreen';
import RestartButton from './game/RestartButton';
import DailyStatScreen from './statistics/daily/DailyStatScreen';

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
