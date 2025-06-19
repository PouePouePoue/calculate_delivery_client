import React from "react";
import styles from './AboutUsContent.module.scss'
import first from "./photo/1.png"
import second from './photo/2.png';
import third from './photo/3.png';
import fourth from './photo/4.png';
import fifth from './photo/5.png';
import sixth from './photo/6.png';
import {ABOUT_US_INFO} from "../../../../constants/index.constants"

const AboutUsContent = () => {
    return (
        <div className={styles.aboutUsContent}>
            {
                ABOUT_US_INFO && 
                ABOUT_US_INFO?.map((item, index) => {
                    return (
                        <div className={styles.block}>
                            <img src={item.img} className={styles.firstImg} alt="logo" /> 
                            <div className={styles.aboutUsContentBoxText}>
                                <p className={styles.aboutUsContentTitle}>{item.title}</p>
                                <p className={styles.aboutUsContentText}>{item.text}</p>
                            </div>
                        </div>  
                    )
                } )
            }
            
        </div>
    )
}

export default AboutUsContent;