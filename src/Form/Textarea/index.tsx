import Style, { StyledTextarea } from './styles'
import React, {
  forwardRef,
  HTMLProps,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'

import { FormContext, FormState } from '../'

import ErrorTooltip from 'components/Tooltips/ErrorTooltip'

interface TextareaMethods {}

interface TextareaProps extends HTMLProps<HTMLTextAreaElement> {
  textColors?: {
    unfocused: string
    focused: string
  }
}

const Textarea = forwardRef<TextareaMethods, TextareaProps>(
  (
    {
      textColors = {
        unfocused: '#6e4850',
        focused: '#d65881'
      },
      ...props
    },
    _ref
  ) => {
    const form = useContext<FormState | null>(FormContext)

    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const [error, setError] = useState<string>()

    useEffect(() => {
      const sendRef = {
        inputRef: textareaRef,
        setError,
        type: 'textarea'
      }

      form?.registerInput(sendRef)
      return () => form?.removeInput(sendRef)
    }, [textareaRef, form])

    return (
      <Style className='Textarea' error={!!error}>
        <div className='Error'>
          <ErrorTooltip error={!!error} content={error} />
        </div>

        <StyledTextarea
          textColors={textColors}
          ref={textareaRef as any}
          onClick={() => setError('')}
          {...(props as any)}
        />
      </Style>
    )
  }
)

export default Textarea
