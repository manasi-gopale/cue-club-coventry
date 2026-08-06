import { useLenis } from './hooks/useLenis'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

import Hero from './sections/Hero'
import About from './sections/About'
import TablesFacilities from './sections/TablesFacilities'
import Membership from './sections/Membership'
import Events from './sections/Events'
import Gallery from './sections/Gallery'
import Booking from './sections/Booking'

export default function App() {
  useLenis()

  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <TablesFacilities />
        <Membership />
        <Events />
        <Gallery />
        <Booking />
      </main>

      <Footer />
    </>
  )
}