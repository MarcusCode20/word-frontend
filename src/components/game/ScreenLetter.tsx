import { Box } from '@mui/material';
import { PropsWithChildren } from 'react';
import '../../styles/ScreenLetter.css';

interface ScreenLetterProp {
    isInput: boolean;
}

const ScreenLetter = (prop: PropsWithChildren<ScreenLetterProp>) => {
    return (
        <Box className="screenLetter-container">
            <Box className="screenLetter-letter">{prop.children}</Box>
            <Box
                className="screenLetter-underline"
                sx={{
                    background: prop.isInput ? 'black' : 'transparent'
                }}
            />
        </Box>
    );
};

export default ScreenLetter;
