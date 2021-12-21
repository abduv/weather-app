import React, { useContext } from 'react'
import { Context } from '../context/Context'
import { ForecastOfDay } from './ForecastOfDay'

export const DailyForecast = () => {
    const [{currentDailyForecast}, setStore] = useContext(Context)

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
