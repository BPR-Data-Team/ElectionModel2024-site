import React from 'react';
import styles from './page.module.css';
import Image from 'next/image';

interface PersonProps {
    name: string;
    image: string;
    bio: string;
  }
  
  const Person: React.FC<PersonProps> = ({name, image, bio}) => {
    return(
      <div className={styles.person}>
        <Image src={image} alt={name} width={100} height={100} className={styles.image} />
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.bio}> {bio}</p>
      </div>
    );
  };
  
  export default Person;

