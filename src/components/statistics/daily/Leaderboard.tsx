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
    Radio,
    RadioGroup
} from '@mui/material';
import { useEffect, useState } from 'react';
import { getLeaderboardRequest } from '../../../app/Requests';
import '../../../styles/Leaderboard.css';
import '../../../styles/Common.css';

interface UserScore {
    user: string;
    score: number;
}

enum DAY {
    TODAY = 'TODAY',
    YESTERDAY = 'YESTERDAY'
}

type Leaderboards = {
    [key in DAY]: UserScore[];
};

const initialLeaderboards: Leaderboards = {
    [DAY.TODAY]: [],
    [DAY.YESTERDAY]: []
};

const Leaderboard = () => {
    const [leaderboards, setLeaderboards] = useState<Leaderboards>(initialLeaderboards);
    const [day, setDay] = useState(DAY.TODAY);

    const getLeaderboards = () => {
        getLeaderboardRequest().then((data: any) => {
            setLeaderboards(data as Leaderboards);
        });
    };

    useEffect(getLeaderboards, []);

    //RadioGroup callback only allows string for the value...
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, newDay: string) => {
        setDay(newDay as DAY);
    };

    const createLeaderboard = (scores: UserScore[]) => {
        const leaderboard: JSX.Element[] = [];
        for (let i = 0; i < scores.length; i++) {
            const userAndScore = scores[i];
            leaderboard.push(
                <TableRow>
                    <TableCell align="right">{i + 1}.</TableCell>
                    <TableCell>{userAndScore.user}</TableCell>
                    <TableCell>{userAndScore.score}</TableCell>
                </TableRow>
            );
        }
        return leaderboard;
    };

    const leaderboard = createLeaderboard(leaderboards[day]);

    const table = (
        <TableContainer>
            <Table size="small" className="leaderboard-table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ width: '20%' }}></TableCell>
                        <TableCell sx={{ width: '40%' }}>User</TableCell>
                        <TableCell sx={{ width: '40%' }}>Score</TableCell>
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
