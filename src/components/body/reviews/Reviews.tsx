import React, { useState, useEffect } from 'react';
import { Reviews } from '../../../types/reviews';
import styles from './Reviews.module.scss';
import reviewsQuote from "./reviewsQuote.png"
import Buttons from '../../buttons/Buttons';

interface ReviewsSliderProps {
  reviews: Reviews[];
  isAuthenticated: boolean; // Добавляем пропс для проверки авторизации
}

const itemsPerPage = 2;

const ReviewsSlider: React.FC<ReviewsSliderProps> = ({ reviews, isAuthenticated }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleReviews, setVisibleReviews] = useState<Reviews[]>([]);
  
  useEffect(() => {
    const endIndex = Math.min(startIndex + itemsPerPage, reviews.length);
    const visible = reviews.slice(startIndex, endIndex);
    
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
            <div key={'review_item_' + review.id} className={styles.reviewsCard}>
              <p className={styles.reviewsText}>{review.text}</p>
              <p className={styles.reviewsAuthor}>{review.author}</p>
              <img src={reviewsQuote} className={styles.reviewsQuote} alt="reviewsQuote" /> 
            </div>
          ))}
        </div>
        
        <button 
          className={styles.navButton} 
          onClick={nextSlide}
        >
          ➔
        </button>
      </div>

      {/* Кнопка для авторизованных пользователей */}
      {isAuthenticated && (
        <div className={styles.buttonContainer}>
          <Buttons className={styles.reviewButton} text={'Оставить отзыв'} />
            
          
        </div>
      )}
    </div>
  );
};

export default ReviewsSlider;