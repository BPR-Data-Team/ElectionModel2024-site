import React from 'react';
import styles from './page.module.css';

interface CardProps {
    image: string;
    bio: string;
  }
  
  const Card: React.FC<CardProps> = ({image, bio}) => {
    return(
      <div className={styles.card}>
        <img src={image} alt="Person" className={styles.image} />
        <p className={styles.bio}>{bio}</p>
      </div>
    );
  };
  
  export default Card;

