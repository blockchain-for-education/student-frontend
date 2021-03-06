import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import NavBar from "./NavBar";
import TopBar from "./TopBar";
import { getToken } from "../../utils/mng-token";
import { setProfile } from "../../views/StudentProfile/redux";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../shared/Loading";
import PerfectScrollbar from "react-perfect-scrollbar";
import { setFetchedAccounts } from "../../views/AccountManagement/redux";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: 64,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
  },
}));

const DashboardLayout = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const loading = useSelector((state) => state.studentProfileSlice.fetching);
  const dp = useDispatch();

  useEffect(() => {
    fetchStudentProfile();
  }, []);

  async function fetchStudentProfile() {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/student/profile`, {
        headers: { Authorization: getToken() },
      });
      if (!response.ok) {
        alert(JSON.stringify(await response.json()));
      } else {
        dp(setProfile(await response.json()));
      }
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }

  // const dp = useDispatch();

  useEffect(() => {
    fetchSawtoothAccounts();
  }, []);

  async function fetchSawtoothAccounts() {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/student/sawtooth-accounts`, {
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
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={classes.root}>
            <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
            <NavBar onMobileClose={() => setMobileNavOpen(false)} openMobile={isMobileNavOpen} />
            <div className={classes.wrapper}>
              <div className={classes.contentContainer}>
                <div className={classes.content}>
                  <PerfectScrollbar>
                    <Outlet />
                  </PerfectScrollbar>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DashboardLayout;
