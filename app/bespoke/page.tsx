import React from 'react'
import HeroSection from './components/Hero'
import Clients from './components/Clients'
import Work from './components/Work'
import Outcomes from './components/Outcomes'
import Outlook from './components/Outlook'
import Philosophy from './components/Philisophy'
import ContactSection from './components/Contact'

export default function page() {
  return (
    <div>
      <HeroSection/>
      <Clients/>
      <Work/>
      <Outcomes/>
      <Outlook/>
      <Philosophy/>
      <ContactSection/>
    </div>
  )
}
