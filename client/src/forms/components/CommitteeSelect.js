import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormLabel,
  FormControl,
  FormGroup,
  Checkbox,
  Grid,
  Button,
} from '@material-ui/core/';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    borderRadius: 0,
  },
  acceptBtn: {
    backgroundColor: 'green',
    color: 'white',
    '&:hover': {
      backgroundColor: '#006400',
    },
  },
  rejectBtn: {
    backgroundColor: 'red',
    color: 'white',
    '&:hover': {
      backgroundColor: '#CD0000',
    },
  },
}));

export default function CommitteeSelect({ submitHandler, rejectHandler }) {
  const classes = useStyles();
  const [committee, setCommittee] = useState({
    Civil: false,
    Electrical: false,
    Mechanical: false,
  });

  const { Civil, Electrical, Mechanical } = committee;

  const handleChange = (event) => {
    setCommittee({ ...committee, [event.target.name]: event.target.checked });
  };

  const error = [Civil, Electrical, Mechanical].filter((v) => v).length === 0;

  return (
    <React.Fragment>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Select Committee</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={Civil} onChange={handleChange} name="Civil" />
            }
            label="Civil"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={Electrical}
                onChange={handleChange}
                name="Electrical"
              />
            }
            label="Electrical"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={Mechanical}
                onChange={handleChange}
                name="Mechanical"
              />
            }
            label="Mechanical"
          />
        </FormGroup>
        <FormHelperText error={error}>
          {error ? 'Select atleast one' : '  '}
        </FormHelperText>
      </FormControl>
      <Grid container className={classes.marginTop} spacing={1}>
        <Grid item md={4} xs={8}>
          <Button
            className={[classes.button, classes.rejectBtn].join(' ')}
            size="large"
            variant="contained"
            onClick={rejectHandler}
          >
            Reject Request
          </Button>
        </Grid>
        <Grid item md={4} xs={4}>
          <Button
            className={[classes.button, classes.acceptBtn].join(' ')}
            type="submit"
            size="large"
            variant="contained"
            onClick={() => submitHandler(committee)}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
