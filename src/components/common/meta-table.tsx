import { TableBody, TableRow, TableCell } from '@mui/material';

interface MetaTableProp {
    data: KeyValue[];
}

interface KeyValue {
    key: string;
    value: string | number;
}

const MetaTable = (prop: MetaTableProp) => {
    const data = prop.data.map((entry) => {
        return (
            <TableRow>
                <TableCell sx={{ width: '40%' }}>{entry.key}</TableCell>
                <TableCell sx={{ width: '40%' }}>{entry.value}</TableCell>
            </TableRow>
        );
    });

    return <TableBody className="leaderboard-metatable">{data}</TableBody>;
};

export default MetaTable;
