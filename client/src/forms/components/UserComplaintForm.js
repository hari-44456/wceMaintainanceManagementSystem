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
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import UserComplaintFormValidator from '../utils/UserComplaintFormValidator';

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
    }
}));

const DisplayAlert = ({ error }) => (
  <Alert severity="error">
    <AlertTitle>{error}</AlertTitle>
  </Alert>
);

export default function UserComplaintForm() {
    const classes = useStyles();

    const [department, setDepartment] = useState('');
    const [location, setLocation] = useState('');
    const [workType, setWorkType] = useState('')
    const [workDetails, setWorkDetails] = useState('')
    const [errors, setErrors] = useState({});

    const resetForm = () => {
        setDepartment('');
        setLocation('');
        setErrors({});
    };

    const handleChange = (event) => {
        setWorkType(event.target.value);
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        try{
            UserComplaintFormValidator()
            .validate({
                department,
                location,
                workType,
                workDetails
            })
            .then(
                () => resetForm(),
                (error) => setErrors(error.errors)
            );
        }catch(error){
            setErrors(error.errors);
        }
    };

    return (
        <form className="login-form">
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Grid>
                        <FormControl className={classes.formControl}>
                            <TextField
                                className={classes.style}
                                fullWidth
                                required
                                autoFocus
                                inputProps={{ 'data-testid': 'username' }}
                                label="Department"
                                variant="outlined"
                                size="small"
                                value={department}
                                onChange={(event) => setDepartment(event.target.value)}
                                error={!!errors.department}
                                helperText={errors.department ? errors.department[0] : null}
                            />
                        </FormControl>
                    </Grid>
                    <Grid>
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
                                error={!!errors.location}
                                helperText={errors.location ? errors.location[0] : null}
                            />
                        </FormControl>
                    </Grid>
                    <Grid className={classes.style}>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component='label'>
                                Nature of Work  
                                <Typography variant="caption">
                                    (Mark Appropriate)
                                </Typography>
                            </FormLabel>
                            <FormGroup>
                                <Grid container>
                                    <Grid item xs={6} md={6}>
                                    <FormControlLabel
                                            control={
                                                <Radio
                                                    value='Electrical'
                                                    checked={workType === 'Electrical'} 
                                                    onChange={handleChange} 
                                                    name="Repair" 
                                                />
                                            }
                                            label="Electrical"
                                        />
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
                                    <Grid item xs={6} md={6}>
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
                                <Grid item xs={12} md={12}>
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
                            </FormGroup>
                        </FormControl>
                        <Typography
                            variant="subtitle2"
                            color="error"
                            data-testid="non-field-errors"
                        >
                            {errors['workType'] ? errors['workType'][0] : null}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={8}>
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
                            helperText={errors.workDetails ? errors.workDetails[0] : null}
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
