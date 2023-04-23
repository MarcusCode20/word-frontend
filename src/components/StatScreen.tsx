import { Mode, getCurrentGame, getCurrentMode } from '../app/gameSlice';
import { useAppSelector } from '../app/Hooks';
import { Box, Button, Dialog, Tab, Tabs } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import '../styles/StatScreen.css';
import '../styles/Common.css';
import StatsOverview from './StatsOverview';
import { TabPanel, a11yProps } from './Tabbing';
import StatsDetailed from './StatsDetailed';
import { getCountRequest } from '../app/Requests';

export interface ScoreAndCount {
    score: number;
    count: number;
}

export interface WordAndCountAndScore {
    [word: string]: ScoreAndCount;
}

const StatScreen = () => {
    const [showStatScreen, setShowStatScreen] = useState(false);
    const gameState = useAppSelector(getCurrentGame);
    const mode = useAppSelector(getCurrentMode);
    const showStatInfo = !gameState.alive && gameState.started;

    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const title = <Box className="statScreen-title">Game Breakdown</Box>;

    const [totalCount, setTotalCount] = useState<WordAndCountAndScore[]>([]);

    const getTotalCount = () => {
        if (showStatInfo && showStatScreen && mode == Mode.DAILY) {
            getCountRequest().then((data: any) => {
                setTotalCount(data as WordAndCountAndScore[]);
            });
        }
    };
    useEffect(getTotalCount, [showStatScreen]);

    return (
        <>
            <Button className="icon-button" onClick={() => setShowStatScreen(true)}>
                <QueryStatsIcon className="icon-icon" />
            </Button>
            <Dialog
                onClose={() => setShowStatScreen(false)}
                open={showStatScreen}
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
                <Box className="statScreen-container">
                    {title}
                    <Tabs value={value} onChange={handleChange} variant="fullWidth">
                        <Tab label="Overview" {...a11yProps(0)} />
                        <Tab label="Detailed" {...a11yProps(1)} />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        {showStatInfo ? <StatsOverview /> : <></>}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {showStatInfo ? <StatsDetailed totalCount={totalCount} /> : <></>}
                    </TabPanel>
                </Box>
            </Dialog>
        </>
    );
};

export default StatScreen;
