import React, { useEffect } from 'react'
import imgg from '../images/Screenshot (1033).png'
import { FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchData } from '../store/watchlistSlice';

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchData())
    }
  }, [navigate, dispatch])

  return (
    <div className='flex justify-between flex-col gap-28'>
      <div className={`flex flex-col text-7xl justify-center items-center gap-10 p-10 shadow-gray-950 shadow-md`}>

        <div className="relative inline-flex overflow-hidden rounded-full p-[2px]">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#111827_0%,#15803d_50%,#65a30d_100%)]" />
          <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-neutral-950 px-3 py-1 text-xs font-medium text-green-600 backdrop-blur-3xl">
            Crypto Trends
          </span>
        </div>

        <h1 className='flex font-extrabold font-serif p-4 pt-14'>World's Premier</h1>
        <h1 className='flex font-extrabold font-serif text-transparent bg-clip-text p-4 animate-gradient-text'>Crypto Tracking Platform</h1>
        <h2 className='flex text-2xl font-semibold text-slate-400'>Track Bitcoin, Etherium and 100+ Cryptocurrencies</h2>
      </div>

      <div className='flex justify-center items-center mx-auto gap-4 shadow-gray-950 shadow-md w-full pb-10'>
        <div className='flex flex-col gap-6'>
          <FaCheckCircle className='text-green-600 text-xl justify-start' />
          <FaCheckCircle className='text-green-600 text-xl justify-start' />
          <FaCheckCircle className='text-green-600 text-xl justify-start' />
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex text-xl font-semibold text-slate-200 items-center gap-3 justify-between w-full'>
            Trade with 20+ fiat currencies and Apple/Google Pay</div>
          <div className='flex text-xl font-semibold text-slate-200 items-center gap-3 justify-between w-full'>
            Leader in regulatory compliance and security certifications</div>
          <div className='flex text-xl font-semibold text-slate-200 items-center gap-3 justify-between w-full'>
            Trusted by over 100 million users worldwide</div>
        </div>
      </div>

      <div className='flex justify-around flex-col gap-28 shadow-md shadow-gray-950 pb-28'>
        <h1 className='flex text-5xl justify-center font-extrabold font-serif'>Explore</h1>
        <div className='flex justify-around'>
          <Link to='Trending'>
            <div className="flex shadow-lg shadow-gray-900">
              <h1 className='flex text-2xl flex-col gap-8 border-gray-500 border-[1px] font-bold rounded-lg h-48 w-80 justify-center items-center hover:bg-black hover:border-[3px] transform transition-transform duration-300 hover:scale-105 hover:bg-gradient-to-br from-yellow-600 via-lime-600 to-emerald-600 hover:text-transparent bg-clip-text hover:text-[25px]'>
                Cryptocurrency Trends
                <p className='text-gray-400 text-sm px-10 justify-center text-center'>Get yourself up to date with the market trends.</p>
              </h1>
            </div>
          </Link>
          <Link to='top10'>
            <div className="flex shadow-lg shadow-gray-900">
              <h1 className='flex text-2xl flex-col gap-8 border-gray-500 border-[1px] font-bold rounded-lg h-48 w-80 justify-center items-center hover:bg-black hover:border-[3px] transform transition-transform duration-300 hover:scale-105 hover:bg-gradient-to-br from-yellow-600 via-lime-600 to-emerald-600 hover:text-transparent bg-clip-text hover:text-[25px]'>
                Top 10's
                <p className='text-gray-400 text-sm px-10 justify-center text-center'>Real-time overview of top-performing cryptocurrencies and market trends.</p>
              </h1>
            </div>
          </Link>
          <Link to='watchlist'>
            <div className="flex shadow-lg shadow-gray-900">
              <h1 className='flex text-2xl flex-col gap-8 border-gray-500 border-[1px] font-bold rounded-lg h-48 w-80 justify-center items-center hover:bg-black hover:border-[3px] transform transition-transform duration-300 hover:scale-105 hover:bg-gradient-to-br from-yellow-600 via-lime-600 to-emerald-600 hover:text-transparent bg-clip-text hover:text-[25px]'>
                Your Watchlist
                <p className='text-gray-400 text-sm px-10 justify-center text-center'>Personal dashboard to monitor and manage your crypto investments.</p>
              </h1>
            </div>
          </Link>
        </div>
      </div>

      <div className='flex justify-center items-center flex-col gap-10 pb-20'>
        <h1 className='flex text-5xl font-serif font-bold text-slate-200'><span className='text-7xl bg-gradient-to-br from-yellow-600 via-lime-600 to-emerald-600 text-transparent bg-clip-text'>T</span>rack World's Leading Crptocurrencie <span className='bg-gradient-to-br from-yellow-600 via-lime-600 to-emerald-600 text-transparent bg-clip-text '>$</span></h1>
        <img className='flex  w-[65%] justify-center' src={imgg} alt="" />
      </div>
    </div>
  )
}

export default Home
