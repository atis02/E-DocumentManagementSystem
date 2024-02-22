import { Box, Stack, Typography, Button, Stepper, Step, StepLabel, StepContent, Paper, IconButton, TextField, FormControl } from '@mui/material'
import React, { useState, useRef } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import SelectInput from '@mui/material/Select/SelectInput';


const DocumentDetail = ({ ...props }) => {

    const [open, setOpen] = useState(null)
    const [values, setValues] = useState('admin')
    const [stepUser, setStepUser] = useState([values])
    const [data, setData] = useState(() => JSON.parse(localStorage.getItem('document') || '[]'))
    const [activeStep, setActiveStep] = useState(0)


    const { name, id } = useParams()
    const editorRef = useRef();

    const handleOpen = (index) => {
        setOpen(index === open ? null : index)
    }

    const handleNext = (index) => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    // console.log(stepUser.map((item) => item));
    const handleChange = (e) => {
        setValues(e.target.value)

    }
    const handleAddStep = (e) => {
        e.preventDefault()
        setStepUser([...stepUser, values])
        setValues('')
        setOpen(false)
        console.log(stepUser);
    }
    return (
        <Box height='100%' width='100%'>
            <Stack p='20px'>
                <Typography fontSize='30px' fontWeight='600'>Document</Typography>
                <Typography>{name} / {id}</Typography>
            </Stack>
            <Stack p='15px' spacing={2}>
                {data.map((item) => (
                    <Stack key={item.id} direction='row' justifyContent='space-between'>
                        <Stack direction='column' mr='15px'>

                            <Stack spacing={3} direction='row' alignItems='center'>
                                <img style={{ width: '60px', height: '60px' }} src={
                                    item.file_type === 'doc' ? 'https://upload.wikimedia.org/wikipedia/commons/f/fb/.docx_icon.svg' :
                                        item.file_type === 'pptx' ? 'https://upload.wikimedia.org/wikipedia/commons/1/16/Microsoft_PowerPoint_2013-2019_logo.svg' :
                                            item.file_type === 'xls' ? 'https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg' :
                                                'https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg'
                                } alt="" />
                                <Typography minWidth='100px' textAlign='start'>{item.name}</Typography>

                                <Button>
                                    SEND to
                                    <ForwardToInboxIcon sx={{ ml: '10px' }} />
                                </Button>
                                <Button>
                                    <NavLink to='/docs/Ikramow Atamyrat ylmy iş Täze.docx' target='_blank' style={{ textDecoration: 'none' }}>
                                        Source Link
                                    </NavLink>
                                </Button>
                            </Stack>
                            <Stack mt={5} spacing={3}>
                                <Typography minWidth='100px' textAlign='start'><span style={{ color: 'gray' }}>Send date</span> : {item.send_date}</Typography>
                                <Typography minWidth='100px' textAlign='start'><span style={{ color: 'gray' }}>Sender </span> : O.Orazow ({item.sender})</Typography>
                                <Typography minWidth='100px' textAlign='start'><span style={{ color: 'gray' }}>Limit days</span> :({item.limit_date})</Typography>
                                <Typography minWidth='100px' textAlign='start'><span style={{ color: 'gray' }}>Description</span> : {item.description}</Typography>
                            </Stack>
                            <Box sx={{ maxWidth: 400, mt: '30px' }}>
                                <Stepper activeStep={activeStep} orientation="vertical">

                                    {stepUser.map((step, index) => (
                                        <Step key={step}>
                                            <StepLabel>
                                                {step}
                                            </StepLabel>
                                            <StepContent>
                                                <Stack spacing={2} direction='row' color='gray'>
                                                    <Typography>Send date:</Typography>
                                                    <Typography>
                                                        {new Date().getDate()}.{new Date().getMonth() + 1}.{new Date().getFullYear()}
                                                    </Typography>
                                                    <Typography>
                                                        {new Date().getHours()}:{new Date().getMinutes()}
                                                    </Typography>
                                                </Stack>
                                                <Box sx={{ mb: 2 }}>
                                                    <Button
                                                        variant="contained"
                                                        onClick={() => handleNext(index)}
                                                        sx={{ mt: 1, mr: 1 }}
                                                    >
                                                        Send
                                                    </Button>
                                                    <Button
                                                        disabled={index === 0}
                                                        onClick={handleBack}
                                                        sx={{ mt: 1, mr: 1 }}
                                                    >
                                                        Back
                                                    </Button>
                                                </Box>
                                            </StepContent>
                                        </Step>

                                    ))}
                                    {open ? (

                                        <form onSubmit={handleAddStep}>
                                            <TextField fullWidth name='user_name' onChange={handleChange} id="outlined-basic" label="Id" variant="outlined" />
                                            <TextField fullWidth name='description' onChange={handleChange} id="outlined-basic" label="Description" variant="outlined" />
                                            <Button type='submit'>Add Person</Button>
                                        </form>
                                    ) : ''}
                                    <Button onClick={() => setOpen(true)}>
                                        <AddCircleIcon />  Add User
                                    </Button>
                                </Stepper>
                                {activeStep === stepUser.length && (
                                    <Paper square elevation={0} sx={{ p: 3 }}>
                                        <Typography>All steps completed - you&apos;re finished</Typography>
                                        <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                                            Reset
                                        </Button>
                                    </Paper>
                                )}
                            </Box>
                        </Stack>
                        <Stack width='90%' >

                            <iframe src={item.file_link} style={{ border: 'none', width: '100%', height: '85vh' }} ></iframe>

                            {/* <iframe src={item.file_link} style={{ border: 'none', width: '100%', height: '150vh' }} ></iframe> */}
                        </Stack>
                    </Stack>
                ))}
            </Stack>
        </Box>
    )
}

export default DocumentDetail;