import DateFnsUtils from "@date-io/date-fns";
import { Button, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, TextField, ThemeProvider } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import "date-fns";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "src/utils/mng-token";
import { setProfile } from "./redux";

const useStyles = makeStyles((theme) => ({}));

export default function ProfileForm() {
  const studentProfile = useSelector((state) => state.studentProfile);
  const [state, setState] = useState(studentProfile);
  const [lastUpdatedState, setCheckPointState] = useState(state);
  const { enqueueSnackbar } = useSnackbar();
  const dp = useDispatch();

  async function hdSubmit(e) {
    try {
      e.preventDefault();
      if (lastUpdatedState === state) {
        enqueueSnackbar("Nothing changed", { variant: "info", anchorOrigin: { vertical: "bottom", horizontal: "center" } });
        return;
      }

      let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/student/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: getToken() },
        body: JSON.stringify(state),
      });

      if (!response.ok) {
        const error = await response.json();
        enqueueSnackbar("Something went wrong: " + JSON.stringify(error), { variant: "error", anchorOrigin: { vertical: "top", horizontal: "center" } });
      } else {
        setCheckPointState(state);
        dp(setProfile(state));
        enqueueSnackbar("Cập nhật Profile thành công!", { variant: "success", anchorOrigin: { vertical: "bottom", horizontal: "center" } });
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div>
      <h4>Thông tin cá nhân</h4>
      <p>Chỉnh sửa lại thông tin cá nhân (nếu cần)</p>
      {/* row 1 */}
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            InputLabelProps={{ shrink: true }}
            id="name"
            label="Họ và tên"
            fullWidth
            // margin="normal"
            value={state?.name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
          ></TextField>
        </Grid>
        <Grid item xs={4}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              // margin="normal"
              id="birthday"
              label="Ngày sinh"
              views={["year", "month", "date"]}
              openTo="year"
              disableFuture
              autoOk
              format="dd/MM/yyyy"
              value={state?.birthDay}
              onChange={(selectedDate) => setState({ ...state, birthDay: selectedDate })}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={4}>
          {/* <FormControl fullWidth margin="normal"> */}
          <FormControl fullWidth>
            <InputLabel id="genderlabel" shrink>
              Giới tính
            </InputLabel>
            <Select id="gender" labelId="genderlabel" value={state?.gender} onChange={(e) => setState({ ...state, gender: e.target.value })}>
              <MenuItem value={1}>Nam</MenuItem>
              <MenuItem value={2}>Nữ</MenuItem>
              <MenuItem value={3}>Khác</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* row 2 */}
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="normal"
            label="CMT/CCCD"
            value={state?.cmt}
            onChange={(e) => setState({ ...state, cmt: e.target.value })}
          ></TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="normal"
            label="Email"
            value={state?.email}
            onChange={(e) => setState({ ...state, email: e.target.value })}
          ></TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="normal"
            label="Số điện thoại"
            value={state?.phone}
            onChange={(e) => setState({ ...state, phone: e.target.value })}
          ></TextField>
        </Grid>
      </Grid>

      {/* row 3 */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="normal"
            xs={12}
            label="Quê quán"
            value={state?.hometown}
            onChange={(e) => setState({ ...state, hometown: e.target.value })}
          ></TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="normal"
            xs={12}
            label="Nơi ở hiện tại"
            value={state?.address}
            onChange={(e) => setState({ ...state, address: e.target.value })}
          ></TextField>
        </Grid>
      </Grid>

      {/* row 4 */}
      {/* <Grid container>
            <Grid item xs={12}>
              <TextField  InputLabelProps={{ shrink: true }}  fullWidth margin="normal" xs={12} label="Nơi ở hiện tại"></TextField>
            </Grid>
          </Grid> */}

      <Grid container>
        <Grid item xs={12}>
          <TextField
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="normal"
            xs={12}
            label="Mô tả bản thân"
            multiline
            rows={4}
            value={state?.description}
            onChange={(e) => setState({ ...state, description: e.target.value })}
          ></TextField>
        </Grid>
      </Grid>
      <Button color="primary" onClick={hdSubmit}>
        Cập nhật thông tin
      </Button>
      {/* <Button color="primary" variant="contained">
              Cập nhật thông tin
            </Button> */}
    </div>
  );
}
