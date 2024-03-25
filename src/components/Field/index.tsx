import { ChangeEvent } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FieldProps {
  label: string;
  type?: string;
  placeholder: string;
  id: string;
  register?: UseFormRegisterReturn;
  disabled?: boolean;
  className?: string;
  error?: string;
  max?: string | number | undefined;
  maxLength?: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  defaultValue?: string | number | undefined;
  labelClass?: string | undefined;
}
export function Field({
  type = 'text',
  placeholder,
  id,
  label,
  register,
  disabled,
  className,
  max,
  maxLength,
  onChange,
  required,
  defaultValue,
  error,
  labelClass,
}: FieldProps) {
  return (
    <>
      {label && (
        <label htmlFor={id} className={`label ${labelClass}`}>
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        name={id}
        aria-label={placeholder}
        {...register}
        disabled={disabled}
        className={`w-full mb-8 ${className} ${!disabled && 'shadow-webkit'}`}
        required={required}
        defaultValue={defaultValue}
        onInput={onChange}
        max={max}
        maxLength={maxLength}
      />
      {error && <small className="error">{error}</small>}
    </>
  );
}
