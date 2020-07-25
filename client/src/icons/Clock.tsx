import React from 'react'

interface Props extends React.SVGProps<SVGSVGElement> {}

const Clock: React.FC<Props> = (props) => (
  <svg
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
  >
    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

export default Clock
