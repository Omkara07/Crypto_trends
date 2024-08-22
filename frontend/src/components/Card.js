import React from 'react'
import { MdOutlineStarBorderPurple500 } from "react-icons/md";
import { GoArrowUpRight } from "react-icons/go";
import { FiArrowDownRight } from "react-icons/fi";
import '../custom.css'
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addData, removeData } from "../store/watchlistSlice";
import { MdOutlineStarPurple500 } from "react-icons/md";


const Card = ({ item, check }) => {
  const watchlist = useSelector((store) => store.watchlist.data);

  const dispatch = useDispatch();

  function wathlistadd() {
    dispatch(addData(item));
  }

  const watchlistremove = () => {
    dispatch(removeData(item));
  }
  // console.log(watchlist)
  const exist = watchlist.find((i) => i.id === item.id);

  return (
    <tr className='flex items-center hover:bg-gray-800  h-16 justify-between px-4 mx-auto w-5/6 rounded-lg transition-all'>
      <td className="flex gap-4 items-center w-64">
        {exist ?
          <MdOutlineStarPurple500 onClick={watchlistremove} className='text-green-400 text-xl' />
          : <MdOutlineStarBorderPurple500 onClick={wathlistadd} className='hover:text-green-500 text-xl' />
        }
        <div>{item.market_cap_rank}</div>
        <abbr title="Click to expand the Coin">
          <Link to={`/coin/${item.id}`}>
            <img className='w-6' src={check === 'top10' ? item.thumb : item.image} alt="" />
          </Link>
        </abbr>
        <div className='text-lg font-semibold'>{item.name}</div>
        <div className='text-gray-400 text-[14px]'>{item.symbol}</div>
      </td>
      <td className='w-10 justify-center'><button className='flex text-[14px] cusBtn px-2 text-lime-400 rounded-lg border-lime-400 border-[1px] hover:font-semibold'>Buy</button></td>
      <td></td>
      <td className='flex text-[18px] font-mono font-semibold w-20 justify-center'><span className='text-lime-500 font-semibold'>$</span>{check === 'top10' ? Math.round(item.data.price * 100) / 100 : Math.round(item.current_price * 100000) / 100000}</td>
      {!check && <td className='flex text-[14px] text-green-500 w-20 justify-center'><span className='text-lime-500 font-semibold'>$</span>{Math.round(item.high_24h * 10) / 10}  <GoArrowUpRight className='w-9 text-xl' /></td>}
      {!check && <td className='flex text-[14px] text-red-400 w-20 justify-center'><span className='text-lime-500 font-semibold'>$</span>{Math.round(item.low_24h * 10) / 10}  <FiArrowDownRight className='w-9 text-xl' /></td>}
      {!check && <td className={`flex text-[14px] w-20 justify-center ${item.price_change_24h > 0 ? 'text-green-500' : 'text-red-400'}`}>${Math.round(item.price_change_24h * 100) / 100}  {item.price_change_24h > 0 ? <GoArrowUpRight className='w-9 text-xl' /> : <FiArrowDownRight className='w-9 text-xl' />}</td>}
      {check && <td className={`flex text-[14px] w-20 justify-center mx-8 ${item.data.price_change_percentage_24h.usd > 0 ? 'text-green-500' : 'text-red-400'}`}>${Math.round(item.data.price_change_percentage_24h.usd * 100) / 100}  {item.data.price_change_percentage_24h.usd > 0 ? <GoArrowUpRight className='w-9 text-xl' /> : <FiArrowDownRight className='w-9 text-xl' />}</td>}
      <td><span className='text-lime-500 font-semibold w-28'>$</span>{check === 'top10' ? item.data.total_volume : item.total_volume}</td>
      <td><span className='text-lime-500 font-semibold w-28'>$</span>{check === 'top10' ? item.data.market_cap : item.market_cap}</td>
    </tr>
  )
}

export default Card
