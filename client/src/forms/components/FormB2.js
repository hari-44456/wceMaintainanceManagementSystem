import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import StoreMaterialForm from './StoreMaterial';
import OrderedMaterialForm from './OrderedMaterial';
import Notification from '../../helpers/components/Notification';
import axiosInstance from '../../helpers/axiosInstance';

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: 0,
  },
  acceptBtn: {
    backgroundColor: 'green',
    color: 'white',
    '&:hover': {
      backgroundColor: '#006400',
    },
  },
  rejectBtn: {
    backgroundColor: 'red',
    color: 'white',
    '&:hover': {
      backgroundColor: '#CD0000',
    },
  },
  marginTop: {
    margin: theme.spacing(2, 0),
  },
}));

const submitHandler = () => {};

export default function FormB2({ complaintId, rejectHandler }) {
  const classes = useStyles();

  const [storeMaterials, setStoreMaterials] = useState([]);
  const [orderedMaterials, setOrderedMaterials] = useState([]);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await axiosInstance.get(
          `/api/complaint/getMaterial/${complaintId}`
        );
        console.log(result);

        // get Current USer and give edit and delete option if that material is added by himself only
        const user = window.localStorage.getItem(
          'WCEMaintananceManagementSystemUser'
        );
        console.log(user);

        setCurrentUserId(user._id);

        const existing = result.data.availableInStore.map((doc) => {
          return {
            _id: doc.materialId._id,
            material: doc.materialId.material,
            cost: doc.materialId.cost,
            units: doc.quantity,
            addedBy: doc.addedBy,
          };
        });
        setStoreMaterials(existing);

        const orderExisting = result.data.orderedMaterial.map((doc) => ({
          _id: doc._id,
          material: doc.material,
          approxCost: doc.approxCost,
          units: doc.quantity,
          addedBy: doc.addedBy,
        }));
        setOrderedMaterials(orderExisting);
      } catch (error) {
        try {
          setMessage(error.response.data.error);
          setMessageType('error');
          setOpen(true);
        } catch (error) {
          setMessage('Unable to fetch data');
          setMessageType('error');
          setOpen(true);
        }
      }
    })();
  }, []);

  return (
    <Grid container spacing={4}>
      <Notification
        open={open}
        setOpen={setOpen}
        message={message}
        type={messageType}
      />
      <Grid item md={6} xs={12}>
        <StoreMaterialForm
          complaintId={complaintId}
          materials={storeMaterials}
          setMaterials={setStoreMaterials}
          currentUserId={currentUserId}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <OrderedMaterialForm
          complaintId={complaintId}
          orderedMaterials={orderedMaterials}
          setOrderedMaterials={setOrderedMaterials}
          currentUserId={currentUserId}
        />
      </Grid>
      <Grid container className={classes.marginTop} spacing={1}>
        {/* <Grid item md={4} xs={8}>
          <Button
            className={[classes.button, classes.rejectBtn].join(' ')}
            size="large"
            variant="contained"
            onClick={rejectHandler}
          >
            Reject Request
          </Button>
        </Grid> */}
      </Grid>
    </Grid>
  );
}
