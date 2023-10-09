import { useState } from 'react'
import { Link } from 'react-router-dom'
import React from 'react'
import { useAddSuperHeroData, useSuperHeroesData } from '../hooks/useSuperHeroesData'
// import { useQuery } from 'react-query'
// import axios from 'axios'

// const fetchSuperHeros = () => {
//     return axios.get("http://localhost:4000/superheroes")
// }

const RQSuperHeroes = () => {
    const [name,setName] = useState('');
    const [alterEgo,setAlterEgo] = useState('')


    const onSuccess = (data) => {
        console.log("Fetching Data Success")
        console.log(data)
    }
    const onError = (error) => {
        console.log("Fetching Data Failed")
        console.log(error)
    }
    // const {isLoading,data,isError,error,isFetching,refetch} = useQuery('super-heroes',fetchSuperHeros,
    // {
    //     // cacheTime:5000,
    //     // staleTime:0,
    //     // refetchOnMount:true,
    //     // refetchOnWindowFocus:"always"

    //     // refetchInterval:2000,
    //     // refetchIntervalInBackground:true,
    //     // enabled:false,

    //     onError,
    //     onSuccess,
    //     select:(data)=>{
    //         const superHeroNames = data.data.map((hero)=>hero.name)
    //         return superHeroNames
    //     }
    // }
    // )

    const {isLoading,data,isError,error,isFetching,refetch} = useSuperHeroesData(onSuccess,onError)

    const {mutate:addHero, isLoading:addHeroIsLoading,isError:addHeroIsError,error:addHeroError} = useAddSuperHeroData()

    const handleAddHeroClick = () => {
        const hero = {name,alterEgo}
        addHero(hero)
    }

    // console.log({isLoading,isFetching})

    if(isLoading || isFetching){
        return <h2>Loading...</h2>
    }

    if(isError){
        return <h2>{error.message}</h2>
    }
    

  return (
    <>
    <h2>RQ Super Heros Page</h2>
    <div>
        <input type='text' value={name} onChange={(e)=>setName(e.target.value)}/>
        <input type='text' value={alterEgo} onChange={(e)=>setAlterEgo(e.target.value)}/>
        <button onClick={handleAddHeroClick}>Add Hero</button>
    </div>
    <button onClick={refetch}>Fetch Data</button>
    {
        data?.data.map((hero)=>{
            return <div key={hero.id}>
                <Link to={`/rq-super-hero/${hero.id}`}>{hero.name}</Link>
            </div>
        })

        // data.map((heroName)=>{
        //     return <div key={heroName}>{heroName}</div>
        // })
    }
    </>
  )
}

export default RQSuperHeroes