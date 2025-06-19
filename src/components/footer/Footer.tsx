import React from "react";
import styles from "./Footer.module.scss"
import Logo from "../header/logo/Logo";
import Navigation from "../header/navigation/Navigation";

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.content}>
                <Logo />
                <Navigation />
            </div>
            <div className={styles.text}>
                НЕ ЯВЛЯЕТСЯ ПУБЛИЧНОЙ ОФЕРТОЙ. Просим обратить внимание на то, что цены носят информационный и ознакомительный характер, а значит ни в какой мере не являются публичной офертой, которая определена в ст. 437 ГК РФ. Вся информация на сайте может содержать неточности, орфографические и иные ошибки, она не является полной, окончательно и исчерпывающей
            </div>
        </div>
    )
}

export default Footer;