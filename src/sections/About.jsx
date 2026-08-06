import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from '../components/ui/SectionHeading'
import GlassCard from '../components/ui/GlassCard'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: '12', label: 'Championship Tables' },
  { value: '15+', label: 'Years of Excellence' },
  { value: '2,000+', label: 'Active Members' },
  { value: '50+', label: 'Events Per Year' },
]

export default function About() {
  const statsRef = useScrollAnimation({ y: 50, stagger: 0.1, children: true })
  const storyRef = useRef(null)

  useEffect(() => {
    const el = storyRef.current
    if (!el) return

    gsap.fromTo(
      el.querySelectorAll('.about__story-block'),
      { x: -60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [])

  return (
    <section className="about section" id="about">
      <div className="container">
        <SectionHeading
          label="Our Story"
          title="A Legacy of Craft & Community"
          subtitle="Born from a passion for cue sports, Cue Club Coventry has become the Midlands' most celebrated destination for snooker and pool enthusiasts."
        />

        <div ref={storyRef} className="about__story">
          <div className="about__story-block">
            <span className="about__year">2010</span>
            <h3>The Beginning</h3>
            <p>
              Founded by former county champion Marcus Webb, Cue Club opened its doors
              with a single vision: create a space where precision meets atmosphere.
            </p>
          </div>
          <div className="about__story-block">
            <span className="about__year">2018</span>
            <h3>Expansion</h3>
            <p>
              After overwhelming demand, we doubled our capacity with a VIP lounge,
              championship snooker hall, and state-of-the-art American pool room.
            </p>
          </div>
          <div className="about__story-block">
            <span className="about__year">Today</span>
            <h3>The Standard</h3>
            <p>
              Now hosting regional qualifiers and welcoming over 500 players weekly,
              we set the benchmark for cue sports venues across the UK.
            </p>
          </div>
        </div>

        <div ref={statsRef} className="about__stats">
          {STATS.map((stat) => (
            <GlassCard key={stat.label} className="about__stat">
              <span className="about__stat-value">{stat.value}</span>
              <span className="about__stat-label">{stat.label}</span>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
