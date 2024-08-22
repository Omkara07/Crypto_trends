import React, { useEffect, useState } from 'react'
import Cards from './Cards';
import { HashLoader } from 'react-spinners';
import top from '../images/top.png'
import { useNavigate } from 'react-router-dom';
const Top10 = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert('Sign in first')
      navigate('/')
    }
  }, [])
  const [data, setData] = useState([])
  useEffect(() => {
    const url = `https://api.coingecko.com/api/v3/search/trending`;

    fetch(url)
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error('error:' + err));
  }, [])
  return (
    <div className="flex justify-center flex-col w-full">

      <div className='flex justify-end bg-black w-full sticky '>
        <div className='flex flex-col justify-start w-[50%] items-center my-auto'>
          <h1 className='flex text-[70px] font-sans font-semibold'>Top of the </h1>
          <h1 className='flex text-[90px] font-extrabold font-serif bg-gradient-to-r from-emerald-800 via-lime-500 to-green-800 text-transparent bg-clip-text'>Chart$</h1>
        </div>
        <img className='flex w-[50%] rounded-full border-[15px] border-black' src={top} alt="trends" /></div>

      <div className='flex flex-col z-10'>
        {data.length === 0 ? <div className='h-[81vh] flex justify-center items-center'><HashLoader color="#84cc16" size={60} /></div> : <Cards data={data.coins} check={'top10'} />}
      </div>

    </div>
  )
}

export default Top10
