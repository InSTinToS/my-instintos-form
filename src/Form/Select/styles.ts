import styled, { css } from 'styled-components'

interface StyleProps {
  isErrored: boolean
}

const Style = styled.div<StyleProps>`
  position: relative;

  margin: 0;
  padding: 0px;

  .Select__menu {
    z-index: 1000;
  }

  .Select__single-value {
    display: flex;
    align-items: center;

    height: 100%;
  }

  #noOptions {
    display: flex;
    align-items: center;
    justify-content: center;

    .DotsLoader {
      margin-right: 8px;
    }
  }

  ${({ isErrored }) =>
    isErrored &&
    css`
      .Trigger {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;

        height: 100%;
      }
    `}
`

export default Style

Style.displayName = 'Select-Style'
