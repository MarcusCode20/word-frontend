import {
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import { Mode, getCurrentGame, getCurrentMode } from '../../../app/gameSlice';
import { useAppSelector } from '../../../app/hooks';
import '../../../styles/GameStatScreen.css';
import { WordAndCountAndScore } from './GameStatScreen';
import { useState } from 'react';
import MetaTable from '../../common/MetaTable';

interface StatsDetailedProp {
    totalCount: WordAndCountAndScore[];
}

const GameStatsDetailed = (prop: StatsDetailedProp) => {
    const [levelNumber, setLevelNumber] = useState(0);
    const currentGame = useAppSelector(getCurrentGame);
    const levelSolutionData = currentGame.levels[levelNumber].solutions;
    const mode = useAppSelector(getCurrentMode);

    const handleChange = (event: SelectChangeEvent) => {
        setLevelNumber(Number(event.target.value as string));
    };

    const menuItems = () => {
        const elements: JSX.Element[] = [];
        for (let i = 0; i < currentGame.levels.length; i++) {
            elements.push(<MenuItem value={i}>Level {i + 1}</MenuItem>);
        }

        return elements;
    };

    const getWordCount = (word: string) => {
        if (prop.totalCount[levelNumber]) {
            return prop.totalCount[levelNumber][word].count;
        }
    };

    const levelSolutions = Object.entries(levelSolutionData).map((data) => {
        const [word, score] = data;

        return (
            <TableRow>
                <TableCell></TableCell>
                <TableCell>{word}</TableCell>
                <TableCell>{score}</TableCell>
                {mode == Mode.DAILY ? <TableCell>{getWordCount(word)}</TableCell> : <></>}
            </TableRow>
        );
    });

    const table = (
        <TableContainer>
            <Table size="small" className="gameStatScreen-table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Word</TableCell>
                        <TableCell>Score</TableCell>
                        {mode == Mode.DAILY ? <TableCell>Count</TableCell> : <></>}
                    </TableRow>
                </TableHead>
                <TableBody>{levelSolutions}</TableBody>
            </Table>
        </TableContainer>
    );

    const metaTable = () => {
        if (mode == Mode.DAILY && prop.totalCount[levelNumber]) {
            const solutions = prop.totalCount[levelNumber];
            const mostChosen = [...Object.entries(solutions)];
            mostChosen.sort((a, b) => b[1].count - a[1].count);
            if (mostChosen[0][0] && mostChosen[0][1].count > 0)
                return <MetaTable data={[{ key: 'Most Used:', value: mostChosen[0][0] }]}></MetaTable>;
        }
        return <></>;
    };

    return (
        <>
            <FormControl fullWidth>
                <Select className="gameStatScreen-detailed-select" value={levelNumber + ''} onChange={handleChange}>
                    {menuItems()}
                </Select>
            </FormControl>
            {metaTable()}
            {table}
        </>
    );
};

export default GameStatsDetailed;
