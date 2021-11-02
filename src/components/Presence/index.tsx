import React, { forwardRef, ReactElement } from 'react'

import {
  AnimatePresence,
  AnimatePresenceProps,
  HTMLMotionProps,
  motion
} from 'framer-motion'

interface PresenceProps extends HTMLMotionProps<'div'> {
  condition: boolean
  children: ReactElement | ReactElement[] | string
  presenceProps?: AnimatePresenceProps
}

const Presence = forwardRef<any, PresenceProps>(
  ({ children, condition, presenceProps, ...props }, ref) => (
    <AnimatePresence {...presenceProps}>
      {condition && (
        <motion.div className='Presence' ref={ref} {...props}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
)

export default Presence
