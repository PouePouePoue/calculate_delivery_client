import React from "react";
import styles from './AboutUsContent.module.scss'
import first from "./photo/1.png"
import second from './photo/2.png';
import third from './photo/3.png';
import fourth from './photo/4.png';
import fifth from './photo/5.png';
import sixth from './photo/6.png';
import {ABOUT_US_INFO} from "../../../../constants/index.constants"
import AboutUsBlock from "./aboutUsBlock/AboutUsBlock";

const AboutUsContent = () => {
    return (
        <div className={styles.aboutUsContent}>
            {
                ABOUT_US_INFO && 
                ABOUT_US_INFO?.map((item, index) => {
                    return (
                        
                        <div className={styles.block}>
                            <AboutUsBlock img={item.img} title={item.title} text={item.text} />

                            
                        </div>  
                    )
                } )
            }
            
        </div>
    )
}

export default AboutUsContent;