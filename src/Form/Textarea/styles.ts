import styled from 'styled-components'

interface StyledTextareaProps {
  textColors: {
    unfocused: string
    focused: string
  }
}

interface StyleProps {
  error: boolean
}

export const StyledTextarea = styled.textarea<StyledTextareaProps>`
  width: 100%;
  resize: none;
  padding: 8px;
  min-height: 128px;
  border-radius: 8px;

  color: ${({ textColors }) => textColors.unfocused};
  border: solid 1px ${({ textColors }) => textColors.unfocused};

  &::placeholder {
    fill: ${({ textColors }) => textColors.unfocused};
    stroke: ${({ textColors }) => textColors.unfocused};
    -webkit-text-fill-color: ${({ textColors }) => textColors.unfocused};
  }

  &:focus {
    color: ${({ textColors }) => textColors.focused};
    border: solid 1px ${({ textColors }) => textColors.focused};

    &::placeholder {
      fill: ${({ textColors }) => textColors.focused};
      stroke: ${({ textColors }) => textColors.focused};
      -webkit-text-fill-color: ${({ textColors }) => textColors.focused};
    }
  }
`

const Style = styled.div<StyleProps>`
  position: relative;

  .Error {
    position: absolute;
    top: 8px;
  }

  ${StyledTextarea} {
    padding-left: ${({ error }) => (error ? '56px' : '8px')};
  }
`

export default Style

Style.displayName = 'Textarea-Style'
