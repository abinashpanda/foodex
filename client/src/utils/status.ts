import { capitalize } from 'lodash-es'

export const getStatusName = (status: string) => {
  return status
    .split('_')
    .map((val) => capitalize(val))
    .join(' ')
}
