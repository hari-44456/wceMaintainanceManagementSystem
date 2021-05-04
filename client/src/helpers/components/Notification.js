import React, { useState } from 'react';
import { Snackbar, Slide, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';


export default function Notification({ open, setOpen, message, type }) {
    const TransitionLeft = (props) => {
        return <Slide {...props} direction="left" />;
    }

    const handleClick = () => {
        setOpen(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                onClose={handleClose}
                TransitionComponent={TransitionLeft}
                message="I love snacks"
                autoHideDuration={4000}
            >
                <Alert onClose={handleClose} severity={type}>
                    {message}
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}
