import React, { useContext, useEffect, useRef, useState } from 'react'
import Style from './styles'

import { FormContext, FormState } from '../'

import CloseIcon from 'assets/global/CloseIcon'
import CameraIcon from 'assets/inputs/CameraIcon'
import DownloadIcon from 'assets/global/Download'

import Modal, { ModalMethods } from 'components/Modal'
import ErrorTooltip from 'components/Tooltips/ErrorTooltip'

import 'cropperjs/dist/cropper.css'
import { Cropper, ReactCropperProps } from 'react-cropper'

interface FileProps extends ReactCropperProps {
  top?: string
  name: string
  label: string
  bottom?: string
  maxSize?: string
  bgHeight?: string
  download?: boolean
  tranlateY?: string
  noCropper?: boolean
  flexColumn?: boolean
  onClick?: () => void
  onChange?: () => void
}

const File = ({
  top,
  name,
  label,
  bottom,
  accept,
  onClick,
  bgHeight,
  tranlateY,
  download = true,
  maxSize = '2048',
  noCropper = false,
  flexColumn = false,
  onChange: receivedOnChange,

  ...props
}: FileProps) => {
  const form = useContext<FormState | null>(FormContext)

  const fileRef = useRef<HTMLInputElement>(null)
  const modalRef = useRef<ModalMethods>(null)

  const [fileData, setFileData] = useState<string>()
  const [cropper, setCropper] = useState<any>()
  const [error, setError] = useState<string>()
  const [file, setFile] = useState<any>()

  const getCropData = () => {
    const url = cropper.getCroppedCanvas().toDataURL()
    cropper && setFileData(url)
  }

  const onChange = (e: any) => {
    e.preventDefault()
    setError(undefined)

    const file = e.target.files[0]

    if (file.size < 5242880) {
      const reader = new FileReader()

      reader.readAsDataURL(file)
      reader.onload = () => setFile(reader.result)
      receivedOnChange && receivedOnChange()
    } else setError('O arquivo é muito grande!')
  }

  useEffect(() => {
    const fileForInput = {
      type: 'file',
      inputRef: fileRef,
      value: noCropper ? file : fileData,
      setError
    }

    form?.registerInput(fileForInput)

    return () => form?.removeInput(fileForInput)
  }, [fileRef, form, fileData, noCropper, file])

  return (
    <Style
      className='File'
      flexColumn={flexColumn}
      haveValue={fileRef.current?.value}
    >
      <div id='fileInput'>
        <ErrorTooltip error={!!error} content={error} />

        {noCropper && (
          <div id='fileName'>
            {!error && fileRef.current?.value.split('C:\\fakepath\\')}
          </div>
        )}

        {noCropper && fileRef.current?.value && download && (
          <a
            href={file}
            download={fileRef.current?.value.split('C:\\fakepath\\')[1]}
          >
            <DownloadIcon />
          </a>
        )}

        <label onClick={() => onClick && onClick()}>
          <CameraIcon />

          {label}

          <input
            type='file'
            name={name}
            ref={fileRef}
            accept={accept}
            onChange={onChange}
            data-max-size={maxSize}
            style={{ display: 'none' }}
            onClick={() => modalRef.current?.toggle(true)}
          />
        </label>
      </div>

      {!noCropper && (
        <Modal
          top={top}
          ref={modalRef}
          bottom={bottom}
          bgHeight={bgHeight}
          translateY={tranlateY}
        >
          <div id='container'>
            <CloseIcon onClick={() => modalRef.current?.toggle(false)} />

            <Cropper
              center
              dragMode='move'
              className='Cropper'
              src={file}
              viewMode={3}
              guides={false}
              aspectRatio={1}
              background={false}
              minCropBoxWidth={80}
              minCropBoxHeight={80}
              checkOrientation={false}
              onInitialized={instance => setCropper(instance)}
              {...props}
            />

            <button
              type='button'
              onClick={() => {
                getCropData()
                modalRef.current?.toggle(false)
              }}
            >
              Selecionar
            </button>
          </div>
        </Modal>
      )}
    </Style>
  )
}

export default File
