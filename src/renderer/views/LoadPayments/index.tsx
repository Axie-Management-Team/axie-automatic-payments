import React from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { Button, Input } from '@mui/material';
import Text from '../../components/Text';
import { useAppDispatch } from '../../state';
import { addPayments } from '../../state/application';

const LoadPayments = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const fileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file: File | null | undefined = event.target.files?.item(0);
      if (file?.path) {
        const jsonFile = JSON.parse(await file.text());
        dispatch(addPayments(jsonFile.Scholars));

        history.push('/');
        toast.info('Payment files loaded');
      }
    } catch (err) {
      toast.error("Unable to load payments.json check if it's valid");
    }
  };

  return (
    <>
      <Text>
        You're ready to make your first payments. To continue please provide the
        payment.json file.
      </Text>
      <label htmlFor="contained-button-file">
        <Input id="contained-button-file" type="file" onChange={fileUpload} />
        <Button variant="contained" component="span">
          Upload
        </Button>
      </label>
    </>
  );
};

export default React.memo(LoadPayments);
