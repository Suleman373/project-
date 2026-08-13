import React from 'react';
import clsx from 'clsx';
import styles from './Input.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helpText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId();
    
    return (
      <div className={clsx(styles.wrapper, fullWidth && styles.fullWidth, className)}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        
        <div className={styles.inputContainer}>
          {leftIcon && <span className={clsx(styles.icon, styles.leftIcon)}>{leftIcon}</span>}
          
          <input
            id={inputId}
            ref={ref}
            className={clsx(
              styles.input,
              error && styles.errorInput,
              leftIcon && styles.hasLeftIcon,
              rightIcon && styles.hasRightIcon
            )}
            aria-invalid={!!error}
            {...props}
          />
          
          {rightIcon && <span className={clsx(styles.icon, styles.rightIcon)}>{rightIcon}</span>}
        </div>
        
        {(error || helpText) && (
          <p className={clsx(styles.subtext, error ? styles.errorText : styles.helpText)}>
            {error || helpText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
