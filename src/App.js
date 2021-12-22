import React, {useEffect, useState} from 'react'
import {DailyForecast} from './components/DailyForecast'
import {Input} from './components/Input'
import {MainContent} from './components/MainContent'
import {API_KEY} from './constants'

function App() {
    const [units, setUnits] = useState('I')
    const [currentWeather, setCurrentWeather] = useState({})
    const [currentDailyForecast, setCurrentDailyForecast] = useState([])
    const [currentCity, setCurrentCity] = useState('Almaty')

    useEffect(() => {
        fetch(
            `https://api.weatherbit.io/v2.0/current?key=${API_KEY}&city=${currentCity}&units=${units}`
        )
            .then(json => json.json())
            .then(data => {
                const {
                    rh, wind_spd, wind_dir, temp, app_temp, dewpt, weather, vis, pres,
                } = data.data[0]

                const currentWeather = {
                    humidity: rh,
                    wind_spd, wind_dir, temp,
                    feelsLikeTemp: app_temp,
                    dewPoint: dewpt,
                    visibility: vis,
                    barometer: pres * 0.0295301,
                    weather,
                }
                setCurrentWeather(currentWeather)
            })

        fetch(
            `https://api.weatherbit.io/v2.0/forecast/daily?key=${API_KEY}&city=${currentCity}&units=${units}&days=4`
        )
            .then(json => json.json())
            .then(data => {
                const dailyForecast = data.data.map(day => {
                    const {
                        valid_date,
                        weather: {icon, description},
                        high_temp,
                        low_temp,
                    } = day

                    return {
                        date: valid_date,
                        icon, description,
                        dayTimeTemp: high_temp,
                        nightTimeTemp: low_temp,
                    }
                })

                setCurrentDailyForecast(dailyForecast)
            })
    }, [currentCity, units])

    return (
        <div className="w-screen h-screen bg-nightBg bg-center bg-cover bg-no-repeat">
            <div className="container mx-auto w-5/6 py-3 flex flex-col text-white space-y-6">
                <Input
                    currentCity={currentCity}
                    setCurrentCity={setCurrentCity}
                />
                <MainContent
                    units={units}
                    setUnits={setUnits}
                    currentWeather={currentWeather}
                />
                <DailyForecast
                    currentDailyForecast={currentDailyForecast}
                />
            </div>
        </div>
    )
}

export default App
