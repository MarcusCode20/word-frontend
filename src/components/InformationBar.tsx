import { Box, Typography } from '@mui/material';
import React from 'react';

const InformationBar = () => {
    return (
        <Box
            sx={{
                margin: '0px',
                width: '100vw',
                height: '10%',
                backgroundColor: 'pink',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                justifyItems: 'center'
            }}
        >
            <Typography
                variant="h6"
                component="div"
                align="center"
                sx={{
                    fontWeight: 'bold',
                    '@media (max-width:400px) and (max-height:800px)': {
                        fontSize: '13px'
                    }
                }}
            >
                Display Info
            </Typography>
        </Box>
    );
};

export default InformationBar;
