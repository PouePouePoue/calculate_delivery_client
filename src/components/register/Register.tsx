import React, { useState } from "react";
import styles from "./Register.module.scss"
import Logo from "../header/logo/Logo";
import Input from "../input/Input";
import Buttons from "../buttons/Buttons";

const Register = () =>{
    const [inputValue, setInputValue] = useState<string>('');
    return (
        <div className={styles.registerPage}>
            <div className={styles.registerContainer}>
                <div className={styles.registerContent}>
                    <p className={styles.registerLogo}><Logo /></p>
                    <div className={styles.registerInput}>
                        <Input value={inputValue}
                        onChange={setInputValue}
                        placeholder="ФИО" />
                        <Input value={inputValue}
                        onChange={setInputValue}
                        placeholder="Почта" />
                        <Input value={inputValue}
                        onChange={setInputValue}
                        placeholder="Пароль" />
                        <Input value={inputValue}
                        onChange={setInputValue}
                        placeholder="Подтвердите пароль" />
                    </div>
                    <p className={styles.registerBtn}><Buttons text="Зарегестрироваться" onClick={() => alert('submit')} /></p>
                </div>
            </div>
        </div>
    )
}

export default Register