import React from "react";
import styles from './AboutUs.module.scss'
import AboutUsContent from "./aboutUsContent/AboutUsContent";

const AboutUs = () => {
    return (
        <div className={styles.aboutUs}>
            <div className={styles.aboutUsTitle}>Наши преимущества</div>
            <div className={styles.AboutUsContent}><AboutUsContent /></div>
        </div>
    )
}

export default AboutUs;