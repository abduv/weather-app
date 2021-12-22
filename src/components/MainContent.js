import React from 'react'
import {Degrees} from './Degrees'
import {WeatherConditions} from './WeatherConditions'

export const MainContent = ({units, currentWeather, setUnits}) => {
    return (
        <div className="px-2 py-7 flex">
            <Degrees
                units={units}
                setUnits={setUnits}
                currentWeather={currentWeather}
            />
            <WeatherConditions
                units={units}
                currentWeather={currentWeather}
            />
        </div>
    )
}
