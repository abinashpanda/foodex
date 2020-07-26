export const getImageUrl = (url: string) => {
  if (url.startsWith('/upload')) {
    return `${process.env.REACT_APP_API_BASE_URL}${url}`
  }
  return url
}

export const transformToUploaderObject = (image: {
  id: string
  url: string
}) => {
  return {
    uid: image.id,
    thumbUrl: getImageUrl(image.url),
    response: { _id: image.id, url: image.url },
  }
}
