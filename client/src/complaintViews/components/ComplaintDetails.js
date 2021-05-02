import React from 'react';
import { Grid, Typography } from '@material-ui/core';

export default function ComplaintDetails({ complaintData }) {
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item md={2} xs={3}>
          <Typography variant="subtitle1">Complaint By</Typography>
        </Grid>
        <Grid item md={1} xs={1}>
          <Typography variant="subtitle1">:</Typography>
        </Grid>
        <Grid item md={9} xs={8} style={{ overflowWrap: 'break-word' }}>
          <Typography variant="subtitle1">
            {complaintData.userId.email}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item md={2} xs={3}>
          <Typography variant="subtitle1">Room(s)</Typography>
        </Grid>
        <Grid item md={1} xs={1}>
          <Typography variant="subtitle1">:</Typography>
        </Grid>
        <Grid item md={9} xs={8} style={{ overflowWrap: 'break-word' }}>
          <Typography variant="subtitle1">{complaintData.room}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item md={2} xs={3}>
          <Typography variant="subtitle1">Nature of Work</Typography>
        </Grid>
        <Grid item md={1} xs={1}>
          <Typography variant="subtitle1">:</Typography>
        </Grid>
        <Grid item md={9} xs={8} style={{ overflowWrap: 'break-word' }}>
          <Typography variant="subtitle1">
            {complaintData.workType === 'Other'
              ? complaintData.otherWork
              : complaintData.workType}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item md={2} xs={3}>
          <Typography variant="subtitle1">Description</Typography>
        </Grid>
        <Grid item md={1} xs={1}>
          <Typography variant="subtitle1">:</Typography>
        </Grid>
        <Grid item md={9} xs={8} style={{ overflowWrap: 'break-word' }}>
          <Typography variant="subtitle1">{complaintData.details}</Typography>
        </Grid>
      </Grid>

      {complaintData.sourceOfFund && (
        <Grid container spacing={2}>
          <Grid item md={2} xs={3}>
            <Typography variant="subtitle1">Source Of Fund</Typography>
          </Grid>
          <Grid item md={1} xs={1}>
            <Typography variant="subtitle1">:</Typography>
          </Grid>
          <Grid item md={9} xs={8} style={{ overflowWrap: 'break-word' }}>
            <Typography variant="subtitle1">
              {complaintData.sourceOfFund}
            </Typography>
          </Grid>
        </Grid>
      )}

      {complaintData.reasonForRejection && (
        <Grid container spacing={2}>
          <Grid item md={2} xs={3}>
            <Typography variant="subtitle1">Rejection Remark</Typography>
          </Grid>
          <Grid item md={1} xs={1}>
            <Typography variant="subtitle1">:</Typography>
          </Grid>
          <Grid item md={9} xs={8} style={{ overflowWrap: 'break-word' }}>
            <Typography variant="subtitle1">
              {complaintData.reasonForRejection}
            </Typography>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}
