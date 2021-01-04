import React, { forwardRef, Ref } from 'react';
import { FieldError } from 'react-hook-form';
import './InputComponent.scss';

export interface InputComponentProps {
  error?: FieldError | undefined;
}
export const InputComponent = forwardRef(
  (
    {
      value,
      className,
      error,
      placeholder,
      type,
      name,
    }: React.InputHTMLAttributes<any> & InputComponentProps,
    ref: Ref<HTMLInputElement>
  ) => (
    <div className={`form-field ${className}`}>
      <input
        name={name}
        value={value}
        className={`${className} ${error ? 'invalid' : ''}`}
        type={type}
        placeholder={placeholder}
        ref={ref}
      />
      {error && <span className="error">{error.message}</span>}
    </div>
  )
);
