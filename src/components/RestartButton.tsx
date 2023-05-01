import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { getCurrentGame, getCurrentMode, Mode, setGameData, setLoading, setMode, startGame } from '../app/gameSlice';
import { useAppDispatch, useAppSelector } from '../app/Hooks';
import { IconButton } from '@mui/material';
import { getGameDataRequest } from '../app/Requests';
import '../styles/Common.css';

const RestartButton = () => {
    const dispatch = useAppDispatch();
    const game = useAppSelector(getCurrentGame);
    const mode = useAppSelector(getCurrentMode);
    const onClick = () => {
        dispatch(setLoading([true, Mode.PRACTICE]));
        getGameDataRequest(Mode.PRACTICE).then((data: any) => {
            dispatch(setGameData([data, Mode.PRACTICE]));
            dispatch(startGame(Mode.PRACTICE));
            dispatch(setLoading([false, Mode.PRACTICE]));
        });
    };

    return (
        <>
            {mode == Mode.DAILY ? (
                <></>
            ) : (
                <IconButton disabled={!game.loaded} className="icon-button" onClick={onClick}>
                    <RestartAltIcon className="icon-icon" />
                </IconButton>
            )}
        </>
    );
};

export default RestartButton;
