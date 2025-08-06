import React, { useState } from "react";
import styles from "./Register.module.scss";
import Logo from "../header/logo/Logo";
import Input from "../input/Input";
import Buttons from "../buttons/Buttons";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  showPassword: boolean;
  onToggleShowPassword: () => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  placeholder,
  showPassword,
  onToggleShowPassword
}) => {
  return (
    <div className={styles.passwordContainer}>
      <Input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <button
        type="button"
        className={styles.toggleButton}
        onClick={onToggleShowPassword}
      >
        {showPassword ? "Скрыть" : "Показать"}
      </button>
    </div>
  );
};

const Register = () => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    passwordMatch: ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverMessage, setServerMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const isPasswordValid = (pwd: string): boolean => {
    return pwd.length >= 8 && 
           /[a-zA-Zа-яА-Я]/.test(pwd) &&
           /\d/.test(pwd);
  };

  const handleFullNameChange = (value: string) => {
    if (/^[а-яА-ЯёЁ\s\-]*$/.test(value)) {
      setFullName(value);
    }
    
    if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }));
  };

  const handleFullNameBlur = () => {
    const trimmed = fullName.trim();
    setFullName(trimmed);
    if (!trimmed) {
      setErrors(prev => ({ ...prev, fullName: 'ФИО не может быть пустым' }));
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
  };

  const handleEmailBlur = () => {
    if (email && !validateEmail(email)) {
      setErrors(prev => ({ ...prev, email: 'Некорректный формат email' }));
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    
    if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
    if (errors.passwordMatch) setErrors(prev => ({ ...prev, passwordMatch: '' }));
    
    if (value && !isPasswordValid(value)) {
      setErrors(prev => ({
        ...prev,
        password: 'Пароль должен содержать минимум 8 символов, буквы и цифры'
      }));
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (errors.passwordMatch) setErrors(prev => ({ ...prev, passwordMatch: '' }));
  };

  const handleSubmit = async () => {
    let hasErrors = false;
    const newErrors = { ...errors };
    
    const trimmedFullName = fullName.trim();
    setFullName(trimmedFullName);
    
    if (!trimmedFullName) {
      newErrors.fullName = 'ФИО не может быть пустым';
      hasErrors = true;
    }
    
    if (!validateEmail(email)) {
      newErrors.email = 'Некорректный формат email';
      hasErrors = true;
    }
    
    if (!isPasswordValid(password)) {
      newErrors.password = 'Пароль должен содержать минимум 8 символов, буквы и цифры';
      hasErrors = true;
    }
    
    if (password !== confirmPassword) {
      newErrors.passwordMatch = 'Пароли не совпадают';
      hasErrors = true;
    }

    setErrors(newErrors);
    
    if (hasErrors) return;
    
    setIsLoading(true);
    setServerMessage(null);
    
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: trimmedFullName,
          email,
          password
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Ошибка регистрации');
      }
      
      setServerMessage({
        type: 'success',
        text: 'Регистрация успешна!'
      });
      
      // Очистка формы после успешной регистрации
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      
    } catch (error: any) {
      setServerMessage({
        type: 'error',
        text: error.message || 'Произошла ошибка при отправке данных'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = 
    fullName.trim() !== '' && 
    validateEmail(email) && 
    isPasswordValid(password) && 
    password === confirmPassword;

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerContainer}>
        <div className={styles.registerContent}>
          <Logo />
          <div className={styles.registerInput}>
            {/* Поле ФИО */}
            <div className={styles.inputGroup}>
              <div className={`${styles.inputWrapper} ${styles.withButton}`}>
                <Input 
                  value={fullName}
                  onChange={handleFullNameChange}
                  onBlur={handleFullNameBlur}
                  placeholder="ФИО"
                />
              </div>
              {errors.fullName && <div className={styles.error}>{errors.fullName}</div>}
            </div>
            
            {/* Поле Email */}
            <div className={styles.inputGroup}>
              <div className={`${styles.inputWrapper} ${styles.withButton}`}>
                <Input 
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  placeholder="Почта"
                />
              </div>
              {errors.email && <div className={styles.error}>{errors.email}</div>}
            </div>
            
            {/* Поле Пароль */}
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <PasswordInput
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Пароль"
                  showPassword={showPassword}
                  onToggleShowPassword={() => setShowPassword(!showPassword)}
                />
              </div>
              {errors.password && <div className={styles.error}>{errors.password}</div>}
            </div>
            
            {/* Поле Подтверждения пароля */}
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <PasswordInput
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="Подтвердите пароль"
                  showPassword={showConfirmPassword}
                  onToggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              </div>
              {errors.passwordMatch && <div className={styles.error}>{errors.passwordMatch}</div>}
            </div>
          </div>
          
          {/* Кнопка регистрации */}
          <Buttons 
            text={isLoading ? "Отправка..." : "Зарегистрироваться"} 
            onClick={handleSubmit}
            disabled={!isFormValid || isLoading}
          />

          {/* Сообщение от сервера */}
          {serverMessage && (
            <div className={
              serverMessage.type === 'success' 
                ? styles.successMessage 
                : styles.errorMessage
            }>
              {serverMessage.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;