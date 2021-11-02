import React, { forwardRef, HTMLProps, useContext } from 'react'
import Style from './styles'

import { FormContext, FormState } from '../'

import DotsLoader from 'components/DotsLoader'

import { ThemeContext } from 'styled-components'

interface SubmitProps extends HTMLProps<HTMLButtonElement> {
  dataCy?: string
}

const Submit = forwardRef(
  ({ children, type = 'submit', ...rest }: SubmitProps, ref) => {
    const form = useContext<FormState | null>(FormContext)
    const theme = useContext(ThemeContext)

    return (
      <Style
        className='Submit'
        ref={ref as any}
        type={type as any}
        disabled={form?.loader}
        {...(rest as any)}
      >
        <div className='label'>{children}</div>

        {form?.loader && (
          <DotsLoader dotSize={6} color={theme.colors.secondary} />
        )}
      </Style>
    )
  }
)

export default Submit
