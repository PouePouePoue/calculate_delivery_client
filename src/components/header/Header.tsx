import React, { useState } from "react";
import styles from "./Header.module.scss";
import Logo from "./logo/Logo";   
import Navigation from "./navigation/Navigation";
import ExchangeRate from "./exchangeRate/ExchangeRate";
import Buttons from "../buttons/Buttons";
import LoginModal from "../body/loginModal/LoginModal";
import CurrencyExchangeRates from "./currencyExchangeRates/CurrencyExchangeRates";

const Header: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

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
            <div className={styles.buttonsStyle}>
              
              <Buttons text="Войти" onClick={openLoginModal} />
            </div>
          </div>
        </div>
      </header>
      
      
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </>
  );
}

export default Header;