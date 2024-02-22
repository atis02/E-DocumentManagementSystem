import React, { useState } from 'react'
import { Box, Button, Container, IconButton, Stack, Typography } from '@mui/material'
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { MenuItem, Menu, Sidebar, SubMenu, sidebarClasses } from 'react-pro-sidebar'
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Link, NavLink } from 'react-router-dom'
import EmailIcon from '@mui/icons-material/Email';

export default function SidebarNav() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open)
    }
    return (
        < >
            <Box >
                <Sidebar rootStyles={{
                    [`.${sidebarClasses.container}`]: {
                        backgroundColor: '#101418',
                        color: '#F3F3F4',
                        // ':&hover': { backgroundColor: 'red' }
                        // position: 'absolute',
                        // zIndex: '200'

                    },
                }} style={{ height: '100%', ...open ? { minWidth: '250px', width: '250px' } : { width: '80px', minWidth: '0px' }, border: 'none', alignItems: 'center', direction: 'column', justifyContent: 'center' }}>
                    <Stack sx={{ ...open ? '' : { flexDirection: 'column' } }} height='54px' direction='row' alignItems='center' justifyContent='center' m='30px 30px'>
                        <Link style={{ textDecoration: 'none' }} to='/'><Typography color='#F3F3F4' fontWeight='700' sx={{ ...open ? { fontSize: '30px' } : { fontSize: '18px' } }} textAlign='center' >EDM system</Typography></Link>
                        <IconButton sx={{ color: '#F3F3F4', ...open ? '' : { width: '30px', height: '30px', backgroundColor: '#1c1c1c' } }} onClick={handleOpen}> <MenuOpenIcon /></IconButton>
                    </Stack>
                    <Menu
                        menuItemStyles={{
                            button: ({ level, active }) => {
                                if (level === 0)
                                    return {
                                        backgroundColor: active ? '#1c1c1c' : undefined,
                                        '&:hover': { backgroundColor: '#333333' }

                                    }
                            },
                        }}
                    >
                        <MenuItem component={<NavLink className='sideNav' to='/' />} icon={<DashboardIcon />}>{open ? 'Dashboard' : ''}</MenuItem>
                        {open ? (
                            <>
                                <SubMenu label='Documents' className='sideNav' icon={<EmailIcon />} >
                                    <MenuItem icon={<ArchiveIcon />} component={<NavLink className='sideNav2' to='/document/inbox' />}>
                                        Income
                                    </MenuItem>
                                    <MenuItem icon={<UnarchiveIcon />} component={<NavLink className='sideNav2' to='/document/out' />}  >
                                        Outgoing
                                    </MenuItem>
                                </SubMenu>
                            </>
                        ) : (
                            <>
                                <MenuItem component={<NavLink className='sideNav' to='/document/inbox' />} icon={<ArchiveIcon />}>
                                </MenuItem>
                                <MenuItem component={<NavLink className='sideNav' to='/document/out' />} icon={<UnarchiveIcon />} >
                                </MenuItem>
                            </>
                        )}
                        <MenuItem component={<NavLink className='sideNav' to='/new' />} icon={<NoteAddIcon />} >{open ? 'New  Document' : ''}</MenuItem>
                        <MenuItem component={<NavLink className='sideNav' to='/account' />} icon={<AccountCircleIcon />} >{open ? 'Profile' : ''}</MenuItem>
                    </Menu>
                </Sidebar >
            </Box >

        </>
    )
}
