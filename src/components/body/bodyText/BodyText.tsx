import React from "react";
import styles from "./BodyText.module.scss"
import box from "./box.jpg"

const BodyText = () => {
    return (
        <div className={styles.bodyText}>
            <p className={styles.bodyTextTitle}>Без проблемная доставка купленных вещей из США, Европы и Азии в Россию</p>
            <p className={styles.bodyTextContent}>Сэкономьте на покупках и наслаждайтесь мировыми брендами — наш сервис позволяет вам легко и удобно заказывать товары со всего мира и получать их в России</p>
            <img src={box} className={styles.bodyTextImg} alt="box" /> 
        </div>
    )
}

export default BodyText;