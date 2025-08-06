import React, { useState, useEffect } from 'react';
import styles from './CurrencyExchangeRates.module.scss';

interface CurrencyRate {
  code: string;
  symbol: string;
  rate: number;
}

interface ApiResponse {
  Valute: {
    USD: { Value: number };
    EUR: { Value: number };
    CNY: { Value: number };
  };
}

const CurrencyExchangeRates: React.FC = () => {
  const [rates, setRates] = useState<CurrencyRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
        
        if (!response.ok) {
          throw new Error(`Ошибка HTTP! Статус: ${response.status}`);
        }
        
        const data: ApiResponse = await response.json();
        
        setRates([
          { code: 'USD', symbol: '$', rate: data.Valute.USD.Value },
          { code: 'EUR', symbol: '€', rate: data.Valute.EUR.Value },
          { code: 'CNY', symbol: '¥', rate: data.Valute.CNY.Value } 
        ]);
        
        setError(null);
      } catch (err) {
        setError('Ошибка загрузки данных');
        console.error('Ошибка получения курсов:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className={styles.container}>Загрузка курсов...</div>;
  }

  if (error) {
    return <div className={`${styles.container} ${styles.error}`}>{error}</div>;
  }

  return (
    <div className={styles.exchangeRate}>
        <div className={styles.vector}>
            {rates.map((currency, index) => (
                <React.Fragment key={currency.code}>
                
                <span className={styles.exchangeRateText}>
                    1 {currency.symbol} = {currency.rate.toFixed(2)} ₽
                </span>
                {index < rates.length - 1 && <span className={styles.separator}>|</span>}
                </React.Fragment>
            ))}
        </div>
    </div>
  );
};

export default CurrencyExchangeRates;