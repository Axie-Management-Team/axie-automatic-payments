import React from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import Text from '../../components/Text';
import { useAppDispatch } from '../../state';
import { addPayments } from '../../state/application';

const Header = styled.h1``;
const UploadFile = styled.input``;

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
      <UploadFile type="file" onChange={fileUpload} />
    </>
  );
};

export default React.memo(LoadPayments);
