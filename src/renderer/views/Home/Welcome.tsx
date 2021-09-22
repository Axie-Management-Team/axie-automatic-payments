import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Buttons/Button';
import Text from '../../components/Text';
import { useAppDispatch } from '../../state';
import { hideWelcome } from '../../state/application';

const Header = styled.h2``;
const UploadFile = styled.input``;

const Welcome = () => {
  const dispatch = useAppDispatch();

  const handleHideWelcome = () => {
    dispatch(hideWelcome());
  };
  return (
    <>
      <Header>Welcome to the Axie Management payment helper tool</Header>
      <Text>
        This tool helps to automatise all the claim for you scholar accounts and
        make the payments.
      </Text>
      <Text>
        To do so we'll ask for secrets for your ronin. Secret file is hosted in
        your device this is why this is a desktop app and all the code is public
        available at https://github.com/
      </Text>
      <Button
        value="Let's go"
        onClick={handleHideWelcome}
        style={{ marginTop: '12px' }}
      />
    </>
  );
};

export default React.memo(Welcome);
