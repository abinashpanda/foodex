import React from 'react'

interface Props extends React.SVGProps<SVGSVGElement> {}

const Plus: React.FC<Props> = (props) => (
  <svg
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
  >
    <path d="M12 4v16m8-8H4" />
  </svg>
)

export default Plus
