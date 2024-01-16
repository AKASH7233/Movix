import React from 'react'
import './style.scss';
import HeroBanner from './HeroBanner/HeroBanner';
import Trending from './Trending';
import Popular from './popular/Popular';
import TopRated from './TopRated/TopRated';
function Home() {
  return (
    <div className='homePage'>
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  )
}

export default Home