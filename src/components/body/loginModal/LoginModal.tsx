import React, { useEffect, useRef, useState } from 'react';
import styles from './LoginModal.module.scss';
import Buttons from '../../buttons/Buttons';
import { Link } from 'react-router-dom';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void; // Опциональный колбэк при успешном входе
}

interface ServerError {
  message: string;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.classList.add(styles.modalOpen);
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.classList.remove(styles.modalOpen);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Проверка валидности формы
  useEffect(() => {
    const checkFormValidity = () => {
      const fieldsFilled = formData.email.trim() !== '' && formData.password.trim() !== '';
      const noErrors = errors.email === '' && errors.password === '';
      setIsFormValid(fieldsFilled && noErrors);
    };

    checkFormValidity();
  }, [formData, errors]);

  // Очистка формы при открытии модального окна
  useEffect(() => {
    if (isOpen) {
      setFormData({ email: '', password: '' });
      setErrors({ email: '', password: '' });
      setServerError(null);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    if (serverError) setServerError(null);
  };

  const validateField = (fieldName: string, value: string) => {
    let errorMessage = '';
    
    switch (fieldName) {
      case 'email':
        if (!value) {
          errorMessage = 'Email обязателен';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          errorMessage = 'Некорректный формат email';
        }
        break;
        
      case 'password':
        if (!value) {
          errorMessage = 'Пароль обязателен';
        } else if (value.length < 8) {
          errorMessage = 'Минимум 8 символов';
        } else if (!/[A-Za-z]/.test(value)) {
          errorMessage = 'Должен содержать буквы';
        } else if (!/\d/.test(value)) {
          errorMessage = 'Должен содержать цифры';
        }
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [fieldName]: errorMessage
    }));
  };

  const validateForm = (): boolean => {
    validateField('email', formData.email);
    validateField('password', formData.password);
    
    return errors.email === '' && errors.password === '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setServerError(null);
    
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Ошибка входа');
      }
      
      // Успешная авторизация
      console.log('Успешный вход:', data);
      
      // Закрываем модальное окно
      onClose();
      
      // Вызываем колбэк успешного входа, если он предоставлен
      if (onLoginSuccess) onLoginSuccess();
      
    } catch (error: any) {
      console.error('Ошибка входа:', error);
      setServerError(error.message || 'Произошла ошибка при входе');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} ref={modalRef}>
        <button className={styles.modalClose} onClick={onClose}>
          &times;
        </button>
        
        <h2 className={styles.modalTitle}>Вход на сайт</h2>
        
        <form className={styles.modalForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              placeholder="Введите ваш email" 
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? styles.inputError : ''}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <div id="email-error" className={styles.errorMessage}>
                {errors.email}
              </div>
            )}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password">Пароль</label>
            <input 
              type="password" 
              id="password" 
              name="password"
              placeholder="Введите пароль" 
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? styles.inputError : ''}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password && (
              <div id="password-error" className={styles.errorMessage}>
                {errors.password}
              </div>
            )}
          </div>
          
          {serverError && (
            <div className={styles.serverError}>
              {serverError}
            </div>
          )}
          
          <div className={styles.buttonEnter}>
            <Buttons 
              text={isSubmitting ? "Вход..." : "Войти"} 
              onClick={() => alert('submit')}
              disabled={!isFormValid || isSubmitting} 
            />
          </div>
          
          <div className={styles.registerLink}>
            Ещё нет аккаунта? <Link to='/register' onClick={onClose}>Зарегистрироваться</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;