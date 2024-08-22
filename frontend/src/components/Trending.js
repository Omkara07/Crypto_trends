import React, { useEffect, useState } from 'react'
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";
import Cards from './Cards';
import { HashLoader } from 'react-spinners';
import trend from '../images/trend2.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Trending = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert('Sign in first')
      navigate('/')
    }
  }, [])
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  useEffect(() => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${page}&sparkline=false`;

    fetch(url)
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error('error:' + err));
  }, [page])
  return (
    <div className="flex justify-center flex-col w-full">

      <div className='flex justify-end bg-black w-full '>
        <div className='flex flex-col justify-start w-[50%] items-center my-auto'>
          <h1 className='flex text-[70px] font-sans font-semibold'>Get All the </h1>
          <h1 className='flex text-[90px] font-extrabold font-serif bg-gradient-to-r from-emerald-800 via-lime-500 to-green-800 text-transparent bg-clip-text'>Trend$</h1>
        </div>
        <img className='flex w-[50%] rounded-full border-[15px] border-black' src={trend} alt="trends" /></div>

      <div className='flex flex-col z-10'>
        {data.length === 0 ? <div className='h-[81vh] flex justify-center items-center'><HashLoader color="#84cc16" size={60} /></div> : <Cards data={data} />}
      </div>

      <div className='flex h-14 w-full items-center justify-around'>
        <button onClick={() => setPage(page - 1)} disabled={page === 1} className={`${page === 1 ? 'cursor-not-allowed' : ''}`}><MdOutlineArrowBackIos className='text-3xl' /></button>
        <button onClick={() => setPage(page + 1)} disabled={page === 5} className={`${page === 5 ? 'cursor-not-allowed' : ''}`}><MdOutlineArrowForwardIos className='text-3xl' /></button>
      </div>
    </div>
  )
}

export default Trending
