import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TiArrowSortedUp } from "react-icons/ti";
import { TiArrowSortedDown } from "react-icons/ti";
import DOMPurify from 'dompurify';
import { FaXTwitter, FaLink, FaFacebook, FaGithub } from "react-icons/fa6";
import { HashLoader } from "react-spinners";

const SlugItem = () => {
    const { id } = useParams();

    const [data, setData] = useState({});
    const [cur, setCur] = useState('usd');
    // const [conv, setConv] = useState('')

    useEffect(() => {
        const f = async ()=>{
            console.log('hege')
            const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
            const json = await res.json();
            setData(json)
        }
        f()
        console.log('huh')
    }, []);

    console.log(data)

    function convertToPlainText(htmlString) {
        const cleanHtml = DOMPurify.sanitize(htmlString);
        return cleanHtml.replace(/<[^>]*>/g, '');
    }

    return (
        <div>
            {Object.keys(data).length === 0 ? <div className='h-[91vh] flex justify-center items-center'><HashLoader color="#84cc16" size={60} /></div> 
            : <div className="flex w-full min-h-[91vh]">
                <div className="flex flex-col w-1/3 border-r-gray-600 border-r-[1px] p-6 gap-5">
                    <div className="flex gap-2 items-center">
                        <a href={data.links.homepage[0]} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                            <img src={data.image.thumb} alt="" />
                            <div className="text-[20px] font-semibold">{data.name}</div>
                        </a>
                        <div className="text-gray-400">{data.symbol}</div>
                        <div className="flex justify-center items-center bg-slate-700 text-gray-300 text-[10px] px-1 rounded-md">#{data.market_cap_rank}</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex text-3xl font-mono font-extrabold">${data.market_data.current_price.usd}</div>
                        <div className={`flex ${data.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'} text-sm font-bold`}>
                            {data.price_change_percentage_24h > 0 ? <TiArrowSortedUp className="text-green-500 text-xl" /> : <TiArrowSortedDown className="text-red-500 text-xl" />}
                            {Math.round(data.market_data.price_change_percentage_24h * 100) / 100}%
                        </div>
                    </div>
                    <div className="flex w-full flex-col gap-1">
                        <div className="flex h-2 bg-gradient-to-r from-lime-500 to-green-500 w-full rounded-lg"></div>
                        <div className="flex justify-between font-semibold text-sm">
                            <div className="flex">${data.market_data.low_24h.usd}</div>
                            <div className="flex">24h Range</div>
                            <div className="flex">${data.market_data.high_24h.usd}</div>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center border-slate-400 border-[2px] rounded-lg bg-slate-800 p-1 justify-center">
                        <div className="flex text-slate-400 font-bold text-[13px]">{data.watchlist_portfolio_users}</div>
                        <span className="flex text-slate-400 text-[12px]"> added to their watchlist</span>
                    </div>
                    <div className="flex flex-col gap-4 text-sm">
                        <div className="flex justify-between border-b-[1px] border-gray-700 pb-4">
                            <div className="text-slate-400 font-semibold">Market Cap</div>
                            <div className="font-semibold">${data.market_data.market_cap.usd}</div>
                        </div>
                        <div className="flex justify-between border-b-[1px] border-gray-700 pb-4">
                            <div className="text-slate-400 font-semibold">Fully Diluted Valuation</div>
                            <div className="font-semibold">${data.market_data.fully_diluted_valuation.usd}</div>
                        </div>
                        <div className="flex justify-between border-b-[1px] border-gray-700 pb-4">
                            <div className="text-slate-400 font-semibold">24 Hour Trading Vol</div>
                            <div className="font-semibold">${data.market_data.total_volume.usd}</div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 pt-4 text-sm">
                        <h1 className="flex text-xl font-bold">Info</h1>
                        <div className="flex justify-between border-b-[1px] border-gray-700 pb-2">
                            <div className="text-slate-400 font-semibold">Website</div>
                            <a href={data.links.homepage[0]} target="_blank" rel="noreferrer"><div className="font-semibold bg-slate-800 p-1 rounded-lg flex items-center gap-1"><FaLink />Link</div></a>
                        </div>
                        <div className="flex justify-between border-b-[1px] border-gray-700 pb-2">
                            <div className="text-slate-400 font-semibold">Hashing Algorithm</div>
                            <div className="font-semibold bg-slate-800 p-1 rounded-lg">{data.hashing_algorithm}</div>
                        </div>
                        <div className="flex justify-between border-b-[1px] border-gray-700 pb-2">
                            <div className="text-slate-400 font-semibold">Community</div>
                            <div className="flex gap-1">
                                <div className="font-semibold bg-slate-800 p-1 rounded-lg flex items-center gap-1"><FaXTwitter />{data.links.twitter_screen_name}</div>
                                <div className="font-semibold bg-slate-800 p-1 rounded-lg flex items-center gap-1"><FaFacebook />{data.links.facebook_username}</div>
                            </div>
                        </div>
                        <div className="flex justify-between border-b-[1px] border-gray-700 pb-2">
                            <div className="text-slate-400 font-semibold">Source Code</div>
                            <a href={data.links.repos_url.github[0]} target="_blank" rel="noreferrer"><div className="font-semibold bg-slate-800 p-1 rounded-lg flex items-center gap-1"><FaGithub />Github</div></a>
                        </div>
                    </div>
                </div>
                <div className="flex w-2/3 flex-col p-8 gap-10">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-3xl font-bold text-green-600">About</h1>
                        <div className="text-gray-400 text leading-relaxed">
                            {convertToPlainText(data.description.en)}
                        </div>
                    </div>

                    <div className="flex gap-4 items-center">
                        <div>Currency : </div>
                        <button className="bg-green-800 hover:bg-green-700 text-white font-bold text-sm items-center px-1 rounded" onClick={
                            () => {
                                setCur('usd')
                            }
                        }>
                            USD
                        </button>
                        <button className="bg-green-800 hover:bg-green-700 text-white font-bold text-sm items-center px-1 rounded" onClick={
                            () => {
                                setCur('inr')
                            }
                        }>
                            INR
                        </button>
                        <button className="bg-green-800 hover:bg-green-700 text-white font-bold text-sm items-center px-1 rounded" onClick={
                            () => {
                                setCur('eur')
                            }
                        }>
                            EURO
                        </button>
                    </div>
                    <table className="flex flex-col w-full border-slate-800 rounded-xl">
                        <tbody>
                            <tr className="bg-slate-900 flex font-semibold ">
                                <td className={`flex justify-center items-center w-1/6 py-2 border-[1px] border-slate-800 rounded-ss-xl`}>1h</td>
                                <td className={`flex justify-center items-center w-1/6 py-2 border-[1px] border-slate-800`}>24h</td>
                                <td className={`flex justify-center items-center w-1/6 py-2 border-[1px] border-slate-800`}>7d</td>
                                <td className={`flex justify-center items-center w-1/6 py-2 border-[1px] border-slate-800`}>14d</td>
                                <td className={`flex justify-center items-center w-1/6 py-2 border-[1px] border-slate-800`}>30d</td>
                                <td className={`flex justify-center items-center w-1/6 py-2 border-[1px] border-slate-800 rounded-se-xl`}>1y</td>
                            </tr>
                            <tr className="flex">
                                <td className={`flex justify-center items-center w-1/6 py-2 border-[1px] border-slate-800 font-semibold rounded-es-xl ${data.market_data.price_change_percentage_1h_in_currency.usd > 0 ? 'text-green-500' : 'text-red-500'}`}>{Math.round(data.market_data.price_change_percentage_1h_in_currency[cur] * 100) / 100}%</td>
                                <td className={`flex justify-center items-center w-1/6 py-2 border-[1px] border-slate-800 font-semibold ${data.market_data.price_change_percentage_24h_in_currency.usd > 0 ? 'text-green-500' : 'text-red-500'}`}>{Math.round(data.market_data.price_change_percentage_24h_in_currency[cur] * 100) / 100}%</td>
                                <td className={`flex justify-center items-center w-1/6 py-2 border-[1px] border-slate-800 font-semibold ${data.market_data.price_change_percentage_7d_in_currency.usd > 0 ? 'text-green-500' : 'text-red-500'}`}>{Math.round(data.market_data.price_change_percentage_7d_in_currency[cur] * 100) / 100}%</td>
                                <td className={`flex justify-center items-center w-1/6 py-2 border-[1px] border-slate-800 font-semibold ${data.market_data.price_change_percentage_14d_in_currency.usd > 0 ? 'text-green-500' : 'text-red-500'}`}>{Math.round(data.market_data.price_change_percentage_14d_in_currency[cur] * 100) / 100}%</td>
                                <td className={`flex justify-center items-center w-1/6 py-2 border-[1px] border-slate-800 font-semibold ${data.market_data.price_change_percentage_30d_in_currency.usd > 0 ? 'text-green-500' : 'text-red-500'}`}>{Math.round(data.market_data.price_change_percentage_30d_in_currency[cur] * 100) / 100}%</td>
                                <td className={`flex justify-center items-center w-1/6 py-2 border-[1px] border-slate-800 font-semibold rounded-ee-xl ${data.market_data.price_change_percentage_1y_in_currency.usd > 0 ? 'text-green-500' : 'text-red-500'}`}>{Math.round(data.market_data.price_change_percentage_1y_in_currency[cur] * 100) / 100}%</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
            }
        </div>
    )
};

export default SlugItem
