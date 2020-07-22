import React, { useContext, useEffect, useState } from 'react'
import clsx from 'clsx'
import AuthContext from 'contexts/AuthContext'
import Axios from 'axios'

interface Props {
  file: File
  onUpload: (imageData: { _id: string; url: string }) => void
  className?: string
  style?: React.CSSProperties
}

const UploadImage: React.FC<Props> = ({ file, onUpload, className, style }) => {
  const { jwt } = useContext(AuthContext)

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const uploadImage = async () => {
      const client = Axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      const formData = new FormData()
      formData.append('files', file)
      const { data } = await client.post<{ _id: string; url: string }[]>(
        '/upload',
        formData,
        {
          onUploadProgress: (progress) =>
            setProgress(progress.loaded / progress.total),
        },
      )
      const imageData = data[0]
      onUpload({
        _id: imageData._id,
        url: `${process.env.REACT_APP_API_BASE_URL}${imageData.url}`,
      })
    }

    uploadImage()
  }, [file, jwt, onUpload])

  return (
    <div
      className={clsx(
        'w-24 h-24 overflow-hidden rounded-md relative',
        className,
      )}
      style={style}
    >
      <img
        src={window.URL.createObjectURL(file)}
        alt=""
        className="object-cover w-full h-full"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-4 ease-out bg-white opacity-50"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}

export default UploadImage
