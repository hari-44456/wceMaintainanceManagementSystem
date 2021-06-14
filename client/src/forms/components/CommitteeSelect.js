import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {FormLabel, FormControl, FormGroup, Checkbox} from '@material-ui/core/';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
}));

export default function CommitteeSelect() {
    const classes = useStyles();
    const [committee, setCommittee] = useState({
        civil: false,
        electrical: false,
        mechanical: false,
    });
  
    const { civil, electrical, mechanical } = committee;

    const handleChange = (event) => {
      setCommittee({ ...committee, [event.target.name]: event.target.checked });
    };
  
    const error = [civil,electrical,mechanical].filter((v) => v).length === 0;
  
    return (
        <React.Fragment>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Select Committee</FormLabel>
                <FormGroup>
                <FormControlLabel
                    control={<Checkbox checked={civil} onChange={handleChange} name="civil" />}
                    label="Civil"
                />
                <FormControlLabel
                    control={<Checkbox checked={electrical} onChange={handleChange} name="electrical" />}
                    label="Electrical"
                />
                <FormControlLabel
                    control={<Checkbox checked={mechanical} onChange={handleChange} name="mechanical" />}
                    label="Mechanical"
                />
                </FormGroup>
                <FormHelperText error={error}>
                    {
                        error
                          ?  "Select atleast one"
                          :  "  "
                    }
                </FormHelperText>
            </FormControl>
        </React.Fragment>
    );
  }
