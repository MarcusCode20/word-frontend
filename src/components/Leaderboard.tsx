import { Dialog, Box, Table, TableCell, TableContainer, TableHead, TableRow, TableBody, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { getLeaderboardRequest } from '../requests/Requests';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

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

    const title = (
        <Box
            sx={{
                margin: 0,
                padding: 0,
                width: '100%',
                fontSize: '20px',
                lineHeight: '200%',
                fontWeight: 'bold',
                textAlign: 'center',
                background: 'white',
                color: 'black'
            }}
        >
            Daily Leaderboard
        </Box>
    );

    const leaderboard = leaderboardData.map((data) => (
        <TableRow>
            <TableCell align="right">{data.rank}.</TableCell>
            <TableCell>{data.user}</TableCell>
            <TableCell>{data.score}</TableCell>
        </TableRow>
    ));

    const table = (
        <TableContainer>
            <Table
                size="small"
                sx={{
                    '& .MuiTableCell-root': {
                        padding: '3px 8px'
                    }
                }}
            >
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
            <Button
                sx={{
                    background: '#FFFBFB',
                    color: 'black'
                }}
                onClick={() => setShowLeaderboard(true)}
            >
                <LeaderboardIcon sx={{ width: '100%', height: '100%' }} />
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
                <Box
                    sx={{
                        margin: 0,
                        padding: 0,
                        width: '100%',
                        height: '100%',
                        fontWeight: 'bold',
                        background: 'white',
                        color: 'black',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        justifyItems: 'flex-start',
                        fontSize: '10px'
                    }}
                >
                    {title}
                    {table}
                </Box>
            </Dialog>
        </>
    );
};

export default Leaderboard;
