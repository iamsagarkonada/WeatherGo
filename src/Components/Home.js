import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdSunny, IoMdCloudy, IoMdRainy, IoMdThunderstorm, IoMdSearch } from 'react-icons/io'
import { BsCloudHaze2Fill, BsCloudDrizzleFill, BsEye, BsWater, BsWind, BsSnow } from 'react-icons/bs'
import { TbTemperatureCelsius, TbThermometer } from 'react-icons/tb'
import { ImSpinner8 } from 'react-icons/im'

const APIkey = process.env.REACT_APP_APIKey;
const Home = () => {
    const [data, setData] = useState(null);
    const [location, setLocation] = useState('Hyderabad');
    const [inputValue, setInputValue] = useState('');
    const [animate, setAnimate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setMsg] = useState('');

const handleInput = (e) => {
    setInputValue(e.target.value);
};

const handleSubmit = (e) => {
    //console.log(inputValue);
    if (inputValue !== '') {
        setLocation(inputValue);
    }


const input = document.querySelector('input');

if (input.value === '') {
    setAnimate(true);
    setTimeout(() => {
        setAnimate(false);
}, 500)
}
input.value = '';
e.preventDefault();
}



useEffect(() => {
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;
    axios.get(url).then((res) => {
        setTimeout(() => {
            setData(res.data);
            setLoading(false);
        }, 1500)
    }).catch(err => {
        setLoading(false);
        setMsg(err);
    })
}, [location]);
    //console.log(data);
useEffect(() => {
    const timer = setTimeout(() => {
        setMsg('');
    }, 2000)
    return () => clearTimeout(timer);
}, [errorMsg])
if (!data) {
    return (
        <div>
            <div className='flex justify-center items-center my-40'>
                <ImSpinner8 className='text-3xl animate-spin' />
                <h2>Please Wait....</h2>
            </div>
        </div>
    )
}
let icon;
//console.log(data.weather[0].main);
switch (data.weather[0].main) {
    case 'Clouds':
        icon = <IoMdCloudy />;
        break;
    case 'Haze':
        icon = <BsCloudHaze2Fill />;
        break;
    case 'Rainy':
        icon = <IoMdRainy />;
        break;
    case 'Clear':
        icon = <IoMdSunny />;
        break;
    case 'Drizzle':
        icon = <BsCloudDrizzleFill />;
        break;
    case 'Snow':
        icon = <BsSnow />;
        break;
    case 'Thunderstorm':
        icon = <IoMdThunderstorm />;
        break;
    default:
        icon = <IoMdSunny />
        break;
}
const date = new Date();
return (
    <div className='w-full h-screen bg-gradient-to-b from-purple-400 to-blue-400 bg-no-repeat bg-cover bg-center items-center justify-center flex flex-col px-4 py-10 lg:px-0'>
        {errorMsg && <div className='w-60 text-center text-xl capitalize bg-gradient-to-b from-purple-300/30 to-purple-200/30 rounded-2xl '>{`${errorMsg.response.data.message}`}</div>}
        <form className={`${animate ? 'animate-shake' : 'animate-none'} h-16 bg-black/30 w-full max-w-[450px] rounded-full mb-8`}>
            <div className='h-full relative flex items-center justify-center p-2 py-3'>
                <input name='input' onChange={(e) => handleInput(e)} className='flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full' type='text' placeholder='Search By City or Country' />
                <button onClick={(e) => handleSubmit(e)} className='bg-blue-300 w-20 h-10 hover:bg-blue-400 hover:text-xl hover:text-white duration-300 flex justify-center items-center rounded-2xl '>
                    <IoMdSearch />
                </button>
            </div>
        </form>
        <div className='w-full max-w-[450px] bg-black/20 min-h-[430px] text-white rounded-lg py-12 px-6'>
            {loading ? <div className='w-full h-full flex justify-center items-center'>
                <ImSpinner8 className='text-white text-5xl animate-spin' />
            </div> : <div>
                <div className='flex flex-col items-center gap-x-5'>
                    <div className='text-6xl'>{icon}</div>
                    <div className='text-3xl font-bold'>{data.name},{data.sys.country}</div>
                    <div className='text-xl'>{date.getUTCDate()}/{date.getUTCMonth()}/{date.getUTCFullYear()}</div>
                </div>
                <div className='my-20'>
                    <div className='flex justify-center items-center'>
                        <div className='text-6xl font-light'>{parseInt(data.main.temp)}</div>
                        <div className='text-4xl'><TbTemperatureCelsius /></div>
                    </div>
                    <div className='capitalize text-center'>{data.weather[0].description}</div>
                </div>
                <div>
                    <div className='flex justify-between'>
                        <div className='flex items-center gap-x-2'>
                            <div className='text-[20px]'>
                                <BsEye />
                            </div>
                            <div className=''>Visibility <span>{data.visibility / 1000} km</span></div>
                        </div>
                        <div className='flex items-center gap-x-2'>
                            <div className='text-[20px]'>
                                <TbThermometer />
                            </div>
                            <div className='flex'>Feels Like <div className='flex ml-2'>{parseInt(data.main.feels_like)} {<TbTemperatureCelsius />}</div></div>
                        </div>
                    </div>
                </div>
                <div className='my-4'>
                    <div className='flex justify-between'>
                        <div className='flex items-center gap-x-2'>
                            <div className='text-[20px]'>
                                <BsWater />
                            </div>
                            <div>Humidity <span>{data.main.humidity} %</span></div>
                        </div>
                        <div className='flex items-center gap-x-2'>
                            <div className='text-[20px]'>
                                <BsWind />
                            </div>
                            <div className='flex'>Wind Speed<span className='ml-1'>{data.wind.speed}</span></div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    </div>
    )
}

export default Home
