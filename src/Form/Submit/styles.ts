import { lighten } from 'polished'
import styled from 'styled-components'

const Style = styled.button`
  position: relative;

  border-radius: 8px;
  transition: all 0.2s;
  height: clamp(35px, 3vh + 2vw, 44px);

  color: ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.colors.primary};

  &:disabled {
    background-color: ${({ theme }) => lighten(0.2, theme.colors.primary)};
  }

  &:hover {
    transform: scale(1.01);

    filter: brightness(1.1);
  }

  .DotsLoader {
    position: absolute;
    top: 0;
    right: 10%;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export default Style

Style.displayName = 'Submit-Style'
