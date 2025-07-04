import React, { useState } from "react";
import styles from "./Header.module.scss";
import Logo from "./logo/Logo";   
import Navigation from "./navigation/Navigation";
import ExchangeRate from "./exchangeRate/ExchangeRate";
import Buttons from "../buttons/Buttons";
import LoginModal from "../body/loginModal/LoginModal";

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
            <Navigation />
          </div>
          <div className={styles.rightSide}> 
            <ExchangeRate /> 
            <div className={styles.buttonsStyle}>
              
              <Buttons text="Войти" onClick={openLoginModal} />
              <Buttons text="Оставить заявку" onClick={() => alert('submit')} />
            </div>
          </div>
        </div>
      </header>
      
      
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </>
  );
}

export default Header;