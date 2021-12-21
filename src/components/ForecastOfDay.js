import React from 'react'

export const ForecastOfDay = ({data, idx}) => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const dayOfWeek = daysOfWeek[new Date(data.date).getDay()]
    const day = data.date.split('-')[2]
    let paddingStyle = ''

    if (!idx) {
        paddingStyle = 'border-l border-t border-r border-gray-400'
    } else {
        paddingStyle = 'border-b border-gray-400'
    }

    return (
        <div className={`flex flex-wrap flex-col w-1/4 p-5 space-y-2 ${paddingStyle}`}>
            <p className="text-3xl">{dayOfWeek} {day}</p>
            <img 
                className="w-12" 
                src={`https://www.weatherbit.io/static/img/icons/${data.icon}.png`}
                alt={data.description} 
            />
            <p className="text-4xl">{data.dayTimeTemp}°</p>
            <p className="text-4xl text-gray-400">{data.nightTimeTemp}°</p>
        </div>
    )
}
