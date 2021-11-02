import React from 'react';
import { Paper } from '@mui/material';
import { usePaymentsWithSecrets } from '../../state/application/hooks';
import EditableTable from '../../components/EditableTable';
import { useAppDispatch } from '../../state';
import { useLoadPayableAccounts } from '../../state/payments/hooks';

const Payments: React.FC = () => {
  const dispatch = useAppDispatch();
  dispatch(useLoadPayableAccounts(usePaymentsWithSecrets()));
  //
  // const columnsValues = paymentsWithSecrets.map((account) => {
  //   return {
  //     name: account.payment?.Name,
  //     publicRonin: account.payment?.AccountAddress,
  //     claimedSLP: 100,
  //     manager: 100,
  //     scholar: 100,
  //     trainer: 100,
  //     fee: 100,
  //   };
  // });
  //
  // const columns = [
  //   {
  //     Header: 'Name',
  //     accessor: 'name',
  //   },
  //   {
  //     Header: 'Public ronin',
  //     accessor: 'publicRonin',
  //   },
  //   {
  //     Header: 'Claimed SLP',
  //     accessor: 'claimedSLP',
  //   },
  //   {
  //     Header: 'Manager',
  //     accessor: 'manager',
  //   },
  //   {
  //     Header: 'Scholar',
  //     accessor: 'scholar',
  //   },
  //   {
  //     Header: 'Trainer',
  //     accessor: 'trainer',
  //   },
  //   {
  //     Header: 'Fee',
  //     accessor: 'fee',
  //   },
  // ];

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 500,
      }}
    >
      {/* <EditableTable columns={columns} data={columnsValues} /> */}
    </Paper>
  );
};

export default React.memo(Payments);
