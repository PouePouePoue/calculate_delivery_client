import React, { FC, useState } from "react";
import styles from "./Calculate.module.scss"
import Input from "../../input/Input";
import Buttons from "../../buttons/Buttons";

const Calculate = () => {
    const [inputValue, setInputValue] = useState<string>('');
    return (
        <div className={styles.calculateDelivery}>
            <div className={styles.calculateTextBox}>
                <p className={styles.calculateTitle}>Калькулятор доставки</p>
                <p className={styles.calculateText}>Посчитайте, сколько будет стоить перевозка покупки из зарубежа</p>
            </div>
            <div className={styles.calculateInput}>
                <form> <Input 
                    value={inputValue}
                    onChange={setInputValue}
                    placeholder="Имя"  />
                </form>
                <form> <Input 
                    value={inputValue}
                    onChange={setInputValue}
                    placeholder="Почта"  />
                </form>
                <form> <Input 
                    value={inputValue}
                    onChange={setInputValue}
                    placeholder="Телефон"  />
                </form>
                <form> <Input 
                    value={inputValue}
                    onChange={setInputValue}
                    placeholder="Страна покупки"  />
                </form>
                <form> <Input 
                    value={inputValue}
                    onChange={setInputValue}
                    placeholder="Город покупки"  />
                </form>
                <form> <Input 
                    value={inputValue}
                    onChange={setInputValue}
                    placeholder="Город доставки"  />
                </form>
                <form> <Input 
                    value={inputValue}
                    onChange={setInputValue}
                    placeholder="Площадь"  />
                </form>
                <form> <Input 
                    value={inputValue}
                    onChange={setInputValue}
                    placeholder="Вес"  />
                </form>
            </div>
            <div className={styles.buttonsStyles}><Buttons text="Оставить заявку" onClick={() => alert('submit')} /></div>
        </div>
    )
}

export default Calculate