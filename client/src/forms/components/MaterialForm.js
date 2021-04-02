import React,{useState} from 'react';
import { FormControl, 
    Grid, 
    TextField, 
    Typography, 
    Button, 
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        borderRadius: 0,
    },
    formControl: {
        width: '100%',
    },
    costInput: {
        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
          "-webkit-appearance": "none",
          margin: 0
        }
    },
}));

export default function MaterialForm({ type, submitHandler}){
    const classes = useStyles();

    const [storeMaterial, setstoreMaterial] = useState('');
    const [approxCost, setApproxCost] = useState(0);

    const addHandler = (event) => {
        submitHandler(storeMaterial,approxCost);
        event.preventDefault();
    }

    return(
        <form>
            <Grid container spacing={2}>
                <Grid item md={5} xs={12}>
                    <FormControl className={classes.formControl}>
                        <TextField
                            fullWidth
                            required
                            autoFocus
                            inputProps={{ 'data-testid': 'material' }}
                            label="Material Issued"
                            size="small"
                            value={storeMaterial}
                            onChange={(event) => setstoreMaterial(event.target.value)}
                            // error={!!errors.department}
                            // helperText={errors.department ? errors.department[0] : null}
                        />
                    </FormControl>
                </Grid>
                <Grid item md={5} xs={12}>
                    <FormControl className = {classes.formControl}>
                        <TextField
                            className={classes.costInput}
                            type='number'
                            fullWidth
                            required
                            autoFocus
                            inputProps={{ 'data-testid': 'cost' }}
                            label="Approx Cost"
                            size="small"
                            value={approxCost}
                            onChange={(event) => setApproxCost(event.target.value)}
                            // error={!!errors.department}
                            // helperText={errors.department ? errors.department[0] : null}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <Button
                        className={classes.button}
                        type="submit"
                        fullWidth
                        size="large"
                        color="secondary"
                        variant="contained"
                        onClick={addHandler}
                    >
                        Add
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}