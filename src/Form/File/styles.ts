import styled, { css } from 'styled-components'

interface StyleProps {
  haveValue?: string
  flexColumn?: boolean
}

const Style = styled.div<StyleProps>`
  #fileInput {
    display: flex;
    align-items: center;
    justify-content: center;

    flex-direction: column;

    #fileName {
      font-size: clamp(1.1rem, 0.6rem + 2.6vw, 1.6rem);

      color: ${({ theme }) => theme.colors.primary};
    }

    label {
      display: flex;
      align-items: center;
      justify-content: center;

      padding: 8px 16px;
      border-radius: 8px;
      text-align: center;
      font-size: clamp(1.1rem, 0.6rem + 2.6vw, 1.8rem);

      color: ${({ theme }) => theme.colors.secondary};
      box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.39);
      background-color: ${({ theme }) => theme.colors.primary};

      &:hover {
        transform: scale(1.01);

        filter: brightness(1.1);
      }

      .Icon {
        height: 16px;
        margin-right: 8px;

        fill: ${({ theme }) => theme.colors.secondary};
      }
    }

    #DownloadIcon {
      height: 16px;
      margin-right: 8px;

      fill: ${({ theme }) => theme.colors.red};
      stroke: ${({ theme }) => theme.colors.red};
    }
  }

  #container {
    display: flex;
    align-items: flex-end;
    flex-direction: column;

    border-radius: 8px;
    padding: 16px 24px;

    background-color: ${({ theme }) => theme.colors.tertiary};

    button {
      margin-top: 16px;
      padding: 8px 16px;
      border-radius: 8px;

      color: ${({ theme }) => theme.colors.secondary};
      background-color: ${({ theme }) => theme.colors.primary};
    }

    .Icon {
      height: 16px;
      margin-bottom: 16px;

      stroke: ${({ theme }) => theme.colors.secondary};
    }
  }

  .Cropper {
    width: 300px;
    height: 300px;

    .cropper-modal {
      border-radius: 5px;
    }

    .cropper-face {
      background-color: transparent;

      .cropper-move {
        border: none;
      }
    }

    .cropper-view-box {
      outline: 1px solid ${({ theme }) => theme.colors.white};
    }

    .cropper-point {
      width: 5px;
      height: 5px;

      opacity: 1;
      background-color: ${({ theme }) => theme.colors.white};
    }

    .cropper-center {
      opacity: 1;
    }

    .cropper-center::before {
      left: 0;

      width: 8px;
      height: 1px;
      transform: translateX(-50%);

      background-color: ${({ theme }) => theme.colors.white};
    }

    .cropper-center::after {
      top: 0;
      transform: translateY(-50%);

      width: 1px;
      height: 8px;

      background-color: ${({ theme }) => theme.colors.white};
    }

    .cropper-line,
    .cropper-point.point-n,
    .cropper-point.point-s,
    .cropper-point.point-e,
    .cropper-point.point-w {
      background-color: transparent;
    }
  }

  @media screen and (min-width: 545px) {
    #fileInput {
      flex-direction: ${({ flexColumn }) => (flexColumn ? 'column' : 'row')};
    }

    #fileName {
      ${({ flexColumn, haveValue }) =>
        flexColumn
          ? css`
              margin-bottom: ${haveValue ? '8px' : '0px'};
            `
          : css`
              margin-right: ${haveValue ? '8px' : '0px'};
            `};
    }
  }
`

export default Style

Style.displayName = 'File-Style'
