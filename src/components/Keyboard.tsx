import { Box, Button } from '@mui/material';
import { checkUserWord, skipLevel, addLetter, removeLetter } from '../features/gameSlice';
import { useAppDispatch } from '../app/hooks';
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';

const KeyboardCss = {
    margin: '0 auto 0 auto',
    width: '100%',
    maxWidth: '750px',
    backgroundColor: 'green',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch'
};

const KeyboardRowCss = {
    margin: '0px',
    height: '30%',
    backgroundColor: 'orange',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
};

const keyboardButtonCss = {
    textAlign: 'center',
    lineHeight: '100%',
    maxHeight: '50px',
    margin: '0px',
    fontWeight: 'bold',
    fontSize: '40px',
    userSelect: 'none',
    width: '40px',
    height: '40px'
};

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
        <Button onClick={checkUserWordCallback}>
            <DoneOutlineRoundedIcon sx={keyboardButtonCss} />
        </Button>
    );

    const skipButton = (
        <Button onClick={skipLevelCallBack}>
            <SkipNextRoundedIcon sx={keyboardButtonCss} />
        </Button>
    );

    const backButton = (
        <Button onClick={removeLetterCallback}>
            <BackspaceRoundedIcon sx={keyboardButtonCss} />
        </Button>
    );

    const groupComps = (row: string[]) => {
        return row.map((letter) => (
            <Button key={letter} onClick={addLetterCallback(letter)}>
                <Box sx={keyboardButtonCss}>{letter}</Box>
            </Button>
        ));
    };

    const toRow = (comps: JSX.Element[]) => {
        return <Box sx={KeyboardRowCss}>{comps}</Box>;
    };

    const rows = [
        toRow(groupComps(rowOne)),
        toRow(groupComps(rowTwo)),
        toRow([goButton, ...groupComps(rowThree), backButton, skipButton])
    ];

    return <Box sx={KeyboardCss}>{rows}</Box>;
};

export default Keyboard;
