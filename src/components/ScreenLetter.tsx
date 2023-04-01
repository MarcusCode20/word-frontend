import { Box } from '@mui/material';
import { PropsWithChildren } from 'react';

interface ScreenLetterProp {
    isInput: boolean;
}

const ScreenLetter = (prop: PropsWithChildren<ScreenLetterProp>) => {
    return (
        <Box
            sx={{
                //CSS for itself
                margin: '0px',
                //Divide by 8 because we only allow up to 8 letters in a level
                width: 'calc(90% / 8)',
                //CSS for children
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'stretch'
            }}
        >
            <Box
                sx={{
                    //CSS for sizing
                    margin: '0 1%',
                    maxWidth: '40px',
                    height: '40px',
                    maxHeight: '40px',
                    fontSize: '40px',
                    //CSS for styling
                    lineHeight: '100%',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    userSelect: 'none'
                }}
            >
                {prop.children}
            </Box>
            <Box
                sx={{
                    height: '2px',
                    background: prop.isInput ? 'black' : 'transparent'
                }}
            />
        </Box>
    );
};

export default ScreenLetter;
