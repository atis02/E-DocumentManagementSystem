import React, { useState } from 'react'
import { MenuItem, Box, Button, Divider, FormControl, InputLabel, Select, Stack, Typography, TextField } from '@mui/material'

export default function NewDocument() {
    const [type, setType] = useState('');

    const handleChange = (event) => {
        setType(event.target.value);
    };
    return (
        <Box height='100%' width='100%'>
            <Stack p='20px' >
                <Typography fontSize='30px' fontWeight='600'>New Document</Typography>
                <Stack mt='30px' width='55%' spacing={2}>
                    <Stack>
                        <Typography fontSize='24px' color='gray' fontWeight='600'>Main Information</Typography>
                        <Divider />
                    </Stack>
                    <Stack direction='row' alignItems='center' spacing={2}>
                        <Typography width='30%' textAlign='end'>Type of Document:</Typography>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Type of Document</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={type}
                                label="Type of Document"
                                onChange={handleChange}
                            >
                                <MenuItem value='Arza'>Arza</MenuItem>
                                <MenuItem value='Şertnama'>Şertnama</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack direction='row' alignItems='center' spacing={2}>
                        <Typography width='30%' textAlign='end'>From:</Typography>
                        <TextField fullWidth id="outlined-basic" label="From" variant="outlined" />
                    </Stack>
                    <Stack direction='row' alignItems='center' spacing={2}>
                        <Typography width='30%' textAlign='end'>Signed by:</Typography>
                        {/* <DatePicker label="Basic date picker" /> */}
                        <TextField fullWidth id="outlined-basic" label="Signed by" variant="outlined" />
                    </Stack>
                    <Stack direction='row' alignItems='center' spacing={2}>
                        <Typography width='30%' textAlign='end'>Profession:</Typography>
                        {/* <DatePicker label="Basic date picker" /> */}
                    </Stack>
                    <Divider />
                    <Stack direction='row' alignItems='center' spacing={2}>
                        <Typography width='30%' textAlign='end'>Description:</Typography>
                        {/* <DatePicker label="Basic date picker" /> */}
                        <TextField fullWidth id="outlined-basic" rows={4} multiline
                            label="Description" variant="outlined" />
                    </Stack>
                </Stack>

            </Stack>
        </Box>
    )
}
