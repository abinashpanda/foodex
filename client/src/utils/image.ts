export const getImageUrl = (url: string) => {
  if (url.startsWith('/upload')) {
    return `${process.env.REACT_APP_API_BASE_URL}${url}`
  }
  return url
}
