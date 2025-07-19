import React, { FC, useState, useEffect } from 'react';
import styles from  "./Input.module.scss"

interface InputProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  onBlur?: () => void; // Добавленный пропс
}

const Input: FC<InputProps> = ({
  value = '',
  onChange,
  placeholder = '',
  type = 'text',
  onBlur // Получаем новый пропс
}) => {
  const [inputValue, setInputValue] = useState(value);

  // Синхронизируем внутреннее состояние с внешним value
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={styles.Input}>
        <input
          type={type}
          value={inputValue}
          onChange={handleChange}
          onBlur={onBlur} // Добавляем обработчик потери фокуса
          placeholder={placeholder}
        />
    </div>
  );
};

export default Input;