import React from 'react'
import Hero from './components/Hero'
import WhyItMatters from './components/Matters'
import HowItWorks from './components/Work'
import IndependentContractors from './components/Ic'
import Compare from './components/Compare'
import JoinSection from './components/JoinSection'

export default function page() {
  return (
    <div>
      <Hero/>
      <WhyItMatters/>
      <HowItWorks/>
      <IndependentContractors/>
      <Compare/>
      <JoinSection/>
    </div>
  )
}
