import {
    Box,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableBody,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup
} from '@mui/material';
import { useEffect, useState } from 'react';
import { getLeaderboardRequest } from '../../../app/Requests';
import '../../../styles/Leaderboard.css';
import '../../../styles/Common.css';

interface UserScore extends RawUserScore {
    rank: number;
}

interface RawUserScore {
    user: string;
    score: number;
}

enum DAY {
    TODAY = 'TODAY',
    YESTERDAY = 'YESTERDAY'
}

const Leaderboard = () => {
    const [leaderboardData, setLeaderboardData] = useState<UserScore[]>([]);
    const [day, setDay] = useState(DAY.TODAY as string);

    const getLeaderboardData = () => {
        getLeaderboardRequest().then((data: any) => {
            const sortedData: UserScore[] = [];
            const rawData = data as RawUserScore[];
            rawData.sort((a, b) => b.score - a.score);

            for (let i = 0; i < rawData.length; i++) {
                const data = rawData[i];
                sortedData.push({
                    ...data,
                    rank: i + 1
                });
            }

            setLeaderboardData(sortedData);
        });
    };

    useEffect(getLeaderboardData, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDay((event.target as HTMLInputElement).value);
    };

    const leaderboard = leaderboardData.map((data) => (
        <TableRow>
            <TableCell align="right">{data.rank}.</TableCell>
            <TableCell>{data.user}</TableCell>
            <TableCell>{data.score}</TableCell>
        </TableRow>
    ));

    const table = (
        <TableContainer>
            <Table size="small" className="leaderboard-table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>User</TableCell>
                        <TableCell>Score</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{leaderboard}</TableBody>
            </Table>
        </TableContainer>
    );

    return (
        <>
            <FormControl>
                <RadioGroup
                    className="leaderboard-radioGroup"
                    row
                    name="row-radio-buttons-group"
                    value={day}
                    onChange={handleChange}
                >
                    <FormControlLabel
                        className="leaderboard-radioButton"
                        value={DAY.TODAY}
                        control={<Radio size="small" />}
                        label="Today"
                    />
                    <FormControlLabel
                        className="leaderboard-radioButton"
                        value={DAY.YESTERDAY}
                        control={<Radio size="small" />}
                        label="Yesterday"
                    />
                </RadioGroup>
            </FormControl>
            {table}
        </>
    );
};

export default Leaderboard;
