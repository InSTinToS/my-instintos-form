import { memo } from 'react'

import captcha from 'react-google-recaptcha'
import styled from 'styled-components'

export const ReCaptcha = memo(styled(captcha)`
  display: none;
`)

ReCaptcha.displayName = 'Card-Style'
