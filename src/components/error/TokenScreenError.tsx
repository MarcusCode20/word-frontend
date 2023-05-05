import React from 'react';
import '../../styles/Error.css';
import { Box } from '@mui/material';
import SickIcon from '@mui/icons-material/Sick';

const TokenScreenError = () => {
    return (
        <Box className="error-container">
            <Box className="error-message">
                <SickIcon />
                Oops, sorry! It looks like there is a problem with the server, please try again later.
            </Box>
        </Box>
    );
};

export default TokenScreenError;
