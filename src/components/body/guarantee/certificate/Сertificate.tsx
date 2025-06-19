import React from "react";
import styles from "./Сertificate.module.scss"
import {CERTIFICATE} from "../../../../constants/index.constants"

const Сertificate = () => {
    return (
        <div className={styles.certificate}>
            {
                CERTIFICATE && 
                CERTIFICATE?.map((item,index)=>{
                    return (
                        <div className={styles.block}>
                            <img src={item.img} className={styles.firstImg} alt="logo" /> 
                            <p className={styles.certificateText}>{item.text}</p>
                         </div>
                    )
                })
            }
            
        </div>
    )
}

export default Сertificate;