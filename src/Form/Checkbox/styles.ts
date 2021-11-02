import styled, { css } from 'styled-components'

interface StyleProps {
  checked: boolean
  error: boolean
}

const Style = styled.div<StyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  button + button {
    margin-left: 8px;

    &:hover,
    &:focus {
      filter: brightness(1.1);
      color: ${({ theme }) => theme.colors.primary};
    }

    ${({ checked, theme }) =>
      checked
        ? css`
            color: ${theme.colors.primary};
          `
        : css`
            color: ${theme.colors.tertiary};
          `}
  }

  #checkbox {
    position: relative;

    width: 16px;
    height: 16px;
    cursor: pointer;

    svg {
      position: absolute;
      left: 0;
      top: 0;

      width: 100%;
      height: 100%;
    }

    input {
      display: none;
    }
  }
`

export default Style

Style.displayName = 'Checkbox-Style'
