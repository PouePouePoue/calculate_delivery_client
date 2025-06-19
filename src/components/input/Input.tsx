import React, { FC, useState } from 'react';
import styles from  "./Input.module.scss"

interface InputProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}

const Input: FC<InputProps> = ({
  value = '',
  onChange,
  placeholder = '',
  type = 'text',
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    
        <input className={styles.Input}
          type={type}
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
        />
    
  );
};

export default Input;