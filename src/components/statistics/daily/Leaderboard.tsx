import {
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
import { getLeaderboardRequest } from '../../../app/requests';
import '../../../styles/Leaderboard.css';
import '../../../styles/Common.css';
import MetaTable from '../../common/MetaTable';

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
    const leaderboard = leaderboards[day];

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

    const data = createLeaderboard(leaderboard);
    const metaTable =
        leaderboard.length > 0 ? (
            <MetaTable
                data={[
                    {
                        key: 'Mean Score:',
                        value: Math.floor(
                            leaderboard.reduce((total, user) => total + user.score, 0) / leaderboard.length
                        )
                    },
                    { key: 'Median Score:', value: leaderboard[Math.floor(leaderboard.length / 2)].score }
                ]}
            ></MetaTable>
        ) : (
            <></>
        );

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
                <TableBody>{data}</TableBody>
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
            {metaTable}
            {table}
        </>
    );
};

export default Leaderboard;
