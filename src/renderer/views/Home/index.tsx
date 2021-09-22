import React from 'react';
import Menu from '../../components/Menu';
import { useIsFirstTimeOnTheApplication } from '../../state/application/hooks';
import Welcome from './Welcome';

const Home: React.FC = () => {
  const isFirstTimeOnTheApplication = useIsFirstTimeOnTheApplication();

  return (
    <>
      {isFirstTimeOnTheApplication && <Welcome />}
      {!isFirstTimeOnTheApplication && <Menu />}
    </>
  );
};

export default React.memo(Home);
