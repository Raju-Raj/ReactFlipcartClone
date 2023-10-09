import React from 'react'
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchUserByEmail = (email) => {
    return axios.get(`http://localhost:4000/users/${email}`)
}

const fetchCoursesByChannelId = (channelId) => {
    return axios.get(`http://localhost:4000/channels/${channelId}`)
}

const DependentQueries = ({email}) => {
    const {data:user} = useQuery(['user',email],() => fetchUserByEmail(email))
    const channelId = user?.data.channelId
    const {data:channels} = useQuery(['courses',channelId],() => fetchCoursesByChannelId(channelId),{
        enabled: !!channelId,
    })
  return (
    <div>
        {
            channels?.data.courses.map((ch)=><p key={ch}>{ch}</p>)
        }
    </div>
  )
}

export default DependentQueries