import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import View from "../../shared/View";
import { getToken } from "../../utils/mng-token";
import AccountTable from "./AccountTable";
import AddAccountByWallet from "./AddAccountByWallet";
import AddAccountForm from "./AddAccountForm";
import { setFetchedAccounts } from "./redux";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * ": {
      marginBottom: theme.spacing(3),
    },
  },
}));

export default function AccountManagement() {
  const cls = useStyles();
  const loading = useSelector((state) => state.sawtoothAccountsSlice.fetching);
  const dp = useDispatch();

  useEffect(() => {
    fetchSawtoothAccounts();
  }, []);

  async function fetchSawtoothAccounts() {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/student/sawtooth-accounts`, {
        headers: { Authorization: getToken() },
      });
      if (!response.ok) {
        alert(JSON.stringify(await response.json()));
      } else {
        const sawtoothAccounts = await response.json();
        dp(setFetchedAccounts(sawtoothAccounts));
      }
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }

  return (
    <View title="Quản lý tài khoản">
      {loading ? null : (
        <Box className={cls.root}>
          <AccountTable></AccountTable>
          <AddAccountForm></AddAccountForm>
          <AddAccountByWallet></AddAccountByWallet>
        </Box>
      )}
    </View>
  );
}
