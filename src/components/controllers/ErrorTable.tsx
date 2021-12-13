import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface Props {
  errCode: string,
  errTime: string,
  name: string
}

export const ErrorTable : React.FC<Props> = ({errCode, errTime, name}) =>{
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Pomiary</TableCell>
            <TableCell align="right">Data</TableCell>
            <TableCell align="right">Typ błędu</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
              key={name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {name}
              </TableCell>
              <TableCell align="right">{errTime}</TableCell>
              <TableCell align="right">{errCode}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}