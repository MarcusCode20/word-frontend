import { Typography } from '@mui/material';
import React, { PropsWithChildren } from 'react';

const Letter = (prop: PropsWithChildren) => {
    return (
        <Typography
            variant="h6"
            component="div"
            sx={{
                textAlign: 'center',
                lineHeight: '100%',
                maxHeight: '50px',
                margin: '0 1%',
                fontWeight: 'bold',
                fontSize: '40px',
                userSelect: 'none',
                width: '40px',
                height: '40px'
            }}
        >
            {prop.children}
        </Typography>
    );
};

export default Letter;
