import React, { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import Logo from "./logo/Logo";   
import Navigation from "./navigation/Navigation";
import ExchangeRate from "./exchangeRate/ExchangeRate";
import Buttons from "../buttons/Buttons";
import LoginModal from "../body/loginModal/LoginModal";
import CurrencyExchangeRates from "./currencyExchangeRates/CurrencyExchangeRates";
import { useNavigate } from "react-router-dom";

// Импортируем иконку профиля (замените на реальный путь)
import ProfileIcon from "../profileIcon/ProfileIcon";

const Header: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();

  // Проверяем статус аутентификации при загрузке компонента
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    const userDataStr = localStorage.getItem("userData");
    
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
    
    if (userDataStr) {
      setUserData(JSON.parse(userDataStr));
    }
  }, []);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLoginSuccess = (userData: any) => {
    setIsAuthenticated(true);
    setUserData(userData);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userData", JSON.stringify(userData));
    closeLoginModal();
    
    // Перенаправляем на соответствующую страницу
    if (userData.isAdmin) {
      navigate("/admin");
    } else {
      navigate("/authorized");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    setIsProfileDropdownOpen(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userData");
    navigate("/"); // Перенаправляем на главную страницу
  };

  const handleProfileClick = () => {
    navigate("/profile"); // Перенаправляем на страницу профиля
    setIsProfileDropdownOpen(false);
  };

  // Закрываем выпадающее меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.querySelector(`.${styles.profileDropdown}`);
      const profileIcon = document.querySelector(`.${styles.profileIcon}`);
      
      if (dropdown && profileIcon && 
          !dropdown.contains(event.target as Node) && 
          !profileIcon.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className={styles.header}> 
        <div className={styles.content}>
          <div className={styles.leftSide}>
            <Logo />
          </div>
          <Navigation />
          <div className={styles.rightSide}> 
            <CurrencyExchangeRates />
            <div className={styles.authSection}>
              {/* Условный рендеринг: если пользователь авторизован, показываем иконку профиля, иначе - кнопку входа */}
              {isAuthenticated ? (
                <div className={styles.profileContainer}>
                  <div 
                    className={styles.profileIcon} 
                    onClick={toggleProfileDropdown}
                  >
                    <ProfileIcon />
                    {userData && (
                      <span className={styles.userName}>
                        {userData.fullName || userData.email}
                      </span>
                    )}
                  </div>
                  
                  {isProfileDropdownOpen && (
                    <div className={styles.profileDropdown}>
                      <div 
                        className={styles.dropdownItem}
                        onClick={handleProfileClick}
                      >
                        Мой профиль
                      </div>
                      {userData?.isAdmin && (
                        <div 
                          className={styles.dropdownItem}
                          onClick={() => {
                            navigate("/admin");
                            setIsProfileDropdownOpen(false);
                          }}
                        >
                          Панель администратора
                        </div>
                      )}
                      <div 
                        className={styles.dropdownItem}
                        onClick={handleLogout}
                      >
                        Выйти
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className={styles.buttonsStyle}>
                  <Buttons text="Войти" onClick={openLoginModal} />
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={closeLoginModal} 
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}

export default Header;