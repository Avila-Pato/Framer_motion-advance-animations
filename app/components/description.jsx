import { useState } from 'react'
import { motion } from 'framer-motion';
import Image from 'next/image';

import styles from './style.module.scss'

export default function Description({mousePosition, projects}) {
  const [index, setIndex] = useState(0);
  const {x, y} = mousePosition;

  return (
    <div className={styles.description}>
        <div className={styles.descriptionContainer}>
            {
                projects.map( ({name}, i) => {
                    return <p onMouseOver={() => {setIndex(i)}} key={`p${i}`}>
                        {name}
                    </p>
                })
            }
        </div>
         <motion.div
         className={styles['vignette-description']}
         style={{x, y}}
         >
          <Image 
            src={`/images/${projects[index].handle}/1.jpg`}
            alt="image"
            fill
          />
        </motion.div>
    </div>
  )
}