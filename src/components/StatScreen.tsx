import { LevelData, getCurrentGame } from '../features/gameSlice';
import { useAppSelector } from '../app/hooks';
import { Box, Dialog, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useState } from 'react';
import '../styles/StatScreen.css';

const StatScreen = () => {
    const [open, setOpen] = useState(true);
    const gameState = useAppSelector(getCurrentGame);
    const shouldShow = !gameState.alive && gameState.started && open;

    const format = (header: string) => <Box className="statScreen-level-title">{header}</Box>;

    const title = <Box className="statScreen-title">Game Breakdown</Box>;

    const getRank = (word: string, level: LevelData) => {
        const unordered = Object.entries(level.solutions);
        const sorted = unordered.sort((a, b) => b[1] - a[1]).map((entry) => entry[0]);
        const rank = sorted.indexOf(word) + 1;
        return rank == 0 ? '-' : rank + '/' + sorted.length;
    };

    const createRow = (prefix: string, word: string, level: LevelData) => {
        return (
            <TableRow>
                <TableCell>{prefix}</TableCell>
                <TableCell>{word}</TableCell>
                <TableCell align="right">{level.solutions[word] ? level.solutions[word] : '-'}</TableCell>
                <TableCell align="right">{getRank(word, level)}</TableCell>
            </TableRow>
        );
    };

    const getWordByRank = (index: number, level: LevelData) => {
        const unordered = Object.entries(level.solutions);
        const sorted = unordered.sort((a, b) => b[1] - a[1]).map((entry) => entry[0]);
        return sorted[index];
    };

    const levelStats = gameState.levels.map((level) => (
        <>
            {format('Level ' + (gameState.levels.indexOf(level) + 1))}
            <TableBody>
                {createRow('Easiest', getWordByRank(Object.keys(level.solutions).length - 1, level), level)}
                {createRow('Yours', level.usersWord, level)}
                {createRow('Best', getWordByRank(0, level), level)}
            </TableBody>
        </>
    ));

    const table = (
        <TableContainer>
            <Table size="small" className="statScreen-table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Word</TableCell>
                        <TableCell align="right">Score</TableCell>
                        <TableCell align="right">Ranking</TableCell>
                    </TableRow>
                </TableHead>
                {levelStats}
            </Table>
        </TableContainer>
    );

    return (
        <Dialog
            onClose={() => setOpen(false)}
            open={shouldShow}
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
                {table}
            </Box>
        </Dialog>
    );
};

export default StatScreen;
