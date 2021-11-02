import React, {
  FC,
  FocusEvent,
  forwardRef,
  HTMLProps,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import Style, { IconSpace } from './styles'

import { FormContext, FormState } from '../'

import { dateToValue } from 'utils/dates'

import EyeClosedIcon from 'assets/inputs/EyeClosedIcon'
import EyeIcon from 'assets/inputs/EyeIcon'

import ErrorTooltip from 'components/Tooltips/ErrorTooltip'
import { Ref } from 'components/Form'

export interface TextColors {
  focused?: string
  unfocused?: string
}

export interface TextProps extends HTMLProps<HTMLInputElement> {
  icon?: FC
  eye?: boolean
  isDate?: boolean
  optional?: boolean
  pasteAndDrop?: boolean
  textColors?: TextColors
}

const Text = forwardRef<HTMLInputElement, TextProps>(
  (
    {
      id,
      value,
      onBlur,
      hidden,
      icon: Icon,
      placeholder,
      eye = false,
      type = 'text',
      isDate = false,
      optional = false,
      className = 'Text',
      pasteAndDrop = true,
      textColors = {
        unfocused: '#6e4850',
        focused: '#d65881'
      },
      ...rest
    },
    ref
  ) => {
    const form = useContext<FormState | null>(FormContext)

    const textRef = useRef<HTMLInputElement>(null)

    const [error, setError] = useState<string>()
    const [isFilled, setIsFilled] = useState(false)
    const [showInput, setShowInput] = useState(false)
    const [textValue, setTextValue] = useState<string | undefined>(undefined)

    const auxRef = (ref as RefObject<HTMLInputElement>) || textRef

    const onInputBlur = (e: FocusEvent<HTMLInputElement>) => {
      onBlur && onBlur(e)
      setError(undefined)
      setIsFilled(!!auxRef.current?.value)
    }

    const hiddenInput = () => {
      if (eye) return showInput ? 'text' : 'password'
      return type
    }

    useEffect(() => {
      const input: Ref = {
        setError,
        inputRef: auxRef,
        type: isDate ? 'date' : type,
        value: textValue
      }

      form?.registerInput(input)
      return () => form?.removeInput(input)
    }, [auxRef, form, type, isDate, textValue])

    useEffect(() => {
      isDate
        ? setTextValue(dateToValue(auxRef.current?.value))
        : setTextValue(value as string)
    }, [value, isDate, auxRef])

    return (
      <Style
        id={id}
        hasEye={!!eye}
        hidden={hidden}
        hasIcon={!!Icon}
        isFilled={isFilled}
        optional={optional}
        isErrored={!!error}
        colors={textColors}
        className={className}
        onFocus={() => textRef.current?.focus()}
      >
        <ErrorTooltip error={!!error} content={error} />

        {Icon && !error && (
          <IconSpace>
            <button type='button' onClick={() => textRef.current?.focus()}>
              <Icon />
            </button>
          </IconSpace>
        )}

        <input
          spellCheck='false'
          value={value}
          id={rest.name}
          ref={ref || auxRef}
          type={hiddenInput()}
          onBlur={onInputBlur}
          onDrop={event => pasteAndDrop || event?.preventDefault()}
          onPaste={event => pasteAndDrop || event?.preventDefault()}
          placeholder={`${placeholder || ''}${optional ? ' - Opcional ' : ''}`}
          {...rest}
        />

        {eye &&
          (showInput ? (
            <IconSpace>
              <EyeClosedIcon onClick={() => setShowInput(false)} />
            </IconSpace>
          ) : (
            <IconSpace>
              <EyeIcon onClick={() => setShowInput(true)} />
            </IconSpace>
          ))}
      </Style>
    )
  }
)

export default Text

Text.displayName = 'Text'
