import { Mode, getCurrentGame, getCurrentMode } from '../../../app/game-slice';
import { useAppSelector } from '../../../app/hooks';
import { Box, Dialog, IconButton, Tab, Tabs } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import '../../../styles/game-stat-screen.css';
import '../../../styles/common.css';
import GameStatsOverview from './game-stats-overview';
import { TabPanel, a11yProps } from '../../common/tabbing';
import GameStatsDetailed from './game-stats-detailed';
import { getCountRequest } from '../../../app/requests';

export interface ScoreAndCount {
    score: number;
    count: number;
}

export interface WordAndCountAndScore {
    [word: string]: ScoreAndCount;
}

const GameStatScreen = () => {
    const [showScreen, setShowScreen] = useState(false);
    const gameState = useAppSelector(getCurrentGame);
    const mode = useAppSelector(getCurrentMode);
    const showStatInfo = !gameState.alive && gameState.started;

    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const title = <Box className="gameStatScreen-title">Game Breakdown</Box>;

    const [totalCount, setTotalCount] = useState<WordAndCountAndScore[]>([]);

    const getTotalCount = () => {
        if (showStatInfo && showScreen && mode == Mode.DAILY) {
            getCountRequest().then((data: any) => {
                setTotalCount(data as WordAndCountAndScore[]);
            });
        }
    };
    useEffect(getTotalCount, [showScreen]);

    return (
        <>
            <IconButton className="icon-button" onClick={() => setShowScreen(true)}>
                <QueryStatsIcon className="icon-icon" />
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
                <Box className="gameStatScreen-container">
                    {title}
                    <Tabs value={value} onChange={handleChange} variant="fullWidth">
                        <Tab label="Overview" {...a11yProps(0)} />
                        <Tab label="Detailed" {...a11yProps(1)} />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        {showStatInfo ? <GameStatsOverview /> : <></>}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {showStatInfo ? <GameStatsDetailed totalCount={totalCount} /> : <></>}
                    </TabPanel>
                </Box>
            </Dialog>
        </>
    );
};

export default GameStatScreen;
