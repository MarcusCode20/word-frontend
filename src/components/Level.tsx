import { Box, Paper } from '@mui/material';
import ScreenLetter from './ScreenLetter';
import { API_BLANK, LevelData, Status } from '../features/gameSlice';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

interface LevelProp {
    data: LevelData;
}

const Level = (prop: LevelProp) => {
    const hiddenWordArray = Array.from(prop.data.hiddenWord);
    const userInput = prop.data.userInput;
    const backgroundColour = () => {
        switch (prop.data.status) {
            case Status.ACTIVE:
                return 'white';
            case Status.CORRECT:
                return '#4CAF50'; //Green
            case Status.SKIPPED:
                return '#858786'; //Grey
            case Status.LOCKED:
                return 'white';
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
            <Box
                sx={{
                    //CSS for itself
                    height: '100%',
                    margin: '0 2%',
                    display: 'flex',
                    //CSS for children
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <LockOutlinedIcon></LockOutlinedIcon>
            </Box>
        ) : (
            <Box
                sx={{
                    //CSS for itself
                    height: '100%',
                    margin: '0 2%',
                    display: 'flex',
                    //CSS for children
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    columnGap: '3%'
                }}
            >
                {generateLetters(hiddenWordArray)}
            </Box>
        );

    return (
        <Paper
            sx={{
                margin: '0px 1%',
                padding: '0px',
                height: '15%',
                background: backgroundColour
            }}
            variant="outlined"
        >
            {display}
        </Paper>
    );
};

export default Level;
