import { Dialog, Box, IconButton, Tab, Tabs } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import '../../../styles/DailyStatScreen.css';
import '../../../styles/Common.css';
import { a11yProps, TabPanel } from '../../common/Tabbing';
import Leaderboard from './Leaderboard';
import DailyStatsInfo from './DailyStatsInfo';

const DailyStatScreen = () => {
    const [showScreen, setShowScreen] = useState(false);
    const title = <Box className="dailyStatScreen-title">Daily Statistics</Box>;

    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <IconButton className="icon-button" onClick={() => setShowScreen(true)}>
                <LeaderboardIcon className="icon-icon" />
            </IconButton>
            <Dialog
                onClose={() => setShowScreen(false)}
                open={showScreen}
                PaperProps={{
                    style: {
                        border: 'solid',
                        borderWidth: '2px',
                        borderRadius: '10px',
                        borderColor: '#858786',
                        background: 'transparent',
                        width: '100%',
                        height: '60%',
                        overflow: 'hidden'
                    }
                }}
            >
                <Box className="dailyStatScreen-container">
                    {title}
                    <Tabs value={value} onChange={handleChange} variant="fullWidth">
                        <Tab label="Statistics" {...a11yProps(0)} />
                        <Tab label="Leaderboard" {...a11yProps(1)} />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <DailyStatsInfo />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Leaderboard />
                    </TabPanel>
                </Box>
            </Dialog>
        </>
    );
};

export default DailyStatScreen;
