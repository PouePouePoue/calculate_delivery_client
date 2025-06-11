import React from "react";
import styles from "./Logo.module.scss";
import logo from './logo.png';

const Logo = () => {

    return (
    <div className={styles.logo}>
        <img src={logo} className={styles.companyLogo} alt="logo" /> 
        <div className={styles.companyName}> FromBoard Delivery</div>
    </div>
    )
    

}

export default Logo;