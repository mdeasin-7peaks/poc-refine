import { useShow, useOne } from '@refinedev/core';
import {
  Show,
  NumberField,
  TextFieldComponent as TextField,
  EmailField,
  DateField,
  BooleanField,
} from '@refinedev/mui';
import { Typography, Stack } from '@mui/material';

export const EmployeeShow = () => {
  const { query } = useShow({
    resource: 'employees',
  });
  const { data, isLoading } = query;

  const record = data?.data;

  const { data: employeeTypeData, isLoading: employeeTypeIsLoading } = useOne({
    resource: 'employeeTypes',
    id: record?.employeeTypeId || '',
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          Id
        </Typography>
        <NumberField value={record?.id ?? ''} />
        <Typography variant="body1" fontWeight="bold">
          Name
        </Typography>
        <TextField value={record?.name} />
        <Typography variant="body1" fontWeight="bold">
          Email
        </Typography>
        <EmailField value={record?.email} />
        <Typography variant="body1" fontWeight="bold">
          Birthdate
        </Typography>
        <DateField value={record?.birthdate} />
        <Typography variant="body1" fontWeight="bold">
          Company
        </Typography>
        <TextField value={record?.company} />
        <Typography variant="body1" fontWeight="bold">
          Phone
        </Typography>
        <NumberField value={record?.phone ?? ''} />
        <Typography variant="body1" fontWeight="bold">
          Avatar
        </Typography>
        <img
          style={{ maxWidth: 200, width: '100%', height: 200 }}
          src={record?.avatar}
          alt="avatar"
        />
        <Typography variant="body1" fontWeight="bold">
          Employee Type
        </Typography>

        {employeeTypeIsLoading ? <>Loading...</> : <>{employeeTypeData?.data?.name}</>}
        <Typography variant="body1" fontWeight="bold">
          Is Active
        </Typography>
        <BooleanField value={record?.isActive} />
      </Stack>
    </Show>
  );
};
