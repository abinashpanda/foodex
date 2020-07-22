import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import Dropzone from 'react-dropzone'
import Plus from 'icons/Plus'
import usePrevious from 'hooks/usePrevious'
import { isEqual } from 'lodash-es'
import Close from 'icons/Close'
import UploadImage from './components/UploadImage'

interface Props {
  value?: { id: string; url: string }[]
  onChange?: (images: { id: string; url: string }[]) => void
  multiple?: boolean
  id?: string
  className?: string
  style?: React.CSSProperties
}

const ImageUploader: React.FC<Props> = ({
  value,
  onChange,
  multiple,
  id,
  className,
  style,
}) => {
  const [droppedFiles, setDroppedFiles] = useState<
    Array<File | { id: string; url: string }>
  >(value || [])
  const prevDroppedFiles = usePrevious(droppedFiles)

  useEffect(() => {
    if (onChange && !isEqual(droppedFiles, prevDroppedFiles)) {
      const uploadedFiles = droppedFiles.filter(
        (file) => !(file instanceof File),
      ) as {
        id: string
        url: string
      }[]
      onChange(uploadedFiles)
    }
  }, [droppedFiles, onChange, prevDroppedFiles])

  return (
    <Dropzone
      accept="image/*"
      multiple={multiple}
      onDrop={(acceptedFiles) => {
        setDroppedFiles((prevState) => [...prevState, ...acceptedFiles])
      }}
    >
      {({ getRootProps, getInputProps, isDragActive }) => (
        <div
          className={clsx(
            'rounded-md border p-4 overflow-hidden',
            isDragActive ? 'bg-green-50' : 'bg-white',
            className,
          )}
          style={style}
        >
          <div
            className="flex flex-wrap -m-2 focus:outline-none"
            {...getRootProps({
              onClick: (event) => {
                event.stopPropagation()
              },
            })}
          >
            <div className="relative flex flex-col items-center justify-center w-24 h-24 m-2 space-y-2 overflow-hidden text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200">
              <input
                {...getInputProps({ style: { display: 'block' } })}
                className="absolute inset-0 opacity-0 cursor-pointer"
                id={id}
              />
              <Plus className="w-6 h-6" />
              <div className="text-xs text-gray-600">Add Image</div>
            </div>
            {droppedFiles.map((file, index) =>
              file instanceof File ? (
                <UploadImage
                  file={file}
                  className="m-2"
                  key={file.name}
                  onUpload={({ _id, url }) => {
                    setDroppedFiles((prevState) => {
                      const nextState = [...prevState]
                      nextState.splice(index, 1, { id: _id, url })
                      return nextState
                    })
                  }}
                />
              ) : (
                <div
                  className="relative w-24 h-24 m-2 overflow-hidden rounded-md"
                  key={file.url}
                >
                  <img
                    src={file.url}
                    className="object-cover w-full h-full"
                    alt=""
                  />
                  <button
                    className="absolute top-0 right-0 p-1 text-gray-800 bg-white rounded-md focus:outline-none"
                    onClick={() => {
                      setDroppedFiles((prevState) => {
                        const nextState = [...prevState]
                        nextState.splice(index, 1)
                        return nextState
                      })
                    }}
                  >
                    <Close className="w-3 h-3" />
                  </button>
                </div>
              ),
            )}
          </div>
        </div>
      )}
    </Dropzone>
  )
}

export default ImageUploader
