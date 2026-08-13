import React from 'react';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import styles from './Select.module.css';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helpText?: string;
  fullWidth?: boolean;
  options: { label: string; value: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      helpText,
      fullWidth = false,
      id,
      options,
      ...props
    },
    ref
  ) => {
    const selectId = id || React.useId();
    
    return (
      <div className={clsx(styles.wrapper, fullWidth && styles.fullWidth, className)}>
        {label && (
          <label htmlFor={selectId} className={styles.label}>
            {label}
          </label>
        )}
        
        <div className={styles.selectContainer}>
          <select
            id={selectId}
            ref={ref}
            className={clsx(
              styles.select,
              error && styles.errorSelect
            )}
            aria-invalid={!!error}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span className={styles.iconWrapper}>
            <ChevronDown className={styles.icon} />
          </span>
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

Select.displayName = 'Select';
