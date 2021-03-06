import { Box } from "@material-ui/core";
import AccountTitleBar from "../AccountTitleBar";
import EduPrograms from "./EduPrograms";
import Jobs from "./Jobs";

export default function EncryptedAccountProfile({ accountProfile, index, updateAccountProfile }) {
  return (
    <div style={{ border: "1px solid grey" }}>
      <div style={{ backgroundColor: "white" }}>
        <AccountTitleBar {...{ updateAccountProfile, accountProfile, index }}></AccountTitleBar>
      </div>
      <Box p={2}>
        {accountProfile.jobs.length > 0 && <Jobs jobs={accountProfile.jobs}></Jobs>}
        <Box mb={2}></Box>
        <EduPrograms eduPrograms={accountProfile.eduPrograms}></EduPrograms>
      </Box>
    </div>
  );
}
