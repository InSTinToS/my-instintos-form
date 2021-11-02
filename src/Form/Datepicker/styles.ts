import { DatepickerColors } from './'

import styled, { css } from 'styled-components'

interface StyleProps {
  colors: DatepickerColors
  withoutStyle: boolean
  arrow?: string
}

const Style = styled.div<StyleProps>`
  width: 100%;
  padding: 0;

  border-radius: 8px;

  .Text input {
    width: 100%;
    cursor: pointer;
  }

  ${({ colors, arrow, withoutStyle }) => {
    const { body, disabled, header, selected } = colors

    return css`
      .CalendarSize {
        font-size: 8px !important;

        background-color: ${body};
      }

      .Calendar {
        --cl-color-primary: ${selected} !important;
        --cl-color-disabledd: ${disabled} !important;
        --cl-color-primary-light: ${body} !important;

        box-shadow: 8px 8px 7px 4px rgba(0, 0, 0, 0.49);
      }

      .DatePicker__calendarContainer {
        border: none;
      }

      .Calendar__header {
        display: flex;
        align-items: center;
        justify-content: space-around;

        padding: 10px;
        border-radius: 20px 20px 0px 0px;

        background-color: ${header};
        border-bottom: solid 2px ${header};

        .Calendar__monthText,
        .Calendar__yearText {
          width: 60%;
        }

        .Calendar__monthArrowWrapper {
          display: flex;
          justify-content: center;
          align-items: center;

          width: 24px;
          height: 24px;
        }

        .Calendar__monthArrowWrapper.-right {
          padding: 0;
          transform: rotate(180deg);
        }

        .Calendar__monthArrowWrapper.-left {
          padding: 0;
          transform: rotate(360deg);
        }
      }

      .Calendar__weekDays {
        margin: 0;
        padding: 0 20px 10px 20px;

        background-color: ${header};

        .Calendar__weekDay {
          text-decoration: none;
        }
      }

      .Calendar__monthSelector.-open,
      .Calendar__yearSelector.-open {
        border-radius: 0px 0px 20px 20px;
      }

      .Calendar__yearSelectorWrapper,
      .Calendar__yearSelectorWrapper.-faded {
        &::before,
        &::after {
          display: none;
        }
      }

      .Calendar.-noFocusOutline.-ltr {
        padding: 0;
        border-radius: 30px 30px 20px 20px;
      }

      .Calendar__monthSelectorItem .Calendar__monthSelectorItemText {
        font-size: 1.4rem !important;
      }

      .DatePicker__calendarArrow {
        ${arrow === 'top'
          ? css`
              border-color: transparent transparent ${body} transparent;
            `
          : css`
              border-color: transparent transparent ${header} transparent;
            `}
      }

      .Calendar__section.-shown,
      .Calendar__monthSelector.-open,
      .Calendar__yearSelector.-open,
      .Calendar.-noFocusOutline.-ltr {
        background-image: none;
        background-color: ${body};
      }

      .Calendar__monthText,
      .Calendar__yearText,
      .Calendar__weekDay {
        color: ${body};
        background-color: transparent;

        &:hover {
          background-color: transparent;
        }
      }

      .Calendar__monthArrow {
        background-image: url("data:image/svg+xml,%3Csvg width='14' height='24' viewBox='0 0 14 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.49998 1L12.5 12L1.49998 23' stroke='white' stroke-width='2' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
      }

      .Calendar__yearSelectorText {
        color: ${header};

        &:disabledcolord {
          opacity: 1;

          color: ${disabled} !important;
        }

        &:hover {
          color: ${body};
          background-color: ${selected} !important;
        }
      }

      .Calendar__day.-ltr {
        color: ${header};

        &:hover {
          background-color: ${selected} !important;
          color: ${body} !important;
        }
      }

      .Calendar__day.-ltr.-selected {
        color: ${body};
      }

      .Calendar__day.-ltr.-disabledd {
        display: none;
      }

      .Calendar__monthSelectorItem.-active .Calendar__monthSelectorItemText {
        color: ${body};
      }

      .Calendar__monthSelectorItemText:disabledcolord,
      .Calendar__yearSelectorText:disabledcolord {
        opacity: 1;
        color: ${disabled} !important;
      }

      .Calendar__yearText.-activeBackground,
      .Calendar__monthText.-activeBackground {
        background-color: ${selected} !important;
      }

      ${withoutStyle &&
      css`
        .Datepicker,
        .Text,
        .Text input {
          width: 120px;
          min-width: 120px;
          padding-left: 0px;
          text-align: center;

          border: none;
          height: auto;
        }
      `}
    `
  }}

  @media screen and (min-height: 900px) {
    .Calendar__monthSelector.-open,
    .Calendar__yearSelector.-open {
      margin-top: 1%;
      padding-bottom: 10%;
    }
  }

  @media screen and (min-width: 545px) {
    .CalendarSize {
      font-size: 10px !important;
    }
  }
`

export default Style

Style.displayName = 'Datepicker-Style'
