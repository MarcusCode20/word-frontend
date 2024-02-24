import { Box } from '@mui/material';
import '../../../styles/daily-stat-info.css';
import { StorageKey, StorageWrapper } from '../../../app/storage-wrapper';

export enum Stat {
    PLAYED = 'PLAYED',
    COMPLETED = 'COMPLETED',
    CURRENT_STREAK = 'CURRENT_STREAK',
    BEST_STREAK = 'BEST_STREAK',
    AVG_OF_MAX = 'AVG_OF_MAX'
}

interface CurrentStreak {
    streak: number;
    lastDate: string; //String array "[dd, mm, yyyy]"
}

export interface DailyStatsData {
    [Stat.PLAYED]: number;
    [Stat.COMPLETED]: number;
    [Stat.CURRENT_STREAK]: CurrentStreak;
    [Stat.BEST_STREAK]: number;
    [Stat.AVG_OF_MAX]: number[];
}

export const initialStatsData: DailyStatsData = {
    [Stat.PLAYED]: 0,
    [Stat.COMPLETED]: 0,
    [Stat.CURRENT_STREAK]: {
        streak: 0,
        lastDate: ''
    },
    [Stat.BEST_STREAK]: 0,
    [Stat.AVG_OF_MAX]: []
};

const DailyStatsInfo = () => {
    const dailyStats = StorageWrapper.getItem(StorageKey.DAILY_STATS) as DailyStatsData;
    const listOfAverages = dailyStats[Stat.AVG_OF_MAX];
    const averageOfMax =
        listOfAverages.length > 0
            ? Math.floor(listOfAverages.reduce((sum, element) => sum + element, 0) / listOfAverages.length)
            : 0;

    const createInfo = (key: string, value: number) => (
        <Box className="dailyStatInfo-info">
            <Box className="dailyStatInfo-info-key">
                <span>{key}</span>
            </Box>
            <Box className="dailyStatInfo-info-value">{value}</Box>
        </Box>
    );
    return (
        <Box className="dailyStatInfo-container">
            {createInfo('Played', dailyStats[Stat.PLAYED])}
            {createInfo('Completed', dailyStats[Stat.COMPLETED])}
            {createInfo('Current Streak', dailyStats[Stat.CURRENT_STREAK].streak)}
            {createInfo('Best Streak', dailyStats[Stat.BEST_STREAK])}
            {createInfo('Avg. % of Max Score', averageOfMax)}
        </Box>
    );
};

export default DailyStatsInfo;
