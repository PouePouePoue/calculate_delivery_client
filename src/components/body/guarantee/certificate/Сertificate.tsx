import React from "react";
import styles from "./Сertificate.module.scss"
import {CERTIFICATE} from "../../../../constants/index.constants"
import CertificateBlock from "./certificateBlock/CertificateBlock"
const Сertificate = () => {
    return (
        <div className={styles.certificate}>
            {
                CERTIFICATE && 
                CERTIFICATE?.map((item,index)=>{
                    return (

                        <div key = {'Sertificate_block_' + index}><CertificateBlock img = {item.img} text = {item.text}/></div>
                    )
                })
            }
            
        </div>
    )
}

export default Сertificate;