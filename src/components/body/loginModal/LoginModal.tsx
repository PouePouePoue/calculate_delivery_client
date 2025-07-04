import React, { useEffect, useRef } from 'react';
import styles from './LoginModal.module.scss';
import Buttons from '../../buttons/Buttons';
import { Link, Route, Routes } from 'react-router-dom';
import Register from '../../../pages/RegisterPage';


interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

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

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} ref={modalRef}>
        <button className={styles.modalClose} onClick={onClose}>
          &times;
        </button>
        
        <h2 className={styles.modalTitle}>Вход на сайт</h2>
        
        <form className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Введите ваш email" 
              required 
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password">Пароль</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Введите пароль" 
              required 
            />
          </div>
          
          
          <div className={styles.buttonEnter}><Buttons text="Войти" onClick={() => alert('submit')} /></div>
          
          <div className={styles.registerLink}>
            Ещё нет аккаунта? <Link to='/register'>Зарегистрироваться</Link>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;