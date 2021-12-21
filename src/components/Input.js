import React from 'react'

export const Input = ({currentCity, setCurrentCity}) => {
    const cities = ['Almaty', 'Tokyo', 'London', 'New York', 'San Francisco']

    const changeHandler = e => {
        setCurrentCity(e.target.value)
    }

    return (
        <div>
            <select className="w-1/3 h-10 bg-translucentWhite" onChange={changeHandler} value={currentCity}>
                {
                    cities.map(city => (
                        <option className="bg-gray-400" value={city} key={city}>
                            {city}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}
