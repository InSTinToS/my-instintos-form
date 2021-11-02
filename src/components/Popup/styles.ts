import { PopupType } from './index'

import styled from 'styled-components'

interface StyleProps {
  type: PopupType
}

const Style = styled.div<StyleProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 320px;
  padding: 16px;
  border-radius: 8px;

  color: ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.colors.tertiary};

  > * {
    margin-bottom: 16px;
  }

  body {
    overflow: hidden;
  }

  span {
    font-weight: 900;
    font-size: clamp(1.6rem, 0.6rem + 2.6vw, 2.2rem);

    color: ${({ theme, type }) => {
      switch (type) {
        case 'error':
          return theme.colors.red
        case 'success':
          return theme.colors.green
        default:
          return theme.colors.yellow
      }
    }};
  }

  hr {
    width: 90%;

    border: solid 1px ${({ theme }) => theme.colors.secondary};
  }

  p {
    width: 90%;
    text-align: center;
    font-size: clamp(1.6rem, 0.6rem + 2.6vw, 1.8rem);
  }

  button {
    width: 90%;
    height: 44px;
    padding: 8px;
    margin-bottom: 0px;
    border-radius: 8px;

    color: ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.primary};
  }
`

export default Style

Style.displayName = 'Popup-Style'
