import React,{useState} from 'react';
import { FormControl, 
    Grid, 
    TextField, 
    Button, 
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import MaterialFormValidator from '../utils/MaterialFormValidator';

const useStyles = makeStyles(() => ({
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

export default function MaterialForm({ submitHandler}){
    const classes = useStyles();

    const [material, setMaterial] = useState('');
    const [approxCost, setApproxCost] = useState(0);
    const [errors, setErrors] = useState({});

    const resetForm = () => {
        setMaterial('');
        setApproxCost(0);
    }

    const addHandler = (event) => {
        event.preventDefault();
        try{
            MaterialFormValidator()
            .validate({
                material,
                approxCost
            })
            .then(() => {
                submitHandler(material,approxCost).then(() => {
                    resetForm();
                    setErrors({});
                }, error => {
                    setErrors(error.errors);
                })
            }, error => {
                setErrors(error.errors);
            })
        }catch(error){
            setErrors(error.errors);
        }
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
                            value={material}
                            onChange={(event) => setMaterial(event.target.value)}
                            error={!!errors.material}
                            helperText={errors.material ? errors.material[0] : ' '}
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
                            InputLabelProps={{ shrink: true}}
                            inputProps={{ 'data-testid': 'cost' }}
                            label="Approx Cost"
                            size="small"
                            value={approxCost}
                            onChange={(event) => setApproxCost(event.target.value)}
                            error={!!errors.approxCost}
                            helperText={errors.approxCost ? errors.approxCost[0] : ' '}
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