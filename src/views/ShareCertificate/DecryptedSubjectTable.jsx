import React from "react";
import { Divider, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

export default function DecryptedSubjectTable(props) {
  const cls = useStyles();
  const subjects = useSelector((state) => state.shareCertificateSlice.decryptedDataOfAccount.subjects);

  return (
    <div>
      <Paper className={cls.root}>
        <Typography gutterBottom variant="h4">
          Thông tin bảng điểm
        </Typography>
        <Divider></Divider>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Kì học</TableCell>
                <TableCell>Mã HP</TableCell>
                <TableCell>Tên HP</TableCell>
                <TableCell>Số tín chỉ</TableCell>
                <TableCell>Điểm GK</TableCell>
                <TableCell>Điểm CK</TableCell>
                <TableCell>Mã GV</TableCell>
                <TableCell>Tên GV</TableCell>
                {/* <TableCell>Điểm cuối kì</TableCell> */}
                {/* <TableCell>Điểm chữ</TableCell> */}
                <TableCell>Txid</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjects.map((subject, index) => (
                <React.Fragment key={index}>
                  {subject.versions.map((version, index) => (
                    <TableRow key={index}>
                      <TableCell>{version.plain.semester}</TableCell>
                      <TableCell>{version.plain.subject.subjectId}</TableCell>
                      <TableCell>{version.plain.subject.name}</TableCell>
                      <TableCell>{version.plain.subject.credit}</TableCell>
                      <TableCell>{version.plain.halfSemesterPoint}</TableCell>
                      <TableCell>{version.plain.finalSemesterPoint}</TableCell>
                      <TableCell>{version.plain.teacherId}</TableCell>
                      <TableCell>{version.plain.teacherName}</TableCell>
                      {/* <TableCell>{version.plain.rank}</TableCell> */}
                      <TableCell>
                        {/* <Tooltip title={version.txid}>{version.txid.slice(0, 20) + "..." + version.txid.slice(-20)}</Tooltip> */}
                        {version.txid.slice(0, 20) + "..." + version.txid.slice(-20)}
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
