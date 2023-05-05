import React from 'react';
import ScreenRotationIcon from '@mui/icons-material/ScreenRotation';
import { Box } from '@mui/material';
import '../../styles/Error.css';

const FlipScreenError = () => {
    return (
        <Box className="error-container">
            <Box className="error-message">
                <ScreenRotationIcon />
                Oops, sorry! It looks like your screen hasn't got the right dimensions. Consider rotating or increasing
                the screen size.
            </Box>
        </Box>
    );
};

export default FlipScreenError;
