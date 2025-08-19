import React from 'react';
import styles from './ProfileIcon.module.scss';

const ProfileIcon: React.FC = () => {
  return (
    <div className={styles.profileIcon}>
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" 
          stroke="#333333" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M20 21C20 19.1435 19.2625 17.363 17.9497 16.0503C16.637 14.7375 14.8565 14 13 14H11C9.14348 14 7.36301 14.7375 6.05025 16.0503C4.7375 17.363 4 19.1435 4 21" 
          stroke="#333333" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default ProfileIcon;