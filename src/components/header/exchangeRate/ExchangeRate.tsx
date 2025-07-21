import React from "react";
import styles from "./ExchangeRate.module.scss"


const ExchangeRate = () => {
    return (
        
        <div className={styles.exchangeRate}>
            <div className={styles.vector}>
            <p className={styles.exchangeRateText}>1 $ = 93 ₽ | 1 € = 99 ₽ | 1 ¥ = 13 ₽</p>
             </div>
        </div>
        
    )
}

export default ExchangeRate;