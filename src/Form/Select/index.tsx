import React, {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import Style from './styles'

import { FormContext, FormState } from '../'

import ErrorTooltip from 'components/Tooltips/ErrorTooltip'
import DotsLoader from 'components/DotsLoader'

import { lighten } from 'polished'
import RealSelect, { Theme } from 'react-select'
import { ThemeContext } from 'styled-components'

export interface Option {
  label: string
  value: string | number
}

const Select = forwardRef(
  ({ isMulti, styling, theming, className = 'Select', ...props }: any, ref) => {
    const form = useContext<FormState | null>(FormContext)
    const theme = useContext(ThemeContext)

    const selectRef = useRef(null)

    const [error, setError] = useState<string>()

    const overridingStyles = {
      menu: (before: any) => ({
        ...before,
        zIndex: 3
      }),
      control: (before: any) => ({
        ...before,
        paddingLeft: error ? 56 : 8,
        backgroundColor: 'transparent'
      }),
      valueContainer: (before: any) => ({
        ...before,
        paddingLeft: 0
      }),
      singleValue: (before: any) => ({
        ...before,
        color: theme.colors.primary
      }),
      multiValue: (before: any) => ({
        ...before,
        backgroundColor: theme.colors.primary
      }),
      multiValueLabel: (before: any) => ({
        ...before,
        color: theme.colors.secondary
      }),
      multiValueRemove: (before: any) => ({
        ...before,
        color: theme.colors.secondary,
        ':hover': {
          backgroundColor: theme.colors.tertiary
        }
      })
    }

    const overridingTheme = (beforeTheme: Theme): Theme => ({
      ...beforeTheme,
      colors: {
        ...beforeTheme.colors,
        danger: theme.colors.red,
        dangerLight: lighten(0.5, theme.colors.red),
        primary: theme.colors.primary,
        primary25: lighten(0.25, theme.colors.primary),
        primary50: lighten(0.5, theme.colors.primary),
        primary75: lighten(0.75, theme.colors.primary),
        neutral0: theme.colors.secondary,
        neutral5: theme.colors.tertiary,
        neutral10: theme.colors.tertiary,
        neutral20: theme.colors.tertiary,
        neutral30: theme.colors.tertiary,
        neutral40: theme.colors.tertiary,
        neutral50: theme.colors.tertiary,
        neutral60: theme.colors.tertiary,
        neutral70: theme.colors.tertiary,
        neutral80: theme.colors.tertiary,
        neutral90: theme.colors.tertiary
      }
    })

    useEffect(() => {
      const select = {
        inputRef: selectRef,
        setError,
        type: isMulti ? 'multiSelect' : 'select'
      }

      form?.registerInput(select)

      return () => form?.removeInput(select)
    }, [selectRef, form, isMulti])

    return (
      <Style isErrored={!!error} ref={ref as any} className={className}>
        <ErrorTooltip error={!!error} content={error} />

        <RealSelect
          ref={selectRef}
          isMulti={isMulti}
          classNamePrefix='Select'
          onBlur={() => setError('')}
          theme={theming || overridingTheme}
          styles={styling || overridingStyles}
          noOptionsMessage={() => (
            <div id='noOptions'>
              <DotsLoader color={theme.colors.primary} />
              Carregando opções...
            </div>
          )}
          {...props}
        />
      </Style>
    )
  }
)

export default Select
