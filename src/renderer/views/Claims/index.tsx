import React, { useEffect, useState } from "react";
import { Button, Paper } from "@mui/material";
import Web3 from "web3";
import EditableTable from "../../components/EditableTable";
import {
  useFetchPayableAccountsWithOutSLP,
  usePayableAccounts
} from "../../state/payableAccounts/hooks";
import { fetchPayableAccounts } from "../../state/payableAccounts";
import { useAppDispatch } from "../../state";
import { axieClaim, axieLogin, createRandomMessage } from "../../services/roninHelper";

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
        unclaimedSLP: account.unclaimed
      };
    });
    setColumnsValues(values);
  }, [payableAccounts]);

  const columns = [
    {
      Header: "Name",
      accessor: "name"
    },
    {
      Header: "Public ronin",
      accessor: "publicRonin"
    },
    {
      Header: "Unclaimed SLP",
      accessor: "unclaimedSLP"
    }
  ];

  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: 500
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
        onClick={async () => {
          const privateKey = "0x12312313123123131313131313131313123";
          const publicKey =
            "ronin:feb792e52c0142c89a925381d50c9c4d2b106957".replace(
              "ronin:",
              "0x"
            );
          const randomMessage = await createRandomMessage();
          const signedMsg = await window["signedMessage"](
            randomMessage,
            privateKey
          );
          const jwt = await axieLogin(signedMsg, publicKey);
          const claimResponse = await axieClaim(jwt, publicKey);
          columnsValues.map((col) => {
            window.initialBalance(col.publicRonin.replace("ronin:", "0x"));
            //   aaa(col.publicRonin.replace('ronin:', '0x'));
          });
        }}
      >
        Claim all
      </Button>
    </Paper>
  );
};

export default React.memo(Home);
