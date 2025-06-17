import React from "react";
import styles from "./Body.module.scss"
import BodyText from "./bodyText/BodyText";
import Calculate from "./calculate/Calculate";
import AboutUs from "./aboutUs/AboutUs";
const Body = () => {
    return (
        <div className={styles.body}>
            <div className={styles.content}>
                <div className={styles.calculateSide}>
                    <BodyText /> 
                    <Calculate />
                </div>
                <div className={styles.aboutUsSide}>
                    <AboutUs />
                </div>
            </div>   
        </div>
    )
}

export default Body;