import React, { forwardRef, useCallback, useEffect, useState } from 'react'
import Style from './styles'

import '../../../../node_modules/react-modern-calendar-datepicker/lib/DatePicker.css'
import Text, { TextProps } from '../Text'

import { datepickerToDate } from 'utils/dates'

import ptbr from 'i18n/dates/ptbr'
import DatePicker, { DayValue } from 'react-modern-calendar-datepicker'

export interface DatepickerColors {
  body?: string
  header?: string
  disabled?: string
  selected?: string
}

export interface DatepickerProps extends TextProps {
  isBirthday?: boolean
  withoutStyle?: boolean
  dateColors?: DatepickerColors
  arrow?: 'auto' | 'top' | 'bottom'
}

type YearButton = HTMLButtonElement | null

const actualDate = new Date()

const present = {
  year: actualDate.getFullYear(),
  month: actualDate.getMonth(),
  day: actualDate.getDate()
}

const minimumDate = {
  year: present.year - 120,
  month: present.month + 1,
  day: present.day
}

const maximumDate = {
  year: present.year - 18,
  month: present.month + 1,
  day: present.day
}

const Datepicker = forwardRef<any, DatepickerProps>(
  (
    {
      name,
      arrow,
      value,
      icon: Icon,
      isBirthday,
      withoutStyle = false,
      dateColors = {
        body: '#fcfcfc',
        header: '#6e4850',
        selected: '#d65881',
        disabled: '#d62828'
      },
      ...rest
    },
    ref
  ) => {
    const [selectedDate, setSelectedDate] = useState<DayValue>(null)

    const renderCustomInput = useCallback(
      ({ ref }: any) => {
        const onClick = () => {
          const year: YearButton = document.querySelector('.Calendar__yearText')
          if (year && !selectedDate) year.click()
        }

        return !withoutStyle ? (
          <Text
            isDate
            readOnly
            ref={ref}
            id={name}
            name={name}
            icon={Icon}
            onClick={onClick}
            value={datepickerToDate(selectedDate)}
            {...rest}
          />
        ) : (
          <Text
            isDate
            readOnly
            ref={ref}
            id={name}
            name={name}
            icon={Icon}
            onClick={onClick}
            value={
              selectedDate ? datepickerToDate(selectedDate) : 'Selecione...'
            }
            {...rest}
          />
        )
      },
      [Icon, name, rest, selectedDate, withoutStyle]
    )

    useEffect(() => {
      setSelectedDate(value as DayValue)
    }, [value])

    return (
      <Style
        ref={ref as any}
        className='Datepicker'
        arrow={arrow}
        colors={dateColors}
        withoutStyle={withoutStyle}
        onClick={() => console.log('clicked')}
      >
        <DatePicker
          calendarClassName='CalendarSize'
          locale={ptbr}
          value={selectedDate}
          onChange={setSelectedDate}
          calendarPopperPosition={arrow}
          renderInput={renderCustomInput}
          selectorEndingYear={present.year}
          selectorStartingYear={minimumDate.year}
          maximumDate={isBirthday ? maximumDate : undefined}
          minimumDate={isBirthday ? minimumDate : undefined}
        />
      </Style>
    )
  }
)

export default Datepicker
