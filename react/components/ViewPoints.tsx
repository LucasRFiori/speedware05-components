import React, { useEffect, useState } from "react"
import style from './style.css'
import { useApolloClient } from 'react-apollo'
import GET_USER_PROFILE from '../graphql/getUserProfile.gql'
import axios from 'axios'

type ProfileType = {
  email: string;
}

type DataPointsType = {
  data: {
    id: string
    totalPoints: number
    userEmail: string
  }
}

export function ViewPoints() {
  const [profile, setProfile] = useState({} as ProfileType)
  const [points, setPoints] = useState(0)
  const client = useApolloClient()

  async function getUserProfile() {
    const { data } = await client.query({
      query: GET_USER_PROFILE
    })
    setProfile(data.profile)
  }

  async function getUserPoints() {
    const { data }: DataPointsType = await axios.post(`https://speedware05--speedware.myvtex.com/getTotalPoints`, {
      userEmail: profile
    })
    setPoints(data.totalPoints)
  }

  useEffect(() => {
    getUserProfile()
  }, [])

  useEffect(() => {
    if (!profile?.email) return
    getUserPoints()
  }, [profile])

  console.log(points)

  return (
    <div className={style.ViewPoints}>
      <div className={style.Container}>

        {profile?.email && (
          <>
            <span className={style.title}>Seus pontos:</span>
            <span className={style.contador}>{points}</span>
          </>
        )}

        {!profile?.email && (
          <span style={{ textAlign: "center" }} className={style.title}>Faça login para visualizar seus pontos.</span>
        )}

      </div>
    </div>
  )
}