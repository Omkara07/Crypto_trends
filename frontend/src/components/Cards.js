import React from 'react'
import Card from './Card'

const Cards = ({ data, check }) => {

    return (
        <>
            <table className='flex flex-col overflow-x-auto'>
                <tbody>
                    <tr className='flex px-4 pl-10 justify-between font-mono text-[14px] h-10 items-center bg-black mx-auto w-5/6'>
                        <td className="flex gap-20 justify-between">
                            <div className='flex'>#</div>
                            <div className='flex'>Coin</div>
                        </td>
                        <td className='w-10'> </td><td></td>
                        <td className="flex justify-center w-20 ml-20">Price</td>
                        {!check && <td className="flex justify-center w-20">24h Up</td>}
                        {!check && <td className="flex justify-center w-20">24h low</td>}
                        <td className="flex justify-center w-20">24h change</td>
                        {/* <div className="flex gap-8"> */}
                        <td className="flex justify-center w-28">24h Vol</td>
                        <td className="flex justify-center w-28">Market Cap</td>
                        {/* </div> */}
                    </tr>
                    {/* <div className='flex flex-col h-full'> */}
                    {data.map((items, i) => {
                        return <Card key={i} item={check === 'top10' ? items.item : items} check={check} />
                    })}
                    {/* </div> */}
                </tbody>
            </table>
        </>
    )
}

export default Cards
