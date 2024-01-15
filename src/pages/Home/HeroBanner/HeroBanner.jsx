import React, { useEffect, useState } from 'react'
import './style.scss';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyLoadImage/img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

function HeroBanner() {
    const [query,setQuery] = useState('')
    const [background, setBackground] = useState('')
    const navigate = useNavigate() 
    const {url} = useSelector(state =>state.home);
    const {data,loading} = useFetch('/movie/upcoming');
    
    useEffect(()=>{
        const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path
        setBackground(bg)
    },[data])

    const searchQuery = (event) =>{
        if(event.key === "Enter" && query.length > 0){
            navigate(`/search/${query}`)     
        }
    }
  return (
    <div className='heroBanner'>
        
        {!loading && <div className="bg">
            <Img src={background}  className={"width:50px height:50px"}/>
          </div>
        }

        <div className="opacity-layer">

        </div>

        <ContentWrapper>
            <div className="heroBannerContent">
                <span className="title">Welcome.</span>
                <span className="subTitle">
                    Millions of movies, TV shows and people to discover.
                    Explore now.
                </span>
                <div className="searchInput">
                    <input
                        type="text"
                        placeholder="Search for a movie or tv show...."
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyUp={searchQuery}
                    />
                    <button>Search</button>
                </div>
            </div>
        </ContentWrapper>
    </div>
  )
}

export default HeroBanner