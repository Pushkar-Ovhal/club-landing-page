import React from 'react'
import Nav from './components/sections/Nav'
import HeroSection from './components/sections/Hero'
import MissionSection from './components/sections/Mission'
import EventsSections from './components/sections/Events'
import Team from './components/sections/Team'
import WhyOurClub from './components/sections/WhyOurClub'
import FAQs from './components/sections/FAQs'
import FooterSection from './components/sections/Footer'

function LandingPage() {
  return (
    <>
      <Nav />
      <HeroSection />
      <MissionSection />
      <EventsSections />
      <Team />
      <WhyOurClub />
      <FAQs />
      <FooterSection />
    </>
  )
}

export default LandingPage