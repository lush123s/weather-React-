import React, { useEffect, useState } from 'react'
import search_icons from '../assets/search.png';
import clear from '../assets/clear.png';
import cloud from '../assets/cloud.png';
import drizzle from '../assets/drizzle.png';
import rain from '../assets/rain.png';
import snow from '../assets/snow.png';
import wind from '../assets/wind.png';
import humdity from '../assets/humidity.png';


const Weather = () => {
  const [weather, setweather] = useState(false);
  const [value, setvalue] = useState('')
  const allIcons = {
    '01d':clear,
    '01n':clear,
    '02d':cloud,
    '02n':cloud,
    '03d':cloud,
    '03n':cloud,
    '04d':drizzle,
    '04n':drizzle,
    '09d':rain,
    '09n':rain,
    '10d':rain,
    '10n':rain,
    '13d':snow,
    '13n':snow,
    '50d':clear
  }

   async function search(city){
    if(city === ''){
      alert('enter city name')
      return;
    }
    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
        let response = await fetch(url);
        if(!response.ok){
          alert('wirte vaild city name')
          return
        }
        let data = await response.json();
        console.log(data);
        let icons = allIcons[data.weather[0].icon]
        console.log(icons)
        setweather({
          humdity:data.main.humidity,
          temp:Math.floor(data.main.temp),
          windSpeed:data.wind.speed,
          location:data.name,
          icon: icons

        })

    }
    catch (error) {
      setweather(false)
        console.log('hello this is error please fix it');
    }
    }

    // useEffect(() => {
    //  search()
    // }, [])
    function handleChange(e){
      setvalue(e.target.value)
    }
  return (
    <div className='weather w-[320px] bg-blue-500 ml-96 rounded-lg p-6'>
      <div className="search flex items-center gap-4">
        <input onChange={handleChange} value={value} className='outline-none  rounded-sm px-4 py-1' placeholder='Enter city ' type="text" />
        <img onClick={function(){search(value)}} className='cursor-pointer bg-gray-100 p-2 rounded-full hover:bg-gray-200 ' src={search_icons} alt="" />
      </div>
      {weather?<>
        <img className='w-48 ml-9' src={weather.icon} alt="" />
      <h2 className='text-center text-3xl text-white font-semibold mb-3'>{weather.temp}°C</h2>
      <h2 className='text-center text-4xl text-white font-bold'>{weather.location}</h2>
      <div className="last  flex justify-between mt-14">
        <div className="left flex  gap-2">
            <img src={humdity} alt="" />
            <div>
            <p className='font-semibold text-white'>{weather.humdity}%</p>
            <span className='text-white'>Humidity</span>
            </div>
        </div>
        <div className="right flex gap-2">
            <img src={wind} alt="" />
            <div>
            <p className='font-semibold text-white'>{weather.windSpeed}/h</p>
            <span className='text-white'>Wind Speed</span>
            </div>
        </div>
      </div>
      </>:<></>}
      
    </div>
  )
}

export default Weather
