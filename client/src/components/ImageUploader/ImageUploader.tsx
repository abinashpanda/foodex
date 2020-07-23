import React, { useContext, useMemo } from 'react'
import { Upload } from 'antd'
import AuthContext from 'contexts/AuthContext'
import Axios from 'axios'
import { PlusOutlined } from '@ant-design/icons'

interface Props
  extends Omit<
    React.ComponentProps<typeof Upload>,
    'action' | 'data' | 'cutomRequest'
  > {}

const ImageUploader: React.FC<Props> = React.forwardRef(
  ({ multiple, fileList, ...restProps }: Props, ref: any) => {
    const { jwt } = useContext(AuthContext)
    const client = useMemo(
      () =>
        Axios.create({
          baseURL: process.env.REACT_APP_API_BASE_URL,
          headers: { Authorization: `Bearer ${jwt}` },
        }),
      [jwt],
    )

    const showUploader = multiple ? true : !fileList || fileList.length < 1

    return (
      <Upload
        ref={ref}
        customRequest={async ({ file, onProgress, onSuccess, onError }) => {
          const formData = new FormData()
          formData.append('files', file)
          try {
            const { data } = await client.post<{ _id: string; url: string }[]>(
              '/upload',
              formData,
              {
                onUploadProgress: ({ total, loaded }) => {
                  onProgress(
                    { percent: Math.round((loaded / total) * 100) },
                    file,
                  )
                },
              },
            )
            onSuccess(data[0], file)
          } catch (error) {
            onError(error)
          }
        }}
        fileList={fileList}
        multiple={multiple}
        {...restProps}
      >
        {showUploader ? (
          <div className="flex flex-col items-center justify-center space-y-2">
            <PlusOutlined className="w-4 h-4" />
            <div className="text-xs">Upload</div>
          </div>
        ) : null}
      </Upload>
    )
  },
)

ImageUploader.displayName = 'ImageUploader'

ImageUploader.defaultProps = {
  listType: 'picture-card',
}

export default ImageUploader
