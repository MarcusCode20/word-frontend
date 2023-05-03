import { Box, Paper } from '@mui/material';
import ScreenLetter from './ScreenLetter';
import { API_BLANK, LevelData, Status } from '../../app/gameSlice';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import '../../styles/Level.css';

interface LevelProp {
    data: LevelData;
}

const Level = (prop: LevelProp) => {
    const hiddenWordArray = Array.from(prop.data.hiddenWord);
    const userInput = prop.data.userInput;
    const backgroundColour = () => {
        switch (prop.data.status) {
            case Status.ACTIVE:
                return '#FFFBFB'; //Grey
            case Status.CORRECT:
                return '#4CAF50'; //Green
            case Status.SKIPPED:
                return '#D7263D'; //Red
            case Status.LOCKED:
                return '#DDDDDD'; //Grey
        }
    };
    //Generate the letters to be shown on screen
    const generateLetters = (wordArray: string[]) => {
        const letters: JSX.Element[] = [];

        for (let i = 0, j = 0; i < wordArray.length; i++) {
            if (wordArray[i] == API_BLANK) {
                //If blank then refence the redux array, allowing the value to be rendered again
                //when a user action takes place, like typing.
                letters.push(
                    <ScreenLetter key={i} isInput={true}>
                        {userInput[j++]}
                    </ScreenLetter>
                );
            } else {
                letters.push(
                    <ScreenLetter key={i} isInput={false}>
                        {wordArray[i]}
                    </ScreenLetter>
                );
            }
        }

        return letters;
    };

    const display =
        prop.data.status == Status.LOCKED ? (
            <Box className="level-locked">
                <LockOutlinedIcon></LockOutlinedIcon>
            </Box>
        ) : (
            <Box className="level-unlocked">{generateLetters(hiddenWordArray)}</Box>
        );

    return (
        <Paper
            //Can't use class names on Paper...only Box...
            className="level-container"
            sx={{
                background: backgroundColour,
                '&.MuiPaper-root': {
                    border: 'solid',
                    borderWidth: 'thin',
                    borderRadius: '10px',
                    borderColor: '#858786'
                }
            }}
            elevation={0}
        >
            {display}
        </Paper>
    );
};

export default Level;
