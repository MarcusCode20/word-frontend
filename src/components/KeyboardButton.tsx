import Button from '@mui/material/Button';
import { PropsWithChildren } from 'react';
import Letter from './Letter';

interface KeyboardButtonProp {
    letter: string;
    onClick: () => void;
}

const KeyboardButton = (prop: PropsWithChildren<KeyboardButtonProp>) => {
    return (
        <Button sx={{ margin: 0 }} variant="outlined" onClick={prop.onClick}>
            <Letter>{prop.letter}</Letter>
        </Button>
    );
};

export default KeyboardButton;
