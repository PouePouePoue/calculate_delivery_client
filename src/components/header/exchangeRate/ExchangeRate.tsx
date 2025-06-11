import React from "react";
import styles from "./ExchangeRate.module.scss"


const ExchangeRate = () => {
    return (
        
        <div className={styles.exchangeRate}>
            <div className={styles.vector}>
            <p className={styles.exchangeRateText}>Доставляем товары из заграницы в Россию</p> 
            <p className={styles.exchangeRateText}>   Стоимость от 550 рублей за заказ  </p>
            <p className={styles.exchangeRateText}>1 $ = 93 ₽ | 1 € = 99 ₽ | 1 ¥ = 13 ₽</p>
             </div>
        </div>
        
    )
}

export default ExchangeRate;