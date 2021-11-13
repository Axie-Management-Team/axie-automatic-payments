import axios from 'axios';

export async function createRandomMessage() {
  const payload = {
    operationName: 'CreateRandomMessage',
    variables: {},
    query: 'mutation CreateRandomMessage{createRandomMessage}',
  };
  const url = 'https://graphql-gateway.axieinfinity.com/graphql';
  const response = await axios.post(url, payload);
  return response?.data?.data?.createRandomMessage;
}

export async function axieLogin(web3SignedMessage, ronin) {
  const payload = {
    operationName: 'CreateAccessTokenWithSignature',
    variables: {
      input: {
        mainnet: 'ronin',
        owner: ronin,
        message: web3SignedMessage.message,
        signature: web3SignedMessage.signature,
      },
    },
    query:
      'mutation CreateAccessTokenWithSignature($input: SignatureInput!)' +
      '{createAccessTokenWithSignature(input: $input) ' +
      '{newAccount result accessToken __typename}}',
  };
  const url = 'https://graphql-gateway.axieinfinity.com/graphql';
  const response = await axios.post(url, payload);

  return response.data.data.createAccessTokenWithSignature.accessToken;
}

export async function axieClaim(jwt, ronin) {
  const headers = {
    Authorization: `Bearer ${jwt}`,
  };
  const url = `https://game-api.skymavis.com/game-api/clients/${ronin}/items/1/claim`;
  const response = await axios.post(url, null, { headers });

  const { amount, timestamp, signature } =
    response.data.blockchain_related.signature;
  return {
    amount,
    timestamp,
    signature,
  };
}
