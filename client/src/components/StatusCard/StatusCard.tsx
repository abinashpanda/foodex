import React from 'react'
import { StatusInfo } from 'types/StatusInfo'
import clsx from 'clsx'
import { statusColors, getStatusName, getStatusImage } from 'utils/status'
import moment from 'moment'

interface Props {
  status: StatusInfo
  className?: string
  style?: React.CSSProperties
}

const StatusCard: React.FC<Props> = ({ status, className, style }) => {
  const statusImage = getStatusImage(status.status)

  return (
    <div
      className={clsx(
        'p-3 flex items-center space-x-3 rounded-md shadow',
        className,
      )}
      style={style}
    >
      {statusImage ? (
        <img src={statusImage} className="w-8 h-8" alt="" />
      ) : null}
      <div className="flex-1">
        <div
          className={clsx('font-medium', `text-${statusColors[status.status]}`)}
        >
          {getStatusName(status.status)}
        </div>
        <div className="text-xs text-gray-500">
          {moment(status.createdAt).format('Do MMM, YYYY | hh:mm a')}
        </div>
      </div>
    </div>
  )
}

export default StatusCard
