import { Box, Button } from '@mui/material';
import { checkUserWord, skipLevel, addLetter, removeLetter } from '../../app/gameSlice';
import { useAppDispatch } from '../../app/Hooks';
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import '../../styles/Keyboard.css';
import { useEffect } from 'react';

const Keyboard = () => {
    const dispatch = useAppDispatch();

    const skipLevelCallBack = () => {
        dispatch(skipLevel());
    };
    const addLetterCallback = (letter: string) => () => {
        dispatch(addLetter(letter));
    };
    const removeLetterCallback = () => {
        dispatch(removeLetter());
    };
    const checkUserWordCallback = () => {
        dispatch(checkUserWord());
    };

    const rowOne = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    const rowTwo = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    const rowThree = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

    const goButton = (
        <Button className="keyboard-button" onClick={checkUserWordCallback}>
            <DoneOutlineRoundedIcon />
        </Button>
    );

    const skipButton = (
        <Button className="keyboard-button" onClick={skipLevelCallBack}>
            <SkipNextRoundedIcon />
        </Button>
    );

    const backButton = (
        <Button className="keyboard-button" onClick={removeLetterCallback}>
            <BackspaceRoundedIcon />
        </Button>
    );

    const groupComps = (row: string[]) => {
        return row.map((letter) => (
            <Button className="keyboard-button" key={letter} onClick={addLetterCallback(letter)}>
                {letter}
            </Button>
        ));
    };

    const toRow = (comps: JSX.Element[]) => {
        return <Box className="keyboard-row">{comps}</Box>;
    };

    const rows = [
        toRow(groupComps(rowOne)),
        toRow(groupComps(rowTwo)),
        toRow([skipButton, ...groupComps(rowThree), backButton, goButton])
    ];

    const addDesktopKeyboard = () => {
        const allLetters = [...rowOne, ...rowTwo, ...rowThree];
        addEventListener('keydown', (event: KeyboardEvent) => {
            const symbolPressed = event.key.toUpperCase();
            const index = allLetters.indexOf(symbolPressed);
            if (index >= 0) {
                const letter = allLetters[index];
                addLetterCallback(letter)();
            } else if (symbolPressed == 'BACKSPACE') {
                removeLetterCallback();
            } else if (symbolPressed == 'ENTER') {
                checkUserWordCallback();
            } else if (symbolPressed == '-') {
                skipLevelCallBack();
            }
        });
    };
    useEffect(addDesktopKeyboard, []);

    return <Box className="keyboard-container">{rows}</Box>;
};

export default Keyboard;
