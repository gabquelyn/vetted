"use client"
import React, { useState } from 'react'
import Hero from './Hero'
import RegistryModal from './RegistryModal'


export default function HeroSection() {
     const [registryOpen, setRegistryOpen] = useState(false);
  return (
    <>
      <Hero onTryRegistry={() => setRegistryOpen(true)} />
      <RegistryModal open={registryOpen} onClose={() => setRegistryOpen(false)} />
    </>
  )
}
