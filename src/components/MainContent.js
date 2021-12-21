import React from 'react'
import {Degrees} from './Degrees'
import {WeatherConditions} from './WeatherConditions'

export const MainContent = () => {
    return (
        <div className="px-2 py-7 flex">
            <Degrees />
            <WeatherConditions />
        </div>
    )
}
