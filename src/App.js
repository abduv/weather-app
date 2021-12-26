import React, {useEffect, useState} from 'react'
import {useQuery} from 'react-query'
import {DailyForecast} from './components/DailyForecast'
import {Input} from './components/Input'
import {Loader} from './components/Loader'
import {MainContent} from './components/MainContent'
import {API_KEY} from './constants'

function App() {
    const [units, setUnits] = useState('I')
    const [currentWeather, setCurrentWeather] = useState({})
    const [currentDailyForecast, setCurrentDailyForecast] = useState([])
    const [currentCity, setCurrentCity] = useState('Almaty')

    const fetchWeather = async ({queryKey}) => {
        const [key, {API_KEY: api_key, currentCity: city, units: u, days}] = queryKey
        let res

        if (key === 'currentWeather') {
            res = await fetch(`https://api.weatherbit.io/v2.0/current?key=${api_key}&city=${city}&units=${u}`)
        } else if (key === 'currentDailyForecast') {
            res = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?key=${API_KEY}&city=${currentCity}&units=${units}&days=${days}`)
        }

        if (!res.ok) {
            throw new Error('Error')
        }
        return res.json()
    }

    const currentWeatherData = useQuery(['currentWeather', {API_KEY, currentCity, units}], fetchWeather)

    useEffect(() => {
        if (currentWeatherData.data) {
            const {
                rh, wind_spd, wind_dir, temp, app_temp, dewpt, weather, vis, pres,
            } = currentWeatherData.data.data[0]
            setCurrentWeather({
                humidity: rh,
                wind_spd, wind_dir, temp,
                feelsLikeTemp: app_temp,
                dewPoint: dewpt,
                visibility: vis,
                barometer: pres * 0.0295301,
                weather,
            })
        }
    }, [currentWeatherData.data])

    const currentDailyForecastData = useQuery(['currentDailyForecast', {API_KEY, currentCity, units, days: 4}], fetchWeather)

    useEffect(() => {
        if (currentDailyForecastData.data) {
            const dailyForecast = currentDailyForecastData.data.data.map(day => {
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
        }
    }, [currentDailyForecastData.data])

    if (currentWeatherData.isLoading || currentDailyForecastData.isLoading) {
        return <Loader />
    }

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
