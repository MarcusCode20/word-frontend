import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { getCurrentMode, Mode, setGameData, setMode, startGame } from '../app/gameSlice';
import { useAppDispatch, useAppSelector } from '../app/Hooks';
import { Button } from '@mui/material';
import { getGameDataRequest } from '../app/Requests';
import '../styles/Common.css';

const RestartButton = () => {
    const dispatch = useAppDispatch();
    const mode = useAppSelector(getCurrentMode);
    const disable = mode == Mode.DAILY;
    const onClick = () => {
        getGameDataRequest(Mode.PRACTICE).then((data: any) => {
            dispatch(setGameData([data, Mode.PRACTICE]));
            dispatch(startGame());
        });
    };

    return (
        <Button disabled={disable} className="icon-button" onClick={onClick}>
            <RestartAltIcon className="icon-icon" />
        </Button>
    );
};

export default RestartButton;
