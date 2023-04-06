import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { getGameState, Mode, setMode } from '../features/gameSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const TitleBar = () => {
    const dispatch = useAppDispatch();
    const mode = useAppSelector(getGameState).mode;

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
                justifyContent: 'flex-end'
            }}
        >
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
