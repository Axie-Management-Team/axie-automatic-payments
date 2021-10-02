import React from 'react';
import { Paper } from '@mui/material';
import Menu from '../../components/Menu';
import { useIsFirstTimeOnTheApplication } from '../../state/application/hooks';
import Welcome from './Welcome';

const Home: React.FC = () => {
  const isFirstTimeOnTheApplication = useIsFirstTimeOnTheApplication();

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 240,
      }}
    >
      {isFirstTimeOnTheApplication && <Welcome />}
      {!isFirstTimeOnTheApplication && <Menu />}
    </Paper>
  );
};

export default React.memo(Home);
