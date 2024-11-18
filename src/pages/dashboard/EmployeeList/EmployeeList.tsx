import React, { useEffect } from 'react';
import {
  useDataGrid,
  EditButton,
  ShowButton,
  DeleteButton,
  List,
  EmailField,
  DateField,
  ImportButton,
  ExportButton,
  CreateButton,
} from '@refinedev/mui';
import { DataGrid, GridColDef, GridRowSelectionModel, GridToolbar } from '@mui/x-data-grid';
import {
  CrudFilter,
  useDeleteMany,
  useExport,
  useImport,
  useMany,
  useNavigation,
  useSelect,
} from '@refinedev/core';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';

interface ICategory {
  id: number;
  name: string;
}

export const EmployeeList = () => {
  const { dataGridProps, setFilters } = useDataGrid({
    resource: 'employees',
  });

  const { options } = useSelect<ICategory>({
    resource: 'employeeTypes',
    optionLabel: 'name',
  });

  const { mutate } = useDeleteMany();

  const [eType, setEType] = React.useState<string>('');
  const [searchText, setSearchText] = React.useState<string>('');

  const { sortingMode, sortModel, onSortModelChange, ...restDataGridProps } = dataGridProps;

  const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowSelectionModel>([]);

  const { show } = useNavigation();
  const { triggerExport, isLoading: exportLoading } = useExport();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const handleEmployeeTypeChange = (e: SelectChangeEvent<string>) => {
    setEType(e.target.value);
  };

  useEffect(() => {
    const filters: CrudFilter[] = [];

    if (searchText) {
      filters.push({
        field: 'name',
        value: searchText,
        operator: 'contains',
      });
    }

    if (eType) {
      filters.push({
        field: 'employeeTypeId',
        value: eType,
        operator: 'eq',
      });
    }

    if (filters?.length) {
      setFilters(filters);
    }
  }, [eType, searchText, setFilters]);

  useEffect(() => {
    setEType(options[5]?.value);
  }, [options]);

  const { data: employeeTypeData, isLoading: employeeTypeIsLoading } = useMany({
    resource: 'employeeTypes',
    ids: dataGridProps?.rows?.map((item: any) => item?.employeeTypeId) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: 'id',
        headerName: 'Id',
        type: 'number',
        minWidth: 50,
      },
      {
        field: 'avatar',
        flex: 1,
        headerName: 'Avatar',
        minWidth: 100,
        renderCell: function render({ value }) {
          return <img alt="avatar" src={value} style={{ height: '30px', maxWidth: '100px' }} />;
        },
      },
      {
        field: 'name',
        flex: 1,
        headerName: 'Name',
        minWidth: 200,
      },
      {
        field: 'email',
        flex: 1,
        headerName: 'Email',
        minWidth: 250,
        renderCell: function render({ value }) {
          return <EmailField value={value} />;
        },
      },
      {
        field: 'birthdate',
        flex: 1,
        headerName: 'Birthdate',
        minWidth: 250,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: 'company',
        flex: 1,
        headerName: 'Company',
        minWidth: 200,
      },
      {
        field: 'phone',
        flex: 1,
        headerName: 'Phone',
        type: 'number',
        minWidth: 200,
      },
      {
        field: 'employeeTypeId',
        flex: 1,
        headerName: 'Employee Type',
        minWidth: 300,
        renderCell: function render({ value }) {
          return employeeTypeIsLoading ? (
            <>Loading...</>
          ) : (
            employeeTypeData?.data?.find((item) => item.id === value)?.name
          );
        },
      },
      {
        field: 'isActive',
        headerName: 'Is Active',
        minWidth: 100,
        renderCell: function render({ value }) {
          return <Checkbox checked={!!value} />;
        },
      }
    ],
    [employeeTypeData?.data, employeeTypeIsLoading]
  );

  return (
    <Box>
      {!!rowSelectionModel?.length && (
        <Alert
          sx={{
            alignItems: 'center',
          }}
          action={
            <Button
              size="small"
              onClick={() => {
                mutate({
                  resource: 'employeeTypes',
                  ids: [...rowSelectionModel],
                });
                setRowSelectionModel([]);
              }}
            >
              Delete
            </Button>
          }
          severity="info"
        >
          {rowSelectionModel.length} items selected{' '}
        </Alert>
      )}
      <List
        title={
          <>
            <Box sx={{ display: 'flex', gap: 5, alignItems: 'center' }}>
              <h3>Employess</h3>
              <TextField onChange={handleSearch} id="outlined-basic" label="Search by name" />

              <FormControl style={{ width: '200px' }}>
                <InputLabel id="demo-simple-select-label">Employee Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={eType}
                  label="Employee Type"
                  onChange={handleEmployeeTypeChange}
                >
                  {options.map((item: any) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </>
        }
        headerButtons={
          <>
            <CreateButton />

            <ExportButton onClick={triggerExport} loading={exportLoading} />
          </>
        }
      >
        <DataGrid
          sortingMode={sortingMode}
          sortModel={sortModel}
          onSortModelChange={onSortModelChange}
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          onRowClick={(row) => {
            show('employees', row.id);
          }}
          {...restDataGridProps}
          columns={columns}
          autoHeight
        />
      </List>
    </Box>
  );
};
