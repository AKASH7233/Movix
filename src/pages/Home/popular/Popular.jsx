import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/SwitchTab/SwitchTabs'
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';

function Popular() {
    const [endPoint,setEndPoint] = useState('movie');

    const {data,loading} = useFetch(`/${endPoint}/popular`);
    console.log(data);
    const onTabChange = (tab) => {
        setEndPoint(tab === "Movies" ? "movie" : 'tv')
    }
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className='carouselTitle'>What's Popular</span>
            <SwitchTabs data={['Movies','TV Shows']} onTabChange = {onTabChange} />
        </ContentWrapper >
        <Carousel data={data?.results} loading={loading} endPoint={endPoint}/>
    </div>
  )
}

export default Popular