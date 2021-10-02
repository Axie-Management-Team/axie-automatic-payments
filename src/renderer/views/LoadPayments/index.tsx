import React from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { Button, Input, Paper } from '@mui/material';
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
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 240,
      }}
    >
      <Text>
        You&apos;re ready to make your first payments. To continue please
        provide the payment.json file.
      </Text>
      <Input id="contained-button-file" type="file" onChange={fileUpload} />
      <Button variant="contained" component="span">
        Upload
      </Button>
    </Paper>
  );
};

export default React.memo(LoadPayments);
