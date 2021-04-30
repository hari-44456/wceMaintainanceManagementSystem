import React from 'react';
import { Typography } from '@material-ui/core';

import UserComplaintForm from '../components/UserComplaintForm';

export default function Complaint() {
  return (
    <React.Fragment>
      <Typography variant="h4">User Complaint Form</Typography>
      <UserComplaintForm />
    </React.Fragment>
  );
}
