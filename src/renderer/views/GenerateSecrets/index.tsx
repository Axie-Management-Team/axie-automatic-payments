import React from 'react';
import EditableTable, { EditableCell } from '../../components/EditableTable';
import { usePayments, useSecrets } from '../../state/application/hooks';
import { Payment, Secret } from '../../state/types';
import { addSecretAction } from '../../state/application';
import { useAppDispatch } from '../../state';
import Text from '../../components/Text';
import Button from '../../components/Buttons/Button';

const GenerateSecrets: React.FC = () => {
  const payments = usePayments();
  const secrets = useSecrets();
  const dispatch = useAppDispatch();

  const [showFullPrivateKey, setShowFullPrivateKey] = React.useState(false);

  const onTableUpdate = (rowContent, header: string, privateKey: string) => {
    if (privateKey.startsWith('0x') && privateKey.length >= 66) {
      dispatch(addSecretAction(rowContent.publicRonin, privateKey));
      return true;
    }
    return false;
  };

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
        Header: 'Private key',
        accessor: 'privateKey',
        Cell: EditableCell,
      },
    ],
    []
  );

  const missingPrivateKey = React.useMemo(() => {
    const arrayOfSecrets = secrets.map((s: Secret) => s.AccountAddress);
    return payments
      .filter((p: Payment) => !arrayOfSecrets.includes(p.AccountAddress))
      .map((payment: Payment) => ({
        name: payment.Name,
        publicRonin: payment.AccountAddress,
        privateKey: '',
      }));
  }, [payments, secrets]);

  const havePrivateKey = React.useMemo(() => {
    const arrayOfSecrets = secrets.map((s: Secret) => s.AccountAddress);
    return payments
      .filter((p: Payment) => arrayOfSecrets.includes(p.AccountAddress))
      .map((payment: Payment) => {
        const privateKey = secrets.find((s: Secret) => {
          return s.AccountAddress === payment.AccountAddress;
        })?.PrivateKey;

        return {
          name: payment.Name,
          publicRonin: payment.AccountAddress,
          privateKey: showFullPrivateKey
            ? privateKey
            : `****${privateKey?.slice(-4)}`,
        };
      });
  }, [payments, secrets, showFullPrivateKey]);

  return (
    <>
      <EditableTable
        columns={columns}
        data={missingPrivateKey}
        updateMyData={onTableUpdate}
      />
      <Text>Already stored keys </Text>
      <Button
        value="Show private key"
        onClick={() => setShowFullPrivateKey(!showFullPrivateKey)}
      />
      <EditableTable
        columns={columns}
        data={havePrivateKey}
        updateMyData={onTableUpdate}
      />
    </>
  );
};

export default React.memo(GenerateSecrets);
