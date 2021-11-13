import React, { useEffect, useState } from 'react';
import { Button, Paper } from '@mui/material';
import EditableTable from '../../components/EditableTable';
import {
  useFetchClaimableAccountsWithOutSLP,
  useClaimableAccounts,
} from '../../state/claimableAccounts/hooks';
import { claim, fetchClaimableAccounts } from '../../state/claimableAccounts';
import { useAppDispatch } from '../../state';

const Home: React.FC = () => {
  useFetchClaimableAccountsWithOutSLP();

  const dispatch = useAppDispatch();
  const claimableAccounts = useClaimableAccounts();
  const [columnsValues, setColumnsValues] = useState([]);
  useEffect(() => {
    const values = claimableAccounts.map((account) => {
      return {
        name: account.payment?.Name,
        publicRonin: account.payment?.AccountAddress,
        unclaimedSLP: account.unclaimed,
        lastError: account?.lastError,
      };
    });
    setColumnsValues(values);
  }, [claimableAccounts]);

  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Public ronin',
      accessor: 'publicRonin',
    },
    {
      Header: 'Unclaimed SLP',
      accessor: 'unclaimedSLP',
    },
    {
      Header: 'Last Error',
      accessor: 'lastError',
    },
  ];

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 500,
      }}
    >
      <Button
        variant="outlined"
        onClick={() => {
          dispatch(fetchClaimableAccounts());
        }}
      >
        Load Unclaimed SLP
      </Button>
      <EditableTable columns={columns} data={columnsValues} />
      <Button
        variant="contained"
        onClick={async () => {
          dispatch(claim());
        }}
      >
        Claim all
      </Button>
    </Paper>
  );
};

export default React.memo(Home);
