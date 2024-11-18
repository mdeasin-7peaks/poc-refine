import { Create, useAutocomplete } from '@refinedev/mui';
import { Box, TextField, Autocomplete, Checkbox, FormControlLabel } from '@mui/material';
import { useForm } from '@refinedev/react-hook-form';
import { Controller } from 'react-hook-form';

export const EmployeeCreate = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
  } = useForm();

  const { autocompleteProps: employeeTypeAutocompleteProps } = useAutocomplete({
    resource: 'employeeTypes',
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }} autoComplete="off">
        <TextField
          {...register('name', {
            required: 'This field is required',
          })}
          error={!!(errors as any)?.name}
          helperText={(errors as any)?.name?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Name"
          name="name"
        />
        <TextField
          {...register('email', {
            required: 'This field is required',
          })}
          error={!!(errors as any)?.email}
          helperText={(errors as any)?.email?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="email"
          label="Email"
          name="email"
        />
        {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
        <TextField
          {...register('birthdate', {
            required: 'This field is required',
          })}
          error={!!(errors as any)?.birthdate}
          helperText={(errors as any)?.birthdate?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Birthdate"
          name="birthdate"
        />
        <TextField
          {...register('company', {
            required: 'This field is required',
          })}
          error={!!(errors as any)?.company}
          helperText={(errors as any)?.company?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Company"
          name="company"
        />
        <TextField
          {...register('phone', {
            required: 'This field is required',
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.phone}
          helperText={(errors as any)?.phone?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Phone"
          name="phone"
        />
        <Controller
          control={control}
          name="employeeTypeId"
          rules={{ required: 'This field is required' }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...employeeTypeAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value?.id ?? value);
              }}
              getOptionLabel={(item) =>
                employeeTypeAutocompleteProps?.options?.find(
                  (p) => p?.id?.toString() === (item?.id ?? item)?.toString()
                )?.name ?? ''
              }
              isOptionEqualToValue={(option, value) =>
                value === undefined || option?.id?.toString() === (value?.id ?? value)?.toString()
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Employee Type"
                  margin="normal"
                  variant="outlined"
                  error={!!(errors as any)?.employeeTypeId}
                  helperText={(errors as any)?.employeeTypeId?.message}
                  required
                />
              )}
            />
          )}
        />
        <Controller
          control={control}
          name="isActive"
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <FormControlLabel
              label="Is Active"
              control={
                <Checkbox
                  {...field}
                  checked={field.value}
                  onChange={(event) => {
                    field.onChange(event.target.checked);
                  }}
                />
              }
            />
          )}
        />
      </Box>
    </Create>
  );
};
