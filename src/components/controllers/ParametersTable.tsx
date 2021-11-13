import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// interface ParameterDetails {
//   name: string,
//   value: number,
//   error: boolean
// }

function createData(
  name: string,
  value: number,
  error: boolean
) {
  return { name, value, error};
}

const rows = [
  createData('PM10', 9.83, false),
  createData('PM15', 111.11, true)
];

interface Props {

}

export const ParametersTable : React.FC<Props> = () =>{
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Pomiary</TableCell>
            <TableCell align="right">Wartość&nbsp;(mg/m3)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: row.error ? 'red' : 'white' }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.error ? " ! " : row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}