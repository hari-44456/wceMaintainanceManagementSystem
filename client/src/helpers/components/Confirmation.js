import React from 'react';
import { Button, Card, CardContent, Grid } from '@material-ui/core';

export default function Confirmation({ confirmText, onResolve, onReject }) {
    const rejectText = 'Cancel';
    const resolveText = 'Yes, Remove';

    return (
        <Card>
            <CardContent>
                <Grid>
                    <Grid container>
                        <h3>{confirmText}</h3>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item lg={4}>
                            <Button color='primary' onClick={onReject}>
                                {rejectText.toUpperCase()}
                            </Button>
                        </Grid>
                        <Grid item lg={8}>
                            <Button color='secondary' onClick={onResolve}>
                                {resolveText.toUpperCase()}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
