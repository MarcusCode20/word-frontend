import { Box, TableCell, TableRow } from '@mui/material';
import React from 'react';
import '../../../styles/DailyStatInfo.css';

const DailyStatsInfo = () => {
    const played = (
        <Box className="dailyStatInfo-info">
            <Box className="dailyStatInfo-info-key">
                <span>Played</span>
            </Box>
            <Box className="dailyStatInfo-info-value">162</Box>
        </Box>
    );
    const completed = (
        <Box className="dailyStatInfo-info">
            <Box className="dailyStatInfo-info-key">
                <span>Completed</span>
            </Box>
            <Box className="dailyStatInfo-info-value">100</Box>
        </Box>
    );
    const currentStreak = (
        <Box className="dailyStatInfo-info">
            <Box className="dailyStatInfo-info-key">
                <span>Current Streak</span>
            </Box>
            <Box className="dailyStatInfo-info-value">21</Box>
        </Box>
    );
    const bestStreak = (
        <Box className="dailyStatInfo-info">
            <Box className="dailyStatInfo-info-key">
                <span>Best Streak</span>
            </Box>
            <Box className="dailyStatInfo-info-value">41</Box>
        </Box>
    );
    const cumulativeAvgScore = (
        <Box className="dailyStatInfo-info">
            <Box className="dailyStatInfo-info-key">
                <span>Avg. % of Max Score</span>
            </Box>
            <Box className="dailyStatInfo-info-value">17</Box>
        </Box>
    );
    return (
        <Box className="dailyStatInfo-container">
            {played}
            {completed}
            {currentStreak}
            {bestStreak}
            {cumulativeAvgScore}
        </Box>
    );
};

export default DailyStatsInfo;
