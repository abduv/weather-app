import React, { useContext } from 'react'
import { Context } from '../context/Context'

export const WeatherConditions = () => {
    const [{units, currentWeather}, setStore] = useContext(Context)

    return (
        <div className="w-3/5 flex flex-wrap pl-16">
            <div className="w-full text-6xl flex items-end pb-1">
                {currentWeather?.weather?.description}
            </div>
            <div className="w-1/2 pl-2 pt-2 text-lg">
                <p>Feels like: {currentWeather.feelsLikeTemp}°</p>
                <p>Barometer: {currentWeather.barometer?.toFixed(2)} in</p>
                <p>Humidity: {currentWeather.humidity}%</p>
            </div>
            <div className="w-1/2 pl-2 pt-2 text-lg">
                <p>
                    Wind:&nbsp;
                    <span 
                        className={`inline-block transform`} 
                        style={{'--tw-rotate': currentWeather.wind_dir + 'deg'}}
                    >
                        🢁
                    </span>&nbsp;
                    {currentWeather.wind_spd}{units === 'M' ? 'm/s' : 'mph'}
                </p>
                <p>
                    Visibility: {currentWeather.visibility} {units === 'M' ? 'km' : 'mi'}
                </p>
                <p>
                    Dew point: {currentWeather.dewPoint}°
                </p>
            </div>
        </div>
    )
}
