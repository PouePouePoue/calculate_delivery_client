import React from "react";
import styles from  "./Navigation.module.scss"
import AboutUSMenu from "./aboutUSMenu/AboutUSMenu";
import CalculateMenu from "./calculateMenu/СalculateMenu";
import GuaranteeMenu from "./guaranteeMenu/GuaranteeMenu";
import ReviewsMenu from "./reviewsMenu/ReviewsMenu";



const Navigation = () => {
    // TODO: пункт меню вынести в отедльный компонент
    return (
    <div className={styles.navigation}> 
        <CalculateMenu />
        <AboutUSMenu/>
        <GuaranteeMenu />
        <ReviewsMenu />
    </div>
    )
}

export default Navigation