import React,{ useEffect } from 'react'

import { FetchDataFromApi } from './utils/api'

import { useDispatch, useSelector } from 'react-redux'
import { getApiConfiguration, getGenres } from './slice/homeSlice';

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

import Home from './pages/Home/Home';
import Explore from './pages/explore/Explore'
import Details from './pages/details/Details'
import PageNotFound from './pages/404/PageNotFound'
import SearchResult from './pages/searchResult/SearchResult'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const {url} = useSelector(state => state.home)
  useEffect(()=>{
    fetchApiconfig();
    genresCall()
  },[])

  const fetchApiconfig = () => {
      FetchDataFromApi("/configuration")
     .then((res)=>{
      console.log(res);

      const url = {
        backdrop:  res.images.secure_base_url + 'original',
        poster  :  res.images.secure_base_url + 'original',
        profile :  res.images.secure_base_url + 'original',
      }
      dispatch(getApiConfiguration(url))
    })
  }

  const genresCall = async() => {
    let promises = []
    let endPoint = ['tv','movie'];
    let allGenres = {}

    endPoint.forEach((url)=>{
      promises.push(FetchDataFromApi(`/genre/${url}/list`))
    })

    const data = await Promise.all(promises)
    console.log(data);
    data.map(({genres})=> {
      return genres.map((item)=> allGenres[item.id] = item)
    });
    dispatch(getGenres(allGenres))
  }

  return (
   <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element= {<Home/>}/>
        <Route path = '/:mediaType/:id' element={<Details/>} />
        <Route path='/explore/:mediaType' element ={<Explore />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
   </BrowserRouter>
  )
}

export default App
