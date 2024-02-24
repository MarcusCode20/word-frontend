import { getCurrentGame } from '../../../app/game-slice';
import { useAppSelector } from '../../../app/hooks';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import '../../../styles/game-stat-screen.css';
import MetaTable from '../../common/meta-table';

enum Option {
    EASIEST = 'Easist',
    YOURS = 'Yours',
    BEST = 'Best'
}

interface StatsData {
    word: string;
    score: number;
    rank: number;
    totalRank: number;
}

type LevelStatsData = {
    [key in Option]: StatsData;
};

function createStatsData(word: string, score: number, rank: number, totalRank: number) {
    return {
        word: word,
        score: score,
        rank: rank,
        totalRank: totalRank
    };
}

const GameStatsOverview = () => {
    const game = useAppSelector(getCurrentGame);

    const getStatsFromGame = () => {
        const data: LevelStatsData[] = [];
        game.levels.forEach((level) => {
            //This is resolves to [["word", 10], ["apple", 6], ..., ["great, 1"]]
            //Descending order of points
            const sortedSolutions = Object.entries(level.solutions).sort((a, b) => b[1] - a[1]);
            //This resolves to ["word", "apple", "great"]
            const wordRank = sortedSolutions.map((solution) => solution[0]);
            data.push({
                [Option.EASIEST]: createStatsData(
                    sortedSolutions[sortedSolutions.length - 1][0],
                    sortedSolutions[sortedSolutions.length - 1][1],
                    sortedSolutions.length,
                    sortedSolutions.length
                ),
                [Option.YOURS]: createStatsData(
                    level.usersWord,
                    level.score,
                    wordRank.indexOf(level.usersWord) + 1,
                    sortedSolutions.length
                ),
                [Option.BEST]: createStatsData(sortedSolutions[0][0], sortedSolutions[0][1], 1, sortedSolutions.length)
            });
        });
        return data;
    };

    const gameStatsData = getStatsFromGame();

    const format = (header: string) => <Box className="gameStatScreen-level-title">{header}</Box>;

    const createRows = (levelStats: LevelStatsData) => {
        return Object.entries(levelStats).map((entry) => {
            const [option, stats] = entry;
            return (
                <TableRow>
                    <TableCell>{option}</TableCell>
                    <TableCell>{stats.word ? stats.word : '-'}</TableCell>
                    <TableCell align="right">{stats.score ? stats.score : '-'}</TableCell>
                    <TableCell align="right">{stats.rank == 0 ? '-' : stats.rank + '/' + stats.totalRank}</TableCell>
                </TableRow>
            );
        });
    };

    const table = gameStatsData.map((levelStats) => {
        return (
            <>
                {format('Level ' + (gameStatsData.indexOf(levelStats) + 1))}
                <TableBody>{createRows(levelStats)}</TableBody>
            </>
        );
    });

    const metaTable = () => {
        const score = game.levels.reduce((partialSum, level) => partialSum + level.score, 0);
        const maxScore = gameStatsData.reduce((partialSum, levelStats) => partialSum + levelStats.Best.score, 0);
        const percentage = Math.floor((score * 100) / maxScore);

        return (
            <MetaTable
                data={[
                    { key: 'Score:', value: score },
                    {
                        key: 'Max Score:',
                        value: maxScore
                    },
                    { key: '% of Max Score:', value: percentage }
                ]}
            ></MetaTable>
        );
    };

    return (
        <>
            {metaTable()}
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
                    {table}
                </Table>
            </TableContainer>
        </>
    );
};

export default GameStatsOverview;
