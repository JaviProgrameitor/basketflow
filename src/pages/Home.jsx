import React from 'react'
import Hero from '../components/ui/Hero.jsx'
import FeatureGrid from '../components/ui/FeatureGrid.jsx'
import Steps from '../components/ui/Steps.jsx'
import Pricing from '../components/ui/Pricing.jsx'
import CTA from '../components/ui/CTA.jsx'

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <FeatureGrid />
      <Steps />
      {/* <Pricing /> */}
      <CTA />
    </div>
  )
}

export default Home