import React from 'react'
import HeroAndModal from './components/Hero'
import HowProfessionsDual from './components/HowProfessional'
import Faq from './components/Faq'
import JoinSection from './components/Join'

export default function page() {
  return (
    <div>
      <HeroAndModal/>
      <HowProfessionsDual/>
      <JoinSection/> 
      <Faq/>
    </div>
  )
}
