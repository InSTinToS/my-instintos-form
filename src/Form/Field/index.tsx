import React, { useEffect, useRef, useState } from 'react'
import { DefaultField, EditField } from './styles'

import CloseIcon from 'assets/global/CloseIcon'
import PencilIcon from 'assets/inputs/PencilIcon'

import { Datepicker, Text } from 'components/Form'
import { TextProps } from 'components/Form/Text'
import { DatepickerProps } from 'components/Form/Datepicker'

interface FieldProps {
  defaultValue: any
  icon?: any
  textProps?: TextProps
  enableEdit?: boolean
  conditionToEdit?: boolean
  datepickerProps?: DatepickerProps
  inputType?: 'text' | 'datepicker'
  onFieldClick?: () => void
  onCloseClick?: () => void
}

const Field = ({
  textProps,
  icon: Icon,
  onCloseClick,
  onFieldClick,
  defaultValue,
  datepickerProps,
  inputType = 'text',
  enableEdit = true,
  conditionToEdit
}: FieldProps) => {
  const [condition, setCondition] = useState(false)

  const datepickerRef = useRef<HTMLInputElement>(null)
  const textRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputType === 'text' && textRef.current?.focus()
    setTimeout(
      () => inputType === 'datepicker' && datepickerRef.current?.click(),
      300
    )
  }, [conditionToEdit, inputType])

  return conditionToEdit || condition ? (
    <EditField id='editField' className='Field'>
      {Icon && <Icon id='icon' />}

      {inputType === 'text' && <Text ref={textRef} {...(textProps as any)} />}

      <div id='datepickerWrapper'>
        {inputType === 'datepicker' && (
          <Datepicker ref={datepickerRef} {...(datepickerProps as any)} />
        )}
      </div>
      <CloseIcon
        id='closeIcon'
        onClick={() => {
          onCloseClick && onCloseClick()
          conditionToEdit === undefined && setCondition(false)
        }}
      />
    </EditField>
  ) : (
    <DefaultField
      className='Field'
      id='defaultField'
      style={{ cursor: enableEdit ? 'pointer' : 'default' }}
      onClick={() => {
        onFieldClick && onFieldClick()
        conditionToEdit === undefined && setCondition(true)
      }}
    >
      {conditionToEdit && <PencilIcon />}

      {defaultValue}
    </DefaultField>
  )
}

export default Field
