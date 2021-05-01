import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  FormControl,
  Grid,
  FormLabel,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Radio,
  Chip,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DeleteOutline } from '@material-ui/icons';
import { useToasts } from 'react-toast-notifications';

import Loader from '../../helpers/components/Loader';
import UserComplaintFormValidator from '../utils/UserComplaintFormValidator';
import axiosInstance from '../../helpers/axiosInstance';

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: 0,
    margin: theme.spacing(2, 0),
    width: '60%',
  },
  submitBtn: {
    backgroundColor: 'green',
    color: 'white',
    '&:hover': {
      backgroundColor: '#006400',
    },
  },
  style: {
    margin: theme.spacing(1, 0),
  },
  formControl: {
    width: '100%',
  },
  chip: {
    margin: theme.spacing(0.5),
    maxWidth: '100%',
  },
}));

export default function UserComplaintForm() {
  const classes = useStyles();
  const { addToast } = useToasts();
  const history = useHistory();

  const [department, setDepartment] = useState('');
  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState([]);
  const [workType, setWorkType] = useState('');
  const [workDetails, setWorkDetails] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [otherWork, setOtherWork] = useState('');
  const [errors, setErrors] = useState({});

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (error)
      addToast(error, {
        appearance: 'error',
        autoDismiss: true,
      });
    setError(null);
  }, [error, addToast]);

  useEffect(() => {
    if (success)
      addToast(success, {
        appearance: 'success',
        autoDismiss: true,
      });
    setSuccess(null);
  }, [success,addToast]);

  const departments = [
    'Civil',
    'Computer Science and Engineering',
    'Electrical',
    'Electronics',
    'Information Technology',
    'Mechanical',
  ];

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

  const handleDeptChange = (event) => {
    setDepartment(event.target.value);
  };

  const addLocationHandler = (event) => {
    event.preventDefault();

    if (location === '') {
      setErrors({
        ...errors,
        locations: ['Enter a Location'],
      });
      return;
    }
    setLocations([...locations, location]);
    setLocation('');
    setErrors({
      ...errors,
      locations: null,
    });
  };

  const removeLocationHandler = (toBeRemoved) => {
    setLocations(locations.filter((location) => toBeRemoved !== location));
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (location !== '') {
      setErrors({
        ...errors,
        locations: ['Add or Empty the Location to Proceed'],
      });
      return;
    }

    try {
      UserComplaintFormValidator()
        .validate({
          department,
          locations,
          workType,
          workDetails,
        })
        .then(
          async () => {
            if (workType === 'Other' && otherWork === '') {
              setErrors({
                ...errors,
                otherWork: ['Enter Work Type'],
              });
              return;
            }
            setLoading(true);
            const queryData = {
              room: locations.toString(),
              department,
              workType,
              details: workDetails,
              otherWork,
              signOfStudentOrStaff: 'Signature of Student',
            };
            try {
              const result = await axiosInstance.post(
                '/api/complaint',
                queryData
              );
              if (!result.data.success) throw new Error();
              setSuccess('Complaint Forwarded to HoD');

              history.push('/ui/dashboard/student');

              resetForm();
            } catch (error) {
              setLoading(false);
              setError(error.response.data.error);
            }
          },
          (error) => {
            setErrors(error.errors);
            setLoading(false);
          }
        );
    } catch (error) {
      setLoading(false);
      setErrors(error.errors);
    }
  };

  return (
    <form className="user-complaint-form">
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Grid className={classes.style}>
            <FormControl
              className={classes.formControl}
              variant="outlined"
              error={!!errors.department}
              size="small"
            >
              <InputLabel>Department</InputLabel>
              <Select
                value={department}
                onChange={handleDeptChange}
                label="Department"
                inputProps={{
                  name: 'department',
                  id: 'outlined-department-native-simple',
                }}
              >
                {departments.map((department, index) => (
                  <MenuItem key={index} value={department}>
                    {department}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {errors.department ? errors.department[0] : ' '}
              </FormHelperText>
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
                    value={location}
                    size="small"
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
                  color="primary"
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
                  color="primary"
                  variant="outlined"
                  deleteIcon={<DeleteOutline style={{ color: 'red' }} />}
                  onDelete={() => removeLocationHandler(location)}
                />
              );
            })}
          </Grid>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid className={classes.style}>
            <FormControl component="fieldset" className={classes.formControl}>
              <Grid>
                <FormLabel component="label" error={!!errors.workType}>
                  Nature of Work
                  <Typography variant="caption">(Mark Appropriate)</Typography>
                </FormLabel>
              </Grid>
              <FormGroup>
                <Grid container>
                  <Grid item xs={6} md={3}>
                    <FormControlLabel
                      control={
                        <Radio
                          value="Electrical"
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
                          value="Plumbing"
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
                          value="Repair"
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
                          value="Furniture"
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
                          value="Other"
                          checked={workType === 'Other'}
                          onChange={handleChange}
                          name="Other"
                        />
                      }
                      label="Other"
                    />
                  </Grid>
                  {workType === 'Other' ? (
                    <Grid item xs={6} md={3}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          className={classes.style}
                          fullWidth
                          required
                          autoFocus
                          inputProps={{ 'data-testid': 'otherWork' }}
                          size="small"
                          placeholder="Describe work"
                          value={otherWork}
                          onChange={(event) => setOtherWork(event.target.value)}
                          error={!!errors.otherWork}
                          helperText={
                            errors.otherWork ? errors.otherWork[0] : ' '
                          }
                        />
                      </FormControl>
                    </Grid>
                  ) : (
                    <Grid
                      item
                      xs={6}
                      md={3}
                      style={{ marginBottom: '69px' }}
                    ></Grid>
                  )}
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
            className={[classes.button, classes.style, classes.submitBtn].join(
              ' '
            )}
            type="submit"
            size="large"
            color="secondary"
            variant="contained"
            onClick={submitHandler}
          >
            Submit
          </Button>
        </Grid>
        {isLoading ? <Loader/> : null}
      </Grid>
    </form>
  );
}
