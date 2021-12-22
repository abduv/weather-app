import React from 'react'
import { ForecastOfDay } from './ForecastOfDay'

export const DailyForecast = ({currentDailyForecast}) => {
    return (
        <div className="flex">
            {
                currentDailyForecast.map((day, i) => (
                    <ForecastOfDay key={day.date} data={day} idx={i}/>
                ))
            }
        </div>
    )
}
