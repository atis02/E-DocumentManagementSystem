import React, { useState } from 'react'
import { Box, Button, Divider, Select, Stack, Typography } from '@mui/material'
import { dbDoc } from '../../Components/db/dbDocuments.mjs'
import { NavLink } from 'react-router-dom';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';

export default function OutDocuments() {

    const [open, setOpen] = useState(null)

    const handleOpen = (id) => {
        setOpen(id === open ? null : id)
    }
    return (
        <Box height='100%' width='100%' >
            <Stack p='20px'>
                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                    <Typography fontSize='30px' mb='10px' fontWeight='600'>Out</Typography>
                    <Button>Sort by</Button>
                </Stack>
                <Divider />
                <Stack p='15px' spacing={2} mt='30px'>
                    {dbDoc.map((item) => (
                        <Stack key={item.id} onClick={() => { localStorage.setItem('document', JSON.stringify([item])) }} style={{ color: '#000', textDecoration: 'none', justifyContent: 'space-between', display: 'flex' }}>
                            <Stack spacing={3} direction='row' alignItems='center'>
                                <NavLink to={`/document/${item.name}/${item.id}`} style={{ color: '#000', gap: '20px', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                                    <img style={{ width: '60px', height: '60px' }} src={
                                        item.file_type === 'doc' ? 'https://upload.wikimedia.org/wikipedia/commons/f/fb/.docx_icon.svg' :
                                            item.file_type === 'pptx' ? 'https://upload.wikimedia.org/wikipedia/commons/1/16/Microsoft_PowerPoint_2013-2019_logo.svg' :
                                                item.file_type === 'xlsx' ? 'https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg' :
                                                    'https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg'
                                    } alt="" />
                                    <Typography minWidth='100px' textAlign='start'>{item.name}</Typography>
                                    <Typography minWidth='100px' textAlign='start'>Date: {item.send_date}</Typography>
                                    <Typography minWidth='100px' textAlign='start'>Date: {item.send_date}</Typography>

                                </NavLink>
                                <Button>
                                    SEND to
                                    <ForwardToInboxIcon sx={{ ml: '10px' }} />
                                </Button>
                                <Button onClick={() => handleOpen(item.id)}>
                                    Open
                                </Button>
                            </Stack>
                            {open === item.id && (
                                <Stack width='90%' mt='20px' direction='row' alignItems='center' ml='70px'>
                                    <iframe src={item.file_link} style={{ border: 'none', width: '100%', height: '85vh' }} ></iframe>
                                </Stack>
                            )}
                            <Divider />
                        </Stack>
                    ))}
                </Stack>
            </Stack>
        </Box>
    )
}
