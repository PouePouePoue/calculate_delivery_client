import React from 'react';
import styles from './CertificateBlock.module.scss' 

interface AboutUsBlockProps {
  img: string;
  text: string;
}

const AboutUsBlock: React.FC<AboutUsBlockProps> = ({ img,  text }) => {
  return (
    <div className={styles.block}>
      <img src={img}  className={styles.firstImg} />
      <p className={styles.certificateText}>{text}</p>
    </div>
  );
};

export default AboutUsBlock;