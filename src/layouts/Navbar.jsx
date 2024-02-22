import React from 'react'
import { Avatar, Box, Container, IconButton, Stack, TextField, Button } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

export default function Navbar() {
    return (
        <Box height='65px' width='100%' backgroundColor='#101418' boxShadow='0px 1px 8px #999' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
            <TextField
                id="input-with-icon-textfield"
                placeholder='Search'
                fullWidth
                sx={{
                    width: { lg: "280px", md: "100%", sm: "100%", xs: "100%" },
                    p: { lg: '0 0 0 30px', xs: '0 5px 0 5px' },

                }}

                InputProps={{
                    endAdornment: (
                        <Button sx={{ minWidth: '18px', minHeight: '18px', '&:hover': { backgroundColor: '#424242' }, color: '#8E96A1', p: '0' }}>
                            <svg viewBox="64 64 896 896" focusable="false" data-icon="search" width="25px" height="25px" fill="#8E96A1" aria-hidden="true"><path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path></svg>

                        </Button>
                    ),
                    sx: {
                        border: '1px solid #424242',
                        transition: 'all ease-in-out 0.2s',
                        '&:hover': { backgroundColor: '#424242' },
                        borderRadius: "35px",
                        backgroundColor: "#1F262E",
                        height: "35px",
                        color: '#fff',
                        fontWeight: "600",
                    },
                }}
                variant="outlined"
            />
            <Stack direction='row' alignItems='center' justifyContent='center' pr='30px'>
                <IconButton sx={{
                    transition: 'all ease-in-out 0.2s',
                    '&:hover': { backgroundColor: '#424242' }
                }}>
                    <NotificationsNoneIcon sx={{ color: '#5C9FE3' }} />
                </IconButton>
                <IconButton sx={{
                    color: '#5C9FE3',
                    transition: 'all ease-in-out 0.2s',
                    '&:hover': { backgroundColor: '#424242' }
                }}>
                    <SettingsIcon />
                </IconButton>
                <IconButton sx={{
                    transition: 'all ease-in-out 0.2s',
                    '&:hover': { backgroundColor: '#424242' }
                }}>
                    <Avatar src="/broken-image.jpg" />
                </IconButton >
            </Stack>
        </Box>
    )
}