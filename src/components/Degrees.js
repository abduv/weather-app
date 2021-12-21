import React, { useContext } from 'react'
import { Context } from '../context/Context'

export const Degrees = () => {
    const [{units, currentWeather}, setStore] = useContext(Context)

    const degreesStyle = 'p-2 transition-all duration-200 ease-in-out cursor-pointer'
    let celsiusStyle = degreesStyle + ' '
    let farengateStyle = degreesStyle + ' '

    if (units === 'I') {
        celsiusStyle += 'text-3xl text-gray-300 '
        farengateStyle += 'text-8xl '
    } else {
        celsiusStyle += 'text-8xl '
        farengateStyle += 'text-3xl text-gray-300 '
    }

    const degreesClickHandler = () => {
        setStore(prev => ({
            ...prev,
            units: prev.units === 'I' ? 'M' : 'I'
        }))
    }

    return (
        <div className="w-2/5 flex">
            <p className="w-2/3 text-9xl flex justify-center items-center">
                {currentWeather.temp}°
            </p>
            <div className="flex flex-col justify-center items-center w-1/3 divide-y divide-gray-300 ">
                <p className={farengateStyle} onClick={degreesClickHandler}>
                    °F
                </p>
                <p className={celsiusStyle} onClick={degreesClickHandler}>
                    °C
                </p>
            </div>
        </div>
    )
}
