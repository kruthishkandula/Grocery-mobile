import React from 'react';
import { Controller } from 'react-hook-form';
import FloatingLabelInput, { FloatingLabelInputProps } from './FloatingLabelInput';





interface FormFieldProps extends FloatingLabelInputProps {
  control: any;
  name: string;
  placeholder: string;
  rules?: object;
  [key: string]: any;
  noError?: boolean; // Optional prop to disable error display
  required?: boolean; // Optional prop to indicate if the field is required
}



export const FormField: React.FC<FormFieldProps> = ({
  control,
  name,
  placeholder,
  rules = {},
  noError = false, // Default to false, meaning errors will be shown unless specified otherwise
  isEnglish = true, // Default to English for error messages
  required,
  ...inputProps
}) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({
      field: { onChange, onBlur, value },
      fieldState: { error },
    }) => {

      return (
        <FloatingLabelInput
          onBlur={onBlur}
          error={error?.message}
          placeholder={required ? `${placeholder} *` : placeholder}
          {...inputProps}
          onChangeText={onChange}
          value={value}
        />
      )
    }}
  />
);
