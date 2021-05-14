import React from 'react';
import { Typography } from '@material-ui/core';

import UserComplaintForm from '../components/UserComplaintForm';

export default function Request() {
  return (
    <React.Fragment>
      <Typography variant="h4">User Request Form</Typography>
      <UserComplaintForm />
    </React.Fragment>
  );
}
