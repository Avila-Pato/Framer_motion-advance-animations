import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import styles from './style.module.scss'

/**
 * @param {{ handle: string, mousePosition: { x: import('framer-motion').MotionValue<number>, y: import('framer-motion').MotionValue<number> } }} props
 */
const GalleryImg = ({ handle, mousePosition }) => {
  const { x, y } = mousePosition

  return (
    <div className={styles.gallery}>
        <div className={styles.imageContainer}>
            <Image
                src={`/images/${handle}/background.jpg`}
                alt="image"
                fill
            />
        </div>
        <motion.div className={styles.vignette} style={{ x, y }}>
          <Image
            src={`/images/${handle}/1.jpg`}
            alt="image"
            fill
          />
        </motion.div>
    </div>
  )
}

export default GalleryImg
