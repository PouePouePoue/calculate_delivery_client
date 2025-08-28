import React, { useEffect, useState } from "react";
import styles from "./Body.module.scss"
import BodyText from "./bodyText/BodyText";
import Calculate from "./calculate/Calculate";
import AboutUs from "./aboutUs/AboutUs";
import Guarantee from "./guarantee/Guarantee";
import ReviewsSlider from "./reviews/Reviews";
import { REVIEWS } from "../../constants/reviews.constants";



const Body = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Проверяем авторизацию при загрузке
    useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
        setIsAuthenticated(true);
    }
    }, []);

    const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    };
    return (
        <div className={styles.body}>
            <div className={styles.content}>
                <div className={styles.calculateSide}>
                    <BodyText /> 
                    <Calculate  isAuthenticated={isAuthenticated} onLoginSuccess={handleLoginSuccess}
                    />
                </div>
                <div className={styles.aboutUsSide}>
                    <AboutUs />
                </div>
                <div className={styles.guaranteeSide}>
                    <Guarantee />
                </div>
                <div className={styles.revieweSide}>
                    <ReviewsSlider reviews={REVIEWS} isAuthenticated={isAuthenticated} />
                </div>
                
            </div>   
        </div>
    )
}

export default Body;