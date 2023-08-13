/* eslint-disable react/jsx-props-no-spreading */
import { FormHelperText, FormControl, TextField, TextFieldProps } from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type IFormInputProps = {
  name: string;
  label: string;
  autoComplete?: string;
  helperText?: string;
} & TextFieldProps;

const FormInput: FC<IFormInputProps> = ({
  name,
  label,
  autoComplete,
  helperText,
  ...otherProps
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue=""
      name={name}
      render={({ field }) => (
        <FormControl fullWidth sx={{ m: 0 }}>
          <TextField
            {...field}
            margin="normal"
            fullWidth
            id={name}
            label={label}
            name={name}
            autoComplete={autoComplete}
            error={!!errors[name]}
            // {...register('email')}
            {...otherProps}
          />
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
          <FormHelperText error={!!errors[name]}>
            {String(errors[name]?.message ?? '')}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default FormInput;
