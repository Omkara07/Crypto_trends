import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../store/watchlistSlice";
import Cards from "../components/Cards";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const Watchlist = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const watchlistdata = useSelector((store) => store.watchlist.data);
  // const token = localStorage.getItem("token")
  // if (!token) {
  //   return (
  //     <div className="h-[91vh] font-bold text-4xl flex justify-center items-center">Login to see Watchlist</div>
  //   )
  // }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert('Sign in first')
      navigate('/')
    }
    else dispatch(fetchData());
  }, [])
  return (
    <div className="min-h-[91vh]">
      {watchlistdata.length === 0 ?
        <div className="h-[91vh] font-bold text-4xl flex justify-center items-center">No data in watchlist</div> :
        <div>
          <Cards data={watchlistdata} />
        </div>}
    </div>
  );
};

export default Watchlist;