import Button from '@mui/material/Button';
import { PropsWithChildren } from 'react';
import Letter from './Letter';
import { addLetter, validateInput, removeLetter } from '../features/gameSlice';
import { useAppDispatch } from '../app/hooks';

interface KeyboardGoButtonProp {
    letter: string;
}

const KeyboardGoButton = (prop: PropsWithChildren<KeyboardGoButtonProp>) => {
    const dispatch = useAppDispatch();

    const sendLetter = () => {
        if (prop.letter == '#') {
            dispatch(validateInput());
        } else if (prop.letter == '@') {
            dispatch(removeLetter());
        } else {
            dispatch(addLetter(prop.letter));
        }
    };

    return (
        <Button sx={{ margin: 0 }} variant="outlined" onClick={sendLetter}>
            <Letter>{prop.letter}</Letter>
        </Button>
    );
};

export default KeyboardGoButton;
