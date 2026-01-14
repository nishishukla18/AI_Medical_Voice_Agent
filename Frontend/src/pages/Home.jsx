import React from 'react'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import Features from '../components/Features'
import Footer from '../components/Footer'
function Home() {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Features/>
        {/* <Footer/> */}
    </div>
  )
}

export default Home