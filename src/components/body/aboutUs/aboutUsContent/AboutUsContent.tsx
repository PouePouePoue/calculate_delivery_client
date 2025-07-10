import React from "react";
import styles from './AboutUsContent.module.scss'
import {ABOUT_US_INFO} from "../../../../constants/index.constants"
import AboutUsBlock from "./aboutUsBlock/AboutUsBlock";

const AboutUsContent = () => {
    return (
        <div className={styles.aboutUsContent}>
            {
                ABOUT_US_INFO && 
                ABOUT_US_INFO?.map((item, index) => {
                    return (
                        <div key = {'About_Us_Info_)' + index} className={styles.block}>
                            <AboutUsBlock img={item.img} title={item.title} text={item.text} />
                        </div>  
                    )
                } )
            }
            
        </div>
    )
}

export default AboutUsContent;