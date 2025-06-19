import React from "react";
import styles from "./Body.module.scss"
import BodyText from "./bodyText/BodyText";
import Calculate from "./calculate/Calculate";
import AboutUs from "./aboutUs/AboutUs";
import Guarantee from "./guarantee/Guarantee";

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
                <div className={styles.GuaranteeSide}>
                    <Guarantee />
                </div>
            </div>   
        </div>
    )
}

export default Body;