import React, { useCallback, useEffect } from 'react'
import clsx from 'clsx'
import useStateFromProp from 'hooks/useStateFromProps'
import Close from 'icons/Close'
import usePrevious from 'hooks/usePrevious'
import { isEqual } from 'lodash-es'

interface Props {
  value?: string[]
  onChange?: (tags: string[]) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  placeholder?: string
  inputRef?: React.Ref<HTMLInputElement>
  id?: string
  name?: string
  className?: string
  style?: React.CSSProperties
}

const TagsInput: React.FC<Props> = ({
  value = [],
  onChange,
  onBlur,
  onFocus,
  placeholder,
  id,
  name,
  inputRef,
  className,
  style,
}) => {
  const [tags, setTags] = useStateFromProp(value)
  const prevTags = usePrevious(tags)

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.keyCode === 13) {
        event.preventDefault()
        const target = event.target as HTMLInputElement
        const { value } = target
        if (value && !tags?.includes(value)) {
          setTags((prevState) => (prevState ? [...prevState, value] : [value]))
        }
        // reset the value
        target.value = ''
      }
    },
    [setTags, tags],
  )

  const deleteTag = useCallback(
    (tag) => () => {
      setTags((prevState) =>
        prevState ? prevState.filter((value) => value !== tag) : [],
      )
    },
    [setTags],
  )

  useEffect(() => {
    if (onChange && !isEqual(tags, prevTags)) {
      onChange(tags)
    }
  }, [onChange, prevTags, tags])

  return (
    <div className={clsx('space-y-2', className)} style={style}>
      <input
        className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:shadow-outline"
        placeholder={placeholder}
        ref={inputRef}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
        id={id}
        name={name}
      />
      {tags && tags.length > 0 ? (
        <div className="flex flex-wrap -m-2">
          {tags.map((tag) => (
            <div
              key={tag}
              className="flex m-2 overflow-hidden rounded-md bg-green-50"
            >
              <span className="px-3 py-1 text-sm font-medium text-green-500">
                {tag}
              </span>
              <button
                className="flex items-center justify-center px-1 py-1 text-white bg-green-500"
                onClick={deleteTag(tag)}
                type="button"
              >
                <Close className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default TagsInput
