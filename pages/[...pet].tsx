import dynamic from 'next/dynamic'
import React from 'react'
import Layout from '../components/Layout';
const Pet = dynamic(() => import("../components/Pet"))

const MyPet = () => {
    return (    
    <Layout >    
        <Pet />
    </Layout>
    )
}
export default MyPet;
