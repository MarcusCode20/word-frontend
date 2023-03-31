import { Box } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import Letter from './Letter';

interface ScreenLetterProp {
    isInput: boolean;
}

const ScreenLetter = (prop: PropsWithChildren<ScreenLetterProp>) => {
    return (
        <Box
            sx={{
                margin: '0px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'stretch' // For now
            }}
        >
            <Letter>{prop.children}</Letter>
            <Box
                sx={{
                    height: '2px',
                    width: '100%',
                    background: prop.isInput ? 'black' : 'transparent'
                }}
            />
        </Box>
    );
};

export default ScreenLetter;
