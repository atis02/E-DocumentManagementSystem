import { Box, Stack } from '@mui/material'
import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
// import Login from './Login'

export default function LandingPageLayout() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Stack direction='column' minHeight='100vh' width='100%'  >
                <Navbar />
                <Outlet />
            </Stack>
        </Box>
    )
}
