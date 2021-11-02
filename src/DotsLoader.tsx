import React from 'react'

import { motion } from 'framer-motion'

interface DotsLoaderProps {
  size?: number
  color?: string
  dotSize?: number
}

const DotsLoader = ({
  size = 36,
  dotSize = 8,
  color = '#6e4850'
}: DotsLoaderProps) => {
  const loadingContainer = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    className: 'DotsLoader',
    justifyContent: 'space-around',
    width: size
  }

  const loadingCircle = {
    display: 'block',
    borderRadius: '50%',
    width: dotSize,
    height: dotSize,
    backgroundColor: color
  }

  const loadingContainerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2
      }
    },
    end: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const loadingCircleVariants = {
    start: {
      y: '-50%'
    },
    end: {
      y: '50%'
    }
  }

  const loadingCircleTransition = {
    duration: 0.5,
    yoyo: Infinity,
    ease: 'easeInOut'
  }

  return (
    <motion.div
      animate='end'
      initial='start'
      className='DotsLoader'
      style={loadingContainer}
      variants={loadingContainerVariants}
    >
      <motion.span
        style={loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />

      <motion.span
        style={loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />

      <motion.span
        style={loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
    </motion.div>
  )
}

export default DotsLoader
