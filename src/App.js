import React, { useEffect, useState } from 'react'
import { DailyForecast } from './components/DailyForecast'
import {Input} from './components/Input'
import {MainContent} from './components/MainContent'
import {Context} from './context/Context'
import {API_KEY} from './constants'

function App() {
    const [store, setStore] = useState({
        units: 'I',
        currentWeather: {},
        currentDailyForecast: []
    })
    const [currentCity, setCurrentCity] = useState('Almaty')

    useEffect(() => {
        fetch(`https://api.weatherbit.io/v2.0/current?key=${API_KEY}&city=${currentCity}&units=${store.units}`)
            .then(json => json.json())
            .then(data => {
                const {rh, wind_spd, wind_dir, temp, app_temp, dewpt, weather, vis, pres} = data.data[0]
                const currentWeather = {
                    humidity: rh,
                    wind_spd, wind_dir, temp,
                    feelsLikeTemp: app_temp,
                    dewPoint: dewpt,
                    visibility: vis,
                    barometer: pres * 0.0295301,
                    weather
                }
                setStore(prev => ({
                    ...prev,
                    currentWeather,
                    citiesWeather: {
                        ...prev.citiesWeather,
                        [currentCity]: currentWeather
                    }
                }))
            })

        fetch(`https://api.weatherbit.io/v2.0/forecast/daily?key=${API_KEY}&city=${currentCity}&units=${store.units}&days=4`)
            .then(json => json.json())
            .then(data => {
                const dailyForecast = data.data.map(day => {
                    const {valid_date, weather: {icon, description}, high_temp, low_temp} = day
                    return {
                        date: valid_date,
                        icon, description,
                        dayTimeTemp: high_temp,
                        nightTimeTemp: low_temp
                    }
                })
                setStore(prev => ({
                    ...prev,
                    currentDailyForecast: dailyForecast
                }))
            })
    }, [currentCity, store.units])

    return (
        <Context.Provider value={[store, setStore]}>
            <div className="w-screen h-screen bg-nightBg bg-center bg-cover bg-no-repeat">
                <div className="container mx-auto w-5/6 py-3 flex flex-col text-white space-y-6">
                    <Input currentCity={currentCity} setCurrentCity={setCurrentCity} />
                    <MainContent />
                    <DailyForecast />
                </div>
            </div>
        </Context.Provider>
    )
}

export default App
