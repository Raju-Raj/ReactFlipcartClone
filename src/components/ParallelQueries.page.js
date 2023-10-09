import React from 'react'
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSuperHeroes = () => {
    return axios.get(`http://localhost:4000/superheroes`)
}

const fetchFriends = () => {
    return axios.get(`http://localhost:4000/friends`)
}

const ParallelQueries = () => {
   const {data:superHeros} = useQuery('super-heroes',fetchSuperHeroes)
   const {data:friends} = useQuery('friends',fetchFriends)
  return (
    <div>ParallelQueries.page</div>
  )
}

export default ParallelQueries