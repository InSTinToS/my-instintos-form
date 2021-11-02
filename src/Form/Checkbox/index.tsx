import React, { useContext, useEffect, useRef, useState } from 'react'
import Style from './styles'

import { FormContext, FormState } from '../index'

import ErrorTooltip from 'components/Tooltips/ErrorTooltip'

import { motion, Variants } from 'framer-motion'
import { ThemeContext } from 'styled-components'

interface CheckboxProps {
  name: string
  label: string
  id?: string
  defaultCheck?: boolean
  onClick?: () => void
}

const pathAnimation: Variants = {
  check: {
    pathLength: 1,
    transition: {
      type: 'tween',
      duration: 0.4
    }
  },
  unCheck: {
    d: 'M3 6 l3 4 l7 -6',
    pathLength: 0,
    transition: {
      type: 'tween',
      duration: 0.2
    }
  }
}

const Checkbox = ({
  id,
  name,
  label,
  onClick,
  defaultCheck,
  ...rest
}: CheckboxProps) => {
  const form = useContext<FormState | null>(FormContext)
  const theme = useContext(ThemeContext)

  const checkboxRef = useRef<HTMLInputElement>(null)

  const [checked, setChecked] = useState(false)
  const [error, setError] = useState<string>()

  useEffect(() => {
    setChecked(defaultCheck || false)
  }, [defaultCheck])

  useEffect(() => {
    const checkbox = {
      inputRef: checkboxRef,
      setError,
      type: 'checkbox'
    }

    form?.registerInput(checkbox)
    return () => form?.removeInput(checkbox)
  }, [form])

  return (
    <Style
      className='Checkbox'
      onClick={onClick}
      checked={checked}
      error={!!error}
      id={id}
    >
      <ErrorTooltip error={!!error} content={error} />

      <button
        id='checkbox'
        type='button'
        onClick={() => {
          setChecked(!checked)
          setError('')
        }}
      >
        <input
          readOnly
          type='checkbox'
          name={name}
          ref={checkboxRef}
          checked={checked}
          {...rest}
        />

        <svg viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <rect
            x='0.5'
            y='0.5'
            width='14'
            height='14'
            stroke='url(#checkboxRadial)'
          />

          <defs>
            <motion.radialGradient
              animate={{
                cx: [0, 1, 1, 0, 0],
                cy: [0, 0, 1, 1, 0]
              }}
              transition={{
                type: 'tween',
                duration: 3,
                repeat: Infinity
              }}
              id='checkboxRadial'
              r='1'
            >
              <stop stopColor={theme.colors.tertiary} />

              <stop offset='1' stopColor={theme.colors.primary} />
            </motion.radialGradient>
          </defs>

          <motion.path
            d=''
            stroke='url(#checkboxRadial)'
            initial={false}
            variants={pathAnimation}
            animate={checked ? 'check' : 'unCheck'}
          />
        </svg>
      </button>

      <button
        type='button'
        className='CheckboxLabel'
        onClick={() => {
          setChecked(!checked)
          setError('')
        }}
      >
        {label}
      </button>
    </Style>
  )
}

export default Checkbox
