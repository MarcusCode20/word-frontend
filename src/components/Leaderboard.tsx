import { Dialog, Box, Table, TableCell, TableContainer, TableHead, TableRow, TableBody, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { getLeaderboardRequest } from '../requests/Requests';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import '../styles/Leaderboard.css';

interface UserScore extends RawUserScore {
    rank: number;
}

interface RawUserScore {
    user: string;
    score: number;
}

const Leaderboard = () => {
    const [leaderboardData, setLeaderboardData] = useState<UserScore[]>([]);
    const [showLeaderboard, setShowLeaderboard] = useState(false);

    const getLeaderboardData = () => {
        if (showLeaderboard) {
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
        }
    };

    useEffect(getLeaderboardData, [showLeaderboard]);

    const title = <Box className="leaderboard-title">Daily Leaderboard</Box>;

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
            <Button className="leaderboard-button" onClick={() => setShowLeaderboard(true)}>
                <LeaderboardIcon className="leaderboard-icon" />
            </Button>
            <Dialog
                onClose={() => setShowLeaderboard(false)}
                open={showLeaderboard}
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
                <Box className="leaderboard-container">
                    {title}
                    {table}
                </Box>
            </Dialog>
        </>
    );
};

export default Leaderboard;
