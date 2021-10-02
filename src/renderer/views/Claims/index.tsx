import React, { useState } from 'react';
import { Paper } from '@mui/material';
import axios from 'axios';
import { usePaymentsWithSecrets } from '../../state/application/hooks';
import EditableTable from '../../components/EditableTable';

const Home: React.FC = () => {
  const payments = usePaymentsWithSecrets();
  const defaultSlPInRonin = Array(payments.length).fill('pending');
  const [slpInRonin, setSlpInRonin] = useState(defaultSlPInRonin);
  const [columnsValues, setColumnsValues] = useState([]);

  const columns = React.useMemo(
    () => [
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
    ],
    []
  );

  React.useEffect(() => {
    payments.map(async (p, i) => {
      const response = await axios.get(
        `https://game-api.skymavis.com/game-api/clients/${p.payment?.AccountAddress.replace(
          'ronin:',
          '0x'
        )}/items/1`
      );
      ({ claimable_total: slpInRonin[i] } = response.data);

      setSlpInRonin(slpInRonin);
    });
  }, [slpInRonin, setSlpInRonin, payments]);

  React.useEffect(() => {
    const columnsValuesCalculated = payments.map((p, i) => {
      return {
        name: p.payment?.Name,
        publicRonin: p.payment?.AccountAddress,
        unclaimedSLP: slpInRonin[i],
      };
    });
    setColumnsValues(columnsValuesCalculated);
  }, [slpInRonin, payments]);

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 240,
      }}
    >
      <EditableTable columns={columns} data={columnsValues} />
    </Paper>
  );
};

export default React.memo(Home);
