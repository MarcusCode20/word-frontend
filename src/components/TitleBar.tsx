import { Box } from '@mui/material';

const TitleBar = () => {
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
                borderWidth: 'thin'
            }}
        />
    );
};

export default TitleBar;
