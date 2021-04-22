import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';

import axiosInstance from '../helpers/axiosInstance';
import ComplaintDetails from './components/ComplaintDetails';
import HodForm from '../forms/components/HodForm'
import RejectReasonForm from './components/RejectReasonForm';

const useStyles = makeStyles((theme) => ({
    button: {
        borderRadius: 0,
        width: '60%'
    },
    acceptBtn: {
        backgroundColor: 'green', 
        color: 'white',
		"&:hover": {
			backgroundColor: "#006400"
		}
    },
    rejectBtn: {
        backgroundColor: 'red', 
        color: 'white',
		"&:hover": {
			backgroundColor: "#CD0000"
		}
    },
	div: {
		marginTop: '20px', 
		padding: '10px',
	}
}));

const HodView = (props) => {
	const classes = useStyles();
	const history = useHistory();
	const { addToast } = useToasts();

	const [complaint, setComplaint] = useState({});
	const [error, setError] = useState(null);
	const [nextForm, setNextForm] = useState(null);
    const [buttonVisibility, setButtonVisibility] = useState(true);

	useEffect(() => {
		if (error){
			addToast(error, {
				appearance: 'error',
				autoDismiss: true,
			});
		}
		setError(null);
		const fetchComplaint = async () => {
			try {
				if (!props.location.state.complaintId) {
					history.push('/ui/dashboard/hod');
					return;
				}
				const result = await axiosInstance.get(
					`/api/complaint/details/${props.location.state.complaintId}`
				);
				console.log(result.data.complaint);
				setComplaint(result.data.complaint);
			} catch (error) {
				try {
					if (error.response.status === 403) history.push('/ui/login/hod');
					setError(error.response.data.error);
				} catch (error) {
					history.push('/ui/dashboard/hod');
				}
			}
		};
		fetchComplaint();
	}, [error,addToast,history,props.location.state.complaintId]);

    const acceptHandler = () => {
        setNextForm("HodForm");
        setButtonVisibility(false);
    };

    const rejectHandler = () => {
        setNextForm("RejectReasonForm");
        setButtonVisibility(false);
    };

    const formButtons = () => {
        return (
            <Grid container spacing={1} style={{marginTop: '15px'}}>
                <Grid item md={4} xs={8}>
                    <Button
                        className={[classes.button, classes.rejectBtn].join(' ')}
                        type="submit"
                        size="large"
                        variant="contained"
                        onClick={rejectHandler}
						fullWidth
                    >
                        Reject Complaint
                    </Button>
                </Grid>
                <Grid item md={4} xs={4}>
                    <Button
                        className={[classes.button,classes.acceptBtn].join(' ')}
                        type="submit"
                        size="large"
                        color="theme.palette.success.main"
                        variant="contained"
                        onClick={acceptHandler}
						fullWidth
                    >
                        Accept Complaint
                    </Button>
                </Grid>
            </Grid>
        )
    }

	return (
		<React.Fragment>
			<Typography variant="h4">
                Complaint Details
            </Typography>
			<div className={classes.div}>
				<ComplaintDetails complaintData={complaint} />
			</div>
			<div className={classes.div}>
				{buttonVisibility ? formButtons() : null}
            	{nextForm === "HodForm" ? <HodForm rejectHandler={rejectHandler} /> : null }
				{nextForm === "RejectReasonForm" ? <RejectReasonForm acceptHandler={acceptHandler} /> : null }
				
			</div>
		</React.Fragment>
	);
};

export default HodView;
