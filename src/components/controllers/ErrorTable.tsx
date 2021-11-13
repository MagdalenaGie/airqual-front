import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// interface ErrorDetails {
//   name: string,
//   timeStamp: Date,
//   errorCode: number,
//   lastValidBefore: number,
//   firstValidAfter: number
// }

function createData(
    name: string,
    timeStamp: Date,
    errorCode: number,
    lastValidBefore: number,
    firstValidAfter: number
) {
  return { name, timeStamp, errorCode, lastValidBefore, firstValidAfter };
}

const rows = [
  createData("PM15",new Date("2019-01-16"), 5000, 11.04, 10.22)
];

interface Props {

}

export const ErrorTable : React.FC<Props> = () =>{
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Pomiary</TableCell>
            <TableCell align="right">Data</TableCell>
            <TableCell align="right">Typ błędu</TableCell>
            <TableCell align="right">Wartość przed</TableCell>
            <TableCell align="right">Wartość po</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{"data"}</TableCell>
              <TableCell align="right">{row.errorCode}</TableCell>
              <TableCell align="right">{row.lastValidBefore}</TableCell>
              <TableCell align="right">{row.firstValidAfter}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}