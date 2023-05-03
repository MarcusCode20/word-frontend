import { LevelData, getCurrentGame } from '../../../app/gameSlice';
import { useAppSelector } from '../../../app/Hooks';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import '../../../styles/GameStatScreen.css';

const GameStatsOverview = () => {
    const gameState = useAppSelector(getCurrentGame);

    const format = (header: string) => <Box className="gameStatScreen-level-title">{header}</Box>;

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

    return (
        <TableContainer>
            <Table size="small" className="gameStatScreen-table">
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
};

export default GameStatsOverview;
