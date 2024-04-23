import React from 'react'
import Layout from '../Components/Layout'
import { useParams } from 'react-router-dom'

const SingleUser = () => {
    const params = useParams()
  return (
    <Layout>
        <div>
            <h1>Single User : {params.id}</h1>
        </div>
    </Layout>
  )
}

export default SingleUser
