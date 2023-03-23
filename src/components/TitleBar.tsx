import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import React from 'react'

const TitleBar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    component="div"
                    align="center"
                    sx={{
                        flexGrow: 1,
                        fontWeight: 'bold',
                        '@media (max-width:400px) and (max-height:800px)': {
                            fontSize: '13px',
                        },
                    }}
                >
                    InAMinute
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default TitleBar
