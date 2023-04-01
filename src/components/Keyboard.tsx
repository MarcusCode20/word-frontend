import { Box, Button } from '@mui/material';
import { checkUserWord, skipLevel, addLetter, removeLetter } from '../features/gameSlice';
import { useAppDispatch } from '../app/hooks';
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';

const KeyboardCss = {
    //CSS for itself
    flexGrow: '1',
    margin: '0 auto 0 auto',
    width: '100%',
    maxWidth: '580px',
    maxHeight: '200px',
    backgroundColor: 'blue',
    //CSS for its children
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch'
};

const KeyboardRowCss = {
    //CSS for itself
    flexGrow: '1',
    margin: '0px',
    backgroundColor: 'orange',
    //CSS for its children
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
};

const keyboardButtonCss = {
    //CSS for itself
    //CSS for sizing
    //TODO: Make button size relative
    margin: '0px',
    padding: '0px',
    minWidth: '55px',
    lineHeight: '100%',
    fontSize: '30px',
    //CSS for styling
    fontWeight: 'bold',
    textAlign: 'center'
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
        <Button sx={keyboardButtonCss} onClick={checkUserWordCallback}>
            <DoneOutlineRoundedIcon />
        </Button>
    );

    const skipButton = (
        <Button sx={keyboardButtonCss} onClick={skipLevelCallBack}>
            <SkipNextRoundedIcon />
        </Button>
    );

    const backButton = (
        <Button sx={keyboardButtonCss} onClick={removeLetterCallback}>
            <BackspaceRoundedIcon />
        </Button>
    );

    const groupComps = (row: string[]) => {
        return row.map((letter) => (
            <Button sx={keyboardButtonCss} key={letter} onClick={addLetterCallback(letter)}>
                {letter}
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
