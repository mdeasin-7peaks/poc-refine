import {
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type ExpandableTableRowProps = {
  children: React.ReactNode;
  expandComponent: React.ReactNode;
} & Omit<React.ComponentProps<typeof TableRow>, 'children'>;

const ExpandableTableRow = ({
  children,
  expandComponent,
  ...otherProps
}: ExpandableTableRowProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <>
      <TableRow {...otherProps}>
        <TableCell padding="checkbox">
          <IconButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </TableCell>
        {children}
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell padding="checkbox" />
          {expandComponent}
        </TableRow>
      )}
    </>
  );
};

interface ExpandableTableProps {
  rows: {
    description: string;
    hourlyRate: number;
    id: number;
    name: string;
  }[];
  columns: {
    field: string;
    headerName: string;
  }[];
}

export default function ExpandableTable({ columns, rows }: ExpandableTableProps) {
  return (
    <Paper
      sx={{
        width: '100%',
        overflowX: 'auto',
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" />
            {columns.map(({ field, headerName }) => (
              <TableCell key={field}>{headerName}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <ExpandableTableRow
              key={row.name}
              expandComponent={<TableCell colSpan={3}>{row.description}</TableCell>}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.hourlyRate}</TableCell>
            </ExpandableTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
