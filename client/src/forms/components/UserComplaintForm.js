import React, { useState } from 'react';
import {
    Button,
    TextField,
    Typography,
    FormControl,
    Grid,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Radio,
    Chip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UserComplaintFormValidator from '../utils/UserComplaintFormValidator';
import { DeleteOutline } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    button: {
        borderRadius: 0,
        margin: theme.spacing(2, 0),
    },
    style: {
        margin: theme.spacing(1, 0),
    },
    formControl: {
        width: '100%',
    },
    chip: {
        margin: theme.spacing(0.5),
        maxWidth: '100%'
    },
}));

export default function UserComplaintForm() {
    const classes = useStyles();

    const [department, setDepartment] = useState('');
    const [location, setLocation] = useState('');
    const [locations, setLocations] = useState([]);
    const [workType, setWorkType] = useState('');
    const [workDetails, setWorkDetails] = useState('');
    const [otherWork, setOtherWork] = useState('');
    const [errors, setErrors] = useState({});

    const resetForm = () => {
        setDepartment('');
        setLocation('');
        setWorkType('');
        setWorkDetails('');
        setOtherWork('');
        setLocations([]);
        setErrors({});
    };

    const handleChange = (event) => {
        setWorkType(event.target.value);
    };

    const addLocationHandler = (event) => {
        event.preventDefault();

        if(location === ''){
            setErrors({
                ...errors,
                locations: ['Enter a Location'],
            });
            return;
        }
        setLocations([
            ...locations ,
            location,
        ])
        setLocation('');
        setErrors({
            ...errors,
            locations: null,
        })
    };

    const removeLocationHandler = (toBeRemoved) => {
        setLocations(locations.filter(location => toBeRemoved!==location));
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if(location !== ''){
            setErrors({
                ...errors,
                locations: ['Add or Empty the Location to Proceed']
            })
            return;
        }

        try{
            UserComplaintFormValidator()
            .validate({
                department,
                locations,
                workType,
                workDetails
            })
            .then(() => {
                if(workType === 'Other' && otherWork === ''){
                    setErrors({
                        ...errors,
                        otherWork: ['Enter Work Type']
                    })
                    return;
                }
                resetForm();
            }, (error) => setErrors(error.errors)
            );
        }catch(error){
            setErrors(error.errors);
        }
    };

    return (
        <form className="user-complaint-form">
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Grid>
                        <FormControl className={classes.formControl}>
                            <TextField
                                className={classes.style}
                                fullWidth
                                required
                                autoFocus
                                inputProps={{ 'data-testid': 'department' }}
                                label="Department"
                                variant="outlined"
                                size="small"
                                value={department}
                                onChange={(event) => setDepartment(event.target.value)}
                                error={!!errors.department}
                                helperText={errors.department ? errors.department[0] : ' '}
                            />
                        </FormControl>
                    </Grid>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item md={8} xs={8}>
                                <FormControl className={classes.formControl}>
                                    <TextField
                                        className={classes.style}
                                        fullWidth
                                        required
                                        autoFocus
                                        inputProps={{ 'data-testid': 'location' }}
                                        label="Room/Location"
                                        variant="outlined"
                                        size="small"
                                        value={location}
                                        onChange={(event) => setLocation(event.target.value)}
                                        error={!!errors.locations}
                                        helperText={errors.locations ? errors.locations[0] : ' '}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item md={4} xs={4}>
                                <Button
                                    className={[classes.button, classes.style].join(' ')}
                                    fullWidth
                                    type="submit"
                                    color='primary'
                                    variant="contained"
                                    onClick={addLocationHandler}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    <Grid>
                        {locations.map((location, index) => {
                            return (
                                <Chip 
                                    key={index} 
                                    className={classes.chip}
                                    label={location}
                                    color='primary'
                                    variant='outlined'
                                    deleteIcon={<DeleteOutline style={{color: 'red'}} />}
                                    onDelete={() => removeLocationHandler(location)}
                                />
                            )
                        })}
                    </Grid>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Grid className={classes.style}>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <Grid>
                                <FormLabel component='label' error={!!errors.workType}>
                                    Nature of Work  
                                    <Typography variant="caption">
                                        (Mark Appropriate)
                                    </Typography>
                                </FormLabel>
                            </Grid>
                            <FormGroup>
                                <Grid container>
                                    <Grid item xs={6} md={3}>
                                        <FormControlLabel
                                            control={
                                                <Radio
                                                    value='Electrical'
                                                    checked={workType === 'Electrical'} 
                                                    onChange={handleChange} 
                                                    name="Electrical" 
                                                />
                                            }
                                            label="Electrical"
                                        />
                                    </Grid>
                                    <Grid item xs={6} md={3}>
                                        <FormControlLabel
                                            control={
                                                <Radio
                                                    value='Plumbing'
                                                    checked={workType === 'Plumbing'} 
                                                    onChange={handleChange} 
                                                    name="Plumbing" 
                                                />
                                            }
                                            label="Plumbing"
                                        />
                                    </Grid>
                                    <Grid item xs={6} md={3}>
                                        <FormControlLabel
                                            control={
                                                <Radio
                                                    value='Repair'
                                                    checked={workType === 'Repair'} 
                                                    onChange={handleChange} 
                                                    name="Repair" 
                                                />
                                            }
                                            label="Repair"
                                        />
                                    </Grid>
                                    <Grid item xs={6} md={3}>
                                        <FormControlLabel
                                            control={
                                                <Radio
                                                    value='Furniture'
                                                    checked={workType === 'Furniture'} 
                                                    onChange={handleChange} 
                                                    name="Furniture" 
                                                />
                                            }
                                            label="Furniture"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={6} md={3}>
                                        <FormControlLabel
                                            control={
                                                <Radio
                                                    value='Other'
                                                    checked={workType === 'Other'} 
                                                    onChange={handleChange} 
                                                    name="Other" 
                                                />
                                            }
                                            label="Other"
                                        />
                                    </Grid>
                                    { workType === 'Other'
                                        ?   (<Grid item xs={6} md={3}>
                                                <FormControl className={classes.formControl}>
                                                    <TextField
                                                        className={classes.style}
                                                        fullWidth
                                                        required
                                                        autoFocus
                                                        inputProps={{ 'data-testid': 'otherWork' }}
                                                        size="small"
                                                        placeholder='Describe work'
                                                        value={otherWork}
                                                        onChange={(event) => setOtherWork(event.target.value)}
                                                        error={!!errors.otherWork}
                                                        helperText={errors.otherWork ? errors.otherWork[0] : ' '}
                                                    />
                                                </FormControl>
                                            </Grid>)
                                        : (<Grid item xs={6} md={3} style={{marginBottom: '69px'}}></Grid>)
                                    }
                                </Grid>
                            </FormGroup>
                        </FormControl>
                    </Grid>
                    <FormControl className={classes.formControl}>
                        <TextField
                            className={classes.style}
                            fullWidth
                            multiline
                            rows={4}
                            rowsMax={4}
                            variant="outlined"
                            label="Details of Work"
                            size="small"
                            value={workDetails}
                            onChange={(event) => setWorkDetails(event.target.value)}
                            error={!!errors.workDetails}
                            helperText={errors.workDetails ? errors.workDetails[0] : ' '}
                        />
                    </FormControl>
                </Grid>
                <Grid container justify="center" alignItems="center">
                    <Button
                        className={[classes.button, classes.style].join(' ')}
                        type="submit"
                        fullWidth
                        size="large"
                        color="secondary"
                        variant="contained"
                        onClick={submitHandler}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}
