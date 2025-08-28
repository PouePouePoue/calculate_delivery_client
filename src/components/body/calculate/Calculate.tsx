import React, { FC, useState } from "react";
import styles from "./Calculate.module.scss";
import Input from "../../input/Input";
import Buttons from "../../buttons/Buttons";
import LoginModal from "../loginModal/LoginModal";

interface CalculateProps {
  isAuthenticated: boolean;
  onLoginSuccess?: () => void;
}

const Calculate: FC<CalculateProps> = ({ isAuthenticated, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    purchaseCountry: '',
    purchaseCity: '',
    deliveryCity: '',
    area: '',
    weight: ''
  });
  
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [serverMessage, setServerMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Список реальных стран и городов для проверки (можно расширить)
  const validCountries = ['Россия', 'США', 'Китай', 'Германия', 'Франция', 'Италия', 'Турция'];
  const validCities = ['Москва', 'Санкт-Петербург', 'Нью-Йорк', 'Лос-Анджелес', 'Пекин', 'Шанхай', 'Берлин', 'Париж', 'Рим', 'Стамбул'];

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'name':
        if (!/^[а-яА-ЯёЁ\s\-]+$/.test(value)) {
          return 'Имя должно содержать только русские буквы, пробелы и дефисы';
        }
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Введите корректный email адрес';
        }
        break;
      case 'phone':
        // Российский номер телефона: +7 или 8, затем 10 цифр
        const cleanedPhone = value.replace(/\D/g, '');
        if (!/^(\+7|7|8)\d{0,10}$/.test(cleanedPhone) || cleanedPhone.length !== 11) {
            return 'Введите корректный российский номер телефона (11 цифр)';
        }
        break;
      case 'purchaseCountry':
        if (value && !validCountries.includes(value)) {
          return 'Укажите действительную страну';
        }
        break;
      case 'purchaseCity':
      case 'deliveryCity':
        if (value && !validCities.includes(value)) {
          return 'Укажите действительный город';
        }
        break;
      case 'area':
      case 'weight':
        if (value && !/^\d*\.?\d+$/.test(value)) {
          return 'Поле должно содержать только числа';
        }
        break;
      default:
        break;
    }
    return '';
  };

  const handleInputChange = (field: string, value: string) => {
  // Очистка ошибки при изменении поля
  if (fieldErrors[field]) {
    const newErrors = {...fieldErrors};
    delete newErrors[field];
    setFieldErrors(newErrors);
  }

  // Специальная обработка для телефона
  if (field === 'phone') {
    // Оставляем только цифры и знак +
    let cleanedValue = value.replace(/[^\d+]/g, '');
    
    // Форматирование номера
    if (cleanedValue.startsWith('+7')) {
      // Уже в правильном формате, ограничиваем длину
      value = cleanedValue.slice(0, 12);
    } else if (cleanedValue.startsWith('8') && cleanedValue.length <= 11) {
      // Преобразуем 8 в +7
      value = '+7' + cleanedValue.slice(1, 11);
    } else if (cleanedValue.startsWith('7') && cleanedValue.length <= 11) {
      // Преобразуем 7 в +7
      value = '+' + cleanedValue.slice(0, 11);
    } else if (!cleanedValue.startsWith('+')) {
      // Если номер не начинается с +, добавляем +7
      value = '+7' + cleanedValue.slice(0, 10);
    } else {
      // Для других случаев (например, международные номера)
      value = cleanedValue;
    }
  }

  setFormData(prev => ({
    ...prev,
    [field]: value
  }));
};

  const handleBlur = (field: string, value: string) => {
    const error = validateField(field, value);
    if (error) {
      setFieldErrors(prev => ({...prev, [field]: error}));
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) {
        errors[field] = error;
      }
    });
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    // Проверяем валидность формы
    if (!validateForm()) {
      setServerMessage({
        type: 'error',
        text: 'Пожалуйста, исправьте ошибки в форме'
      });
      return;
    }

    // Проверяем авторизацию
    if (!isAuthenticated) {
      openLoginModal();
      return;
    }

    try {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      
      const response = await fetch('http://localhost:3001/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          user_id: userData.id
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Ошибка при сохранении заявки');
      }
      
      setServerMessage({
        type: 'success',
        text: 'Заявка успешно отправлена!'
      });
      
      // Очищаем форму после успешной отправки
      setFormData({
        name: '',
        email: '',
        phone: '',
        purchaseCountry: '',
        purchaseCity: '',
        deliveryCity: '',
        area: '',
        weight: ''
      });
      
    } catch (error: any) {
      setServerMessage({
        type: 'error',
        text: error.message || 'Произошла ошибка при отправке данных'
      });
    }
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLoginSuccess = () => {
    closeLoginModal();
    if (onLoginSuccess) onLoginSuccess();
    handleSubmit();
  };

  return (
    <div className={styles.calculateDelivery}>
      <div className={styles.calculateTextBox}>
        <p className={styles.calculateTitle}>Калькулятор доставки</p>
        <p className={styles.calculateText}>Посчитайте, сколько будет стоить перевозка покупки из зарубежа</p>
      </div>
      <div className={styles.calculateInput}>
        <p> 
          <Input 
            value={formData.name}
            onChange={(value) => handleInputChange('name', value)}
            onBlur={() => handleBlur('name', formData.name)}
            placeholder="Имя"  
          />
          {fieldErrors.name && <span className={styles.errorText}>{fieldErrors.name}</span>}
        </p>
        <p> 
          <Input 
            value={formData.email}
            onChange={(value) => handleInputChange('email', value)}
            onBlur={() => handleBlur('email', formData.email)}
            placeholder="Почта"  
          />
          {fieldErrors.email && <span className={styles.errorText}>{fieldErrors.email}</span>}
        </p>
        <p> 
          <Input 
            value={formData.phone}
            onChange={(value) => handleInputChange('phone', value)}
            onBlur={() => handleBlur('phone', formData.phone)}
            placeholder="Телефон (формат: +79991234567)"  
          />
          {fieldErrors.phone && <span className={styles.errorText}>{fieldErrors.phone}</span>}
        </p>
        <p> 
          <Input 
            value={formData.purchaseCountry}
            onChange={(value) => handleInputChange('purchaseCountry', value)}
            onBlur={() => handleBlur('purchaseCountry', formData.purchaseCountry)}
            placeholder="Страна покупки"  
          />
          {fieldErrors.purchaseCountry && <span className={styles.errorText}>{fieldErrors.purchaseCountry}</span>}
        </p>
        <p> 
          <Input 
            value={formData.purchaseCity}
            onChange={(value) => handleInputChange('purchaseCity', value)}
            onBlur={() => handleBlur('purchaseCity', formData.purchaseCity)}
            placeholder="Город покупки"  
          />
          {fieldErrors.purchaseCity && <span className={styles.errorText}>{fieldErrors.purchaseCity}</span>}
        </p>
        <p> 
          <Input 
            value={formData.deliveryCity}
            onChange={(value) => handleInputChange('deliveryCity', value)}
            onBlur={() => handleBlur('deliveryCity', formData.deliveryCity)}
            placeholder="Город доставки"  
          />
          {fieldErrors.deliveryCity && <span className={styles.errorText}>{fieldErrors.deliveryCity}</span>}
        </p>
        <p> 
          <Input 
            value={formData.area}
            onChange={(value) => handleInputChange('area', value)}
            onBlur={() => handleBlur('area', formData.area)}
            placeholder="Площадь (кв. м)"  
          />
          {fieldErrors.area && <span className={styles.errorText}>{fieldErrors.area}</span>}
        </p>
        <p> 
          <Input 
            value={formData.weight}
            onChange={(value) => handleInputChange('weight', value)}
            onBlur={() => handleBlur('weight', formData.weight)}
            placeholder="Вес (кг)"  
          />
          {fieldErrors.weight && <span className={styles.errorText}>{fieldErrors.weight}</span>}
        </p>
      </div>
      
      {serverMessage && (
        <div className={
          serverMessage.type === 'success' 
            ? styles.successMessage 
            : styles.errorMessage
        }>
          {serverMessage.text}
        </div>
      )}
      
      <div className={styles.buttonsStyles}>
        <Buttons 
          text="Оставить заявку" 
          onClick={handleSubmit} 
        />
      </div>
      
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default Calculate;