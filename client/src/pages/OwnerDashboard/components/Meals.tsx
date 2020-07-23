import React from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import CreateMeal from './CreateMeal'

const Meals = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-2xl font-bold text-gray-700">Meals</div>
        <CreateMeal
          trigger={
            <Button type="primary" icon={<PlusOutlined />}>
              Add Meal
            </Button>
          }
        />
      </div>
    </div>
  )
}

export default Meals
