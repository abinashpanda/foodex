import React from 'react'
import { addDecorator } from '@storybook/react'
import '../src/styles/tailwind.css'

addDecorator((storyFn) => <div className="h-screen p-4">{storyFn()}</div>)
