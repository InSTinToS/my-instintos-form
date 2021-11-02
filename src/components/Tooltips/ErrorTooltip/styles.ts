import { Popup } from 'semantic-ui-react'
import styled from 'styled-components'

export const Trigger = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  margin: 0 9px;
  min-width: 40px;
  max-width: 40px;

  .Icon {
    display: flex;
    justify-content: center;
    align-items: center;

    width: clamp(24px, 2vh, 30px);
    height: clamp(24px, 2vh, 30px);

    fill: ${({ theme }) => theme.colors.red};
  }
`

const Style = styled(Popup)`
  border: none !important;
  max-width: 514px !important;
  border-radius: 10px !important;

  color: ${({ theme }) => theme.colors.secondary} !important;

  .content {
    padding: 4px;
    font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.5rem);
  }

  &,
  &:before {
    margin-left: 1px !important;

    box-shadow: none !important;
    background-color: ${({ theme }) => theme.colors.primary} !important;
  }

  &:before {
    margin-left: 5px !important;
  }
`

export default Style

Trigger.displayName = 'Trigger-Style'
Style.displayName = 'ErrorTooltip-Style'
