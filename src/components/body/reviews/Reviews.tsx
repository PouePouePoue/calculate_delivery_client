import React, { useState, useEffect } from 'react';
import { Reviews } from '../../../types/reviews';
import styles from './Reviews.module.scss'; // Импорт стилей
import reviewsQuote from "./reviewsQuote.png"

interface ReviewsSliderProps {
  Reviews: Reviews[];
}

const ReviewsSlider: React.FC<ReviewsSliderProps> = ({ Reviews }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleReviews, setVisibleReviews] = useState<Reviews[]>([]);
  
  // Определяем количество элементов для отображения
  const itemsPerPage = 2;
  
  useEffect(() => {
    // Получаем подмассив для отображения
    const endIndex = Math.min(startIndex + itemsPerPage, Reviews.length);
    const visible = Reviews.slice(startIndex, endIndex);
    
    // Если в конце списка остался только один элемент, добавляем первый для заполнения
    if (visible.length < itemsPerPage && Reviews.length > itemsPerPage) {
      const additionalItems = Reviews.slice(0, itemsPerPage - visible.length);
      setVisibleReviews([...visible, ...additionalItems]);
    } else {
      setVisibleReviews(visible);
    }
  }, [startIndex, Reviews]);

  const nextSlide = () => {
    setStartIndex((prevIndex) => 
      prevIndex >= Reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setStartIndex((prevIndex) => 
      prevIndex <= 0 ? Reviews.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={styles.slider}>
      <p className={styles.titleText}>Отзывы</p>
      <div className={styles.sliderContainer}>
        <button 
          className={styles.navButton} 
          onClick={prevSlide}
        >
          ➔
        </button>
        
        <div className={styles.reviewsContent}>
          {visibleReviews.map((Review) => (
            <div key={Review.id} className={styles.reviewsCard}>
              <p className={styles.reviewsText}>{Review.text}</p>
                
              <p className={styles.reviewsAuthor}>{Review.author}</p>
              <img src={reviewsQuote} className={styles.reviewsQuote} alt="reviewsQuote" /> 
            </div>
          ))}
        </div>
        
        <button 
          
          onClick={nextSlide}
        >
          ➔
        </button>
      </div>
    </div>
  );
};

export default ReviewsSlider;