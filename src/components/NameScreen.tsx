import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';
import { StorageKey } from '../App';
import { BLANK } from '../features/gameSlice';

const NameScreen = () => {
    const [text, setText] = useState('');
    const [initOpen, setInitOpen] = useState(true);
    const open = !localStorage.getItem(StorageKey.USERNAME) && initOpen;
    const handleClose = () => {
        if (!(text.trim() == BLANK)) {
            localStorage.setItem(StorageKey.USERNAME, text);
            setInitOpen(false);
        }
    };
    return (
        <Dialog open={open}>
            <DialogTitle
                sx={{
                    fontFamily: 'Times New Roman',
                    fontWeight: 'bold',
                    color: 'black'
                }}
            >
                Username
            </DialogTitle>
            <DialogContent>
                <DialogContentText
                    sx={{
                        fontFamily: 'Times New Roman',
                        color: 'black'
                    }}
                >
                    Enter your username to participate in the daily scoreboard ranking.
                </DialogContentText>
                <TextField
                    sx={{
                        '& .MuiInputBase-input': {
                            fontFamily: 'Times New Roman',
                            color: 'black'
                        }
                    }}
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
                <Button
                    onClick={handleClose}
                    sx={{
                        fontFamily: 'Times New Roman',
                        fontWeight: 'bold',
                        color: 'black'
                    }}
                >
                    Enter
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default NameScreen;
