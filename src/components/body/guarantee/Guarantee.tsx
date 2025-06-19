import React from "react";
import styles from "./Guarantee.module.scss"
import Certificate from "./certificate/Сertificate"

const Guarantee = () => {
    return (
        <div className={styles.guarantee}>
            <div className={styles.textBlock}>
                <p className={styles.guaranteeTitle}> Гарантии качества</p>
                <p className={styles.guaranteeText}>Наши гарантии качества включают в себя полный спектр документов, необходимых для ввоза и вывоза товаров, а также для успешного бизнеса на мировом рынке. </p>
            </div>
            <div className={styles.certificateBlock}>
                <div className={styles.guaranteeImg}> <Certificate /> </div>
            </div>
            
        </div>
    )
}

export default Guarantee