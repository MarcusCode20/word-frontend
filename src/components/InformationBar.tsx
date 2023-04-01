import { Box } from '@mui/material';

const InformationBar = () => {
    return (
        <Box
            sx={{
                //CSS for itself
                margin: 0,
                width: '100%',
                height: '10%',
                maxHeight: '55px',
                backgroundColor: 'pink',
                //CSS for children
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'stretch',
                justifyContent: 'center'
            }}
        />
    );
};

export default InformationBar;
