import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';

import axiosInstance from '../../helpers/axiosInstance';

export default function ComplaintDetails({ complaintData }) {
  const downloadPdf = () => {
    axiosInstance
      .get(`/api/pdf/${complaintData._id}`, {
        responseType: 'arraybuffer',
      })
      .then((res) => {
        const url = window.URL.createObjectURL(
          new Blob([res.data], { type: 'application/pdf' })
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'request.pdf');
        document.body.appendChild(link);
        link.click();
      });
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item md={2} xs={3}>
          <Typography variant="subtitle1">Request By</Typography>
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

      <Grid container spacing={2}>
        <Grid item md={2} xs={3}>
          <Typography variant="subtitle1">Request Status</Typography>
        </Grid>
        <Grid item md={1} xs={1}>
          <Typography variant="subtitle1">:</Typography>
        </Grid>
        <Grid item md={9} xs={8} style={{ overflowWrap: 'break-word' }}>
          <Typography variant="subtitle1">{complaintData.status}</Typography>
        </Grid>
      </Grid>

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

      {complaintData.stage >= 4 && (
        <Button
          variant="contained"
          color="primary"
          style={{ height: '100%', marginTop: '20px' }}
          onClick={downloadPdf}
        >
          Generate PDF
        </Button>
      )}
    </React.Fragment>
  );
}
