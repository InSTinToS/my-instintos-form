import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import Style from './styles'

import Modal, { ModalMethods } from 'components/Modal'

export type PopupType = 'error' | 'warning' | 'success' | 'other'

export interface PopupProps {
  top?: string
  bottom?: string
  zIndex?: number
  bgHeight?: string
  translateY?: string
}

interface ConfigPopupProps {
  type: PopupType
  title?: string
  message?: string
  setModal?: boolean
  onClick?: () => void
  onOkClick?: () => void
  onCloseClick?: () => void
}

export interface PopupMethods {
  configPopup: (_props: ConfigPopupProps) => void
}

const initialState: ConfigPopupProps = {
  type: 'warning',
  setModal: false,
  title: undefined,
  message: undefined,
  onOkClick: undefined,
  onCloseClick: undefined
}

const makeTitle = (type: PopupType, title?: string) => {
  switch (type) {
    case 'success':
      return 'Sucesso'
    case 'warning':
      return 'Atenção'
    case 'error':
      return 'Error'
    default:
      return title || ''
  }
}

const Popup = forwardRef<PopupMethods, PopupProps>(
  ({ bgHeight = '100vh', top, translateY, bottom, zIndex }, ref) => {
    const modalRef = useRef<ModalMethods>(null)
    const [
      { type, setModal, message, title, onClick, onOkClick, onCloseClick },
      setConfigState
    ] = useState<ConfigPopupProps>(initialState)

    const onConfirmClick = () => {
      setConfigState(prev => ({ ...prev, setModal: false }))
      onClick ? onClick() : onOkClick && onOkClick()
    }

    const configPopup = (content: ConfigPopupProps) => setConfigState(content)

    useImperativeHandle(ref, () => ({ configPopup }))

    useEffect(() => {
      modalRef.current?.toggle(setModal)
      setModal
        ? (document.documentElement.style.overflow = 'hidden')
        : (document.documentElement.style.overflow = 'auto')
    }, [setModal])

    return (
      <Modal
        top={top}
        ref={modalRef}
        zIndex={zIndex}
        bottom={bottom}
        bgHeight={bgHeight}
        translateY={translateY}
        onClose={onClick || (onCloseClick && onCloseClick)}
      >
        <Style type={type}>
          <span>{makeTitle(type, title)}</span>

          <hr />

          <p>{message}</p>

          <button id='cy-confirm-popup' type='button' onClick={onConfirmClick}>
            Entendi!
          </button>
        </Style>
      </Modal>
    )
  }
)

export default Popup
