import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from '../components/ui/SectionHeading'
import GlassCard from '../components/ui/GlassCard'
import { EVENTS } from '../utils/constants'

gsap.registerPlugin(ScrollTrigger)

export default function Events() {
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const cards = track.querySelectorAll('.events__card')
    gsap.fromTo(
      cards,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: track,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [])

  return (
    <section className="events section" id="events">
      <div className="container">
        <SectionHeading
          label="Events"
          title="What's On"
          subtitle="From weekly tournaments to championship qualifiers — there's always something happening at the club."
        />

        <div ref={trackRef} className="events__track">
          {EVENTS.map((event) => (
            <GlassCard key={event.id} className="events__card" hover={false}>
              <span className="events__type">{event.type}</span>
              <h3 className="events__title">{event.title}</h3>
              <p className="events__date">{event.date}</p>
              <p className="events__desc">{event.description}</p>
              <a href="#booking" className="events__link">
                Register Interest →
              </a>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
