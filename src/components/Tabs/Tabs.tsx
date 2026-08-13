import React from 'react';
import clsx from 'clsx';
import styles from './Tabs.module.css';

interface TabsContextType {
  activeValue: string;
  onChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextType | undefined>(undefined);

export interface TabsProps {
  defaultValue: string;
  value?: string;
  onChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  defaultValue,
  value,
  onChange,
  children,
  className,
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);

  const activeValue = value !== undefined ? value : internalValue;
  
  const handleValueChange = React.useCallback(
    (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [value, onChange]
  );

  return (
    <TabsContext.Provider value={{ activeValue, onChange: handleValueChange }}>
      <div className={clsx(styles.tabs, className)}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={clsx(styles.list, className)} role="tablist" {...props} />
  )
);
TabsList.displayName = 'TabsList';

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, ...props }, ref) => {
    const context = React.useContext(TabsContext);
    if (!context) throw new Error('TabsTrigger must be used within Tabs');

    const isActive = context.activeValue === value;

    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={isActive}
        className={clsx(styles.trigger, isActive && styles.active, className)}
        onClick={() => context.onChange(value)}
        {...props}
      />
    );
  }
);
TabsTrigger.displayName = 'TabsTrigger';

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const context = React.useContext(TabsContext);
    if (!context) throw new Error('TabsContent must be used within Tabs');

    if (context.activeValue !== value) return null;

    return (
      <div ref={ref} role="tabpanel" className={clsx(styles.content, className)} {...props}>
        {children}
      </div>
    );
  }
);
TabsContent.displayName = 'TabsContent';
