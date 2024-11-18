import React from 'react';
import { useDataGrid, List, ExportButton } from '@refinedev/mui';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useExport } from '@refinedev/core';
import ExpandableTable from './ExpandableTable';

export const EmployeeTypeList = () => {
  const { dataGridProps } = useDataGrid();
  const { triggerExport, isLoading: exportLoading } = useExport();

  const columns = [
    {
      field: 'id',
      headerName: 'Id',
    },
    {
      field: 'name',
      headerName: 'Name',
    },
    {
      field: 'hourlyRate',
      headerName: 'Hourly Rate',
    },
  ];
  
  return (
    <List headerButtons={<ExportButton onClick={triggerExport} loading={exportLoading} />}>
      <ExpandableTable rows={[...dataGridProps.rows]} columns={columns} />
    </List>
  );
};
