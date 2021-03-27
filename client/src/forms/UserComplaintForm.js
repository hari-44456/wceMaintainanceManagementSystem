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
    Checkbox,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

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
    const [elecetricalCheck, setElecetricalCheck] = useState(false);
    const [plumbingCheck, setPlumbingCheck] = useState(false);
    const [furnitureCheck, setFurnitureCheck] = useState(false);
    const [repairCheck, setRepairCheck] = useState(false)
    const [otherCheck, setOtherCheck] = useState(false)
    const [errors, setErrors] = useState({});

    const resetForm = () => {
        setDepartment('');
        setLocation('');
        setErrors({});
    };

    const handleChange = (event) => {
        switch(event.target.name){
            case 'Electrical':
                setElecetricalCheck(!elecetricalCheck)
                break;
            case 'Plumbing':
                setPlumbingCheck(!plumbingCheck);
                break;
            case 'Furniture':
                setFurnitureCheck(!furnitureCheck);
                break;
            case 'Repair':
                setRepairCheck(!repairCheck);
                break;
            default:
                setOtherCheck(!otherCheck);
                break;
        }
    }

  const submitHandler = async (event) => {
    // event.preventDefault();
    // try {
    //   LoginValidator()
    //     .validate({
    //       username: department,
    //       password,
    //     })
    //     .then(
    //       () => resetForm(),
    //       (error) => setErrors(error.errors)
    //     );

    //   const data = {
    //     username: department,
    //     password,
    //   };

    //   history.push(`/ui/dashboard/${type}`);
    // } catch (err) {
    //   try {
    //     setLoginError(err.response.data.error);
    //   } catch (error) {
    //     setLoginError('Invalid Credentials');
    //   }
    // }
  };

    return (
        <Grid>
            <form className="login-form">
                <Grid md={4} xs={12}>
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
                                    <Grid item xs={6}>
                                        <FormControlLabel
                                            control={<Checkbox checked={elecetricalCheck} onChange={handleChange} name="Electrical" />}
                                            label="Electrical"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={plumbingCheck} onChange={handleChange} name="Plumbing" />}
                                            label="Plumbing"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControlLabel
                                            control={<Checkbox checked={repairCheck} onChange={handleChange} name="Repair" />}
                                            label="Repair"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={furnitureCheck} onChange={handleChange} name="Furniture" />}
                                            label="Furniture"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox checked={otherCheck} onChange={handleChange} name="Other" />}
                                        label="Other"
                                    />
                                </Grid>
                            </FormGroup>
                        </FormControl>
                    </Grid>
                    <Typography
                        variant="subtitle2"
                        color="error"
                        data-testid="non-field-errors"
                    >
                        {errors['non_field_errors'] ? errors['non_field_errors'][0] : null}
                    </Typography>
                    <Grid container justify="center" alignItems="center">
                        <Button
                            className={[classes.button, classes.style].join(' ')}
                            type="submit"
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
        </Grid>
    );
}
