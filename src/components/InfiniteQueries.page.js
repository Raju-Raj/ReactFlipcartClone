import React from 'react';
import { useInfiniteQuery } from 'react-query';
import axios from 'axios';

const fetchColors = ({pageParam = 1}) => {
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)
}


const InfiniteQueries = () => {
    const {isLoading,isError,error,data,hasNextPage,fetchNextPage,isFetching,isFetchingNextPage} = useInfiniteQuery('colors',fetchColors,{
        getNextPageParam:(_lastPage,pages)=>{
            if(pages.length < 4) {
                return pages.length + 1
            }else{
                return undefined
            }
        }
    })
    if(isLoading){
        return <h2>Loading ..</h2>
    }

    if(isError){
        return <h2>{error.message}</h2>
    }
  return (
    <div>
        {isFetching && 'Loading..'}
        {
            data?.pages.map((group,i)=>{
                return(
                    <React.Fragment key={i}>
                        {
                            group.data.map((color)=>(
                        <div key={color.id}>
                        <h2>
                            {color.id} - {color.label}
                        </h2>
                        </div>
                            ))
                        }
                    </React.Fragment>
                )
            })
        }
        <div>
            <button disabled={!hasNextPage} onClick={fetchNextPage}>LoadMore</button>
        </div>
        <div>{isFetching && !isFetchingNextPage ? 'Fetching..' : null}</div>
    </div>
  )
}

export default InfiniteQueries