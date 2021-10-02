import React from 'react';
import { Button, Typography } from '@mui/material';
import Text from '../../components/Text';
import { useAppDispatch } from '../../state';
import { hideWelcome } from '../../state/application';

const Welcome = () => {
  const dispatch = useAppDispatch();

  const handleHideWelcome = () => {
    dispatch(hideWelcome());
  };

  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Welcome to the Axie Management payment helper tool
      </Typography>
      <Text>
        This tool helps to automatise all the claim for you scholar accounts and
        make the payments.
      </Text>
      <Text>
        To do so we&apos;ll ask for secrets for your ronin. Secret file is
        hosted in your device this is why this is a desktop app and all the code
        is public available at https://github.com/
      </Text>
      <Button
        onClick={handleHideWelcome}
        style={{ marginTop: '12px' }}
        variant="contained"
      >
        Let&apos;s go
      </Button>
    </>
  );
};

export default React.memo(Welcome);
