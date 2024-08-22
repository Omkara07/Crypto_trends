import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../custom.css'
import Login from './Login';
import Signup from './Signup';

const Navbar = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignOpen, setSignOpen] = useState(false);

  const log = localStorage.getItem("token")
  // console.log(log)
  const [logged, setLogged] = useState(log);

  const openLog = () => setLoginOpen(true);
  const closeLog = () => setLoginOpen(false);
  const openSign = () => setSignOpen(true);
  const closeSign = () => setSignOpen(false);
  return (
    <div className='flex shadow-black shadow-md flex-row w-full bg-gray-900 p-5 justify-between'>
      <Link to={'/'}><h1 className=' text-2xl font-extrabold bg-gradient-to-br from-amber-500 via-lime-500 to-emerald-500 text-transparent bg-clip-text'> Crypto Trend$</h1></Link>
      <div className='flex mx-auto text-white justify-end gap-20'>
        <Link to='/top10' > <div className=' font-bold hover:text-lime-600'>Top10</div></Link>
        <Link to='/trending' > <div className=' font-bold hover:text-lime-600'>Trending</div></Link>
        <Link to='/watchlist' > <div className=' font-bold hover:text-lime-600'>Watchlist</div></Link>
      </div>
      {!logged && <div className='flex gap-8'>
        <div className='flex'>
          <button className='flex text-[14px] font-semibold cusBtn px-4 py-1 rounded-lg border-lime-700 border-[2px]' onClick={() => {
            closeSign()
            openLog()
          }
          }>Login</button>
          <Login isOpen={isLoginOpen} closeLog={closeLog} openSign={openSign} setLogged={setLogged} />
        </div>
        <div className='flex'>
          <button className='flex text-[14px] font-semibold cusBtn px-4 py-1 rounded-lg border-lime-700 border-[2px]' onClick={() => {
            closeLog()
            openSign()
          }
          }>Signup</button>
          <Signup isOpen={isSignOpen} closeSign={closeSign} openLog={openLog} setLogged={setLogged} />
        </div>
      </div>}
      {logged &&
        <div className='flex gap-8'>
          <div className='flex'>
            <button className='flex text-[14px] font-semibold delCusBtn px-4 py-1 rounded-lg' onClick={() => {
              localStorage.removeItem("token")
              setLogged(false)
            }
            }>Logout</button>
          </div>
        </div>}
    </div>
  )
}

export default Navbar
