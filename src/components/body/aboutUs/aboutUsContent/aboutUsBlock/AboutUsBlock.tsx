import React from 'react';
import styles from './AboutUsBlock.module.scss' 

interface AboutUsBlockProps {
  img: string;
  title: string;
  text: string;
}

const AboutUsBlock: React.FC<AboutUsBlockProps> = ({ img, title, text }) => {
  return (
    <div className={styles.block}>
      <img src={img}  className={styles.firstImg} alt={title} />
      <div className={styles.aboutUsContentBoxText}>
        <p className={styles.aboutUsContentTitle}>{title}</p>
        <p className={styles.aboutUsContentText}>{text}</p>
      </div>
    </div>
  );
};

export default AboutUsBlock;