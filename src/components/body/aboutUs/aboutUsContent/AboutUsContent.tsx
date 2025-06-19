import React from "react";
import styles from './AboutUsContent.module.scss'
import first from "./photo/1.png"
import second from './photo/2.png';
import third from './photo/3.png';
import fourth from './photo/4.png';
import fifth from './photo/5.png';
import sixth from './photo/6.png';

const AboutUsContent = () => {
    return (
        <div className={styles.aboutUsContent}>
             <div className={styles.block}>
                <img src={first} className={styles.firstImg} alt="logo" /> 
                <div className={styles.aboutUsContentBoxText}>
                    <p className={styles.aboutUsContentTitle}>Растоможка груза</p>
                    <p className={styles.aboutUsContentText}>Мы берём на себя все формальности и бумажную волокиту, связанную с растаможкой груза</p>
                </div>

            </div>
             <div className={styles.block}>
                <img src={second} className={styles.firstImg} alt="logo" /> 
                <div className={styles.aboutUsContentBoxText}>
                    <p className={styles.aboutUsContentTitle}>Надёжная упаковка</p>
                    <p className={styles.aboutUsContentText}>Все товары упаковываются нашими специалистами с особым вниманием к деталям, гарантируя, что они дойдут в безопасности и в отличном состоянии</p>
                </div>

            </div>
            <div className={styles.block}>
                <img src={third} className={styles.firstImg} alt="logo" /> 
                <div className={styles.aboutUsContentBoxText}>
                    <p className={styles.aboutUsContentTitle}>Быстро и выгодно</p>
                    <p className={styles.aboutUsContentText}>Мы предлагаем быструю и выгодную доставку, чтобы вы могли насладиться покупками как можно скорее.</p>
                </div>

            </div>
            <div className={styles.block}>
                <img src={fourth} className={styles.firstImg} alt="logo" /> 
                <div className={styles.aboutUsContentBoxText}>
                    <p className={styles.aboutUsContentTitle}>Удобный сервис</p>
                    <p className={styles.aboutUsContentText}>Стремимся сделать процесс доставки максимально удобным для вас, чтобы опыт остался приятным и беззаботным</p>
                </div>

            </div>
            <div className={styles.block}>
                <img src={fifth} className={styles.firstImg} alt="logo" /> 
                <div className={styles.aboutUsContentBoxText}>
                    <p className={styles.aboutUsContentTitle}>Прозрачность работы</p>
                    <p className={styles.aboutUsContentText}>Мы предоставляем полный контроль над каждым этапом доставки, от момента заказа до момента прибытия заказа</p>
                </div>

            </div>
            <div className={styles.block}>
                <img src={sixth} className={styles.firstImg} alt="logo" /> 
                <div className={styles.aboutUsContentBoxText}>
                    <p className={styles.aboutUsContentTitle}>Страхование груза</p>
                    <p className={styles.aboutUsContentText}>Наше страхование обеспечивает полную защиту и покрытие почти все неприятные и неожиданные ситуации</p>
                </div>

            </div>
        </div>
    )
}

export default AboutUsContent;