import React, { useState, useEffect } from 'react';
import { Reviews } from '../../../types/reviews';
import styles from './Reviews.module.scss'; // Импорт стилей
import reviewsQuote from "./reviewsQuote.png"

interface ReviewsSliderProps {
  reviews: Reviews[];
}

const itemsPerPage = 2;

const ReviewsSlider: React.FC<ReviewsSliderProps> = ({ reviews }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleReviews, setVisibleReviews] = useState<Reviews[]>([]);
  
  // Определяем количество элементов для отображения

  
  useEffect(() => {
    // Получаем подмассив для отображения
    const endIndex = Math.min(startIndex + itemsPerPage, reviews.length);
    const visible = reviews.slice(startIndex, endIndex);
    
    // Если в конце списка остался только один элемент, добавляем первый для заполнения
    if (visible.length < itemsPerPage && reviews.length > itemsPerPage) {
      const additionalItems = reviews.slice(0, itemsPerPage - visible.length);
      setVisibleReviews([...visible, ...additionalItems]);
    } else {
      setVisibleReviews(visible);
    }
  }, [startIndex, reviews]);

  const nextSlide = () => {
    setStartIndex((prevIndex) => 
      prevIndex >= reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setStartIndex((prevIndex) => 
      prevIndex <= 0 ? reviews.length - 1 : prevIndex - 1
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
          {visibleReviews.map((review) => (
            <div key={review.id} className={styles.reviewsCard}>
              <p className={styles.reviewsText}>{review.text}</p>
                
              <p className={styles.reviewsAuthor}>{review.author}</p>
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