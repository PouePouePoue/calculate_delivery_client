import React from "react";
import styles from "./Header.module.scss";
import Logo from "./logo/Logo"   
import Navigation from "./navigation/Navigation";
import ExchangeRate from "./exchangeRate/ExchangeRate";
import Buttons from "../buttons/Buttons";

const Header = () => {

    return (
        <header className={styles.header}> 
            
                <div className={styles.leftSide}>
                    <Logo />
                    <Navigation />
                </div>
                <div className={styles.rightSide}> 
                    <ExchangeRate /> 
                    <div className={styles.buttonsStyle}>
                        <Buttons text="Войти" onClick={() => alert('login')} />
                        <Buttons text="Оставить заявку" onClick={() => alert('submit')} />
                    </div>
                </div>
            
        </header>
    )
}

export default Header;