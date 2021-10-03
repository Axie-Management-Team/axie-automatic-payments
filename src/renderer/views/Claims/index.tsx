import React, { useEffect, useState } from 'react';
import { Button, Paper } from '@mui/material';
import EditableTable from '../../components/EditableTable';
import {
  useFetchPayableAccountsWithOutSLP,
  usePayableAccounts,
} from '../../state/payableAccounts/hooks';
import { fetchPayableAccounts } from '../../state/payableAccounts';
import { useAppDispatch } from '../../state';

const Home: React.FC = () => {
  useFetchPayableAccountsWithOutSLP();

  const dispatch = useAppDispatch();
  const payableAccounts = usePayableAccounts();
  const [columnsValues, setColumnsValues] = useState([]);
  useEffect(() => {
    const values = payableAccounts.map((account) => {
      return {
        name: account.payment?.Name,
        publicRonin: account.payment?.AccountAddress,
        unclaimedSLP: account.unclaimed,
      };
    });
    setColumnsValues(values);
  }, [payableAccounts]);

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
          dispatch(fetchPayableAccounts());
        }}
      >
        Load Unclaimed SLP
      </Button>
      <EditableTable columns={columns} data={columnsValues} />
      <Button
        variant="contained"
        onClick={() => {
          console.log('claim');
        }}
      >
        Claim all
      </Button>
    </Paper>
  );
};

export default React.memo(Home);
