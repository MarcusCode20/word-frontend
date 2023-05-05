import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';
import { BLANK } from '../app/gameSlice';
import { StorageKey, StorageWrapper } from '../app/storageWrapper';

const NameScreen = () => {
    const [text, setText] = useState('');
    const [initOpen, setInitOpen] = useState(true);
    const open = !StorageWrapper.getItem(StorageKey.USERNAME) && initOpen;
    const handleClose = () => {
        if (!(text.trim() == BLANK)) {
            StorageWrapper.setItem(StorageKey.USERNAME, text);
            setInitOpen(false);
        }
    };
    return (
        <Dialog open={open}>
            <DialogTitle>Welcome To Guess Different!</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter your username to participate in the daily scoreboard ranking.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="username"
                    label="Username"
                    fullWidth
                    variant="standard"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Enter</Button>
            </DialogActions>
        </Dialog>
    );
};

export default NameScreen;
