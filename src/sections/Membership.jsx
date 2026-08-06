import SectionHeading from '../components/ui/SectionHeading'
import GlassCard from '../components/ui/GlassCard'
import Button from '../components/ui/Button'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { MEMBERSHIP_TIERS } from '../utils/constants'

export default function Membership() {
  const gridRef = useScrollAnimation({ y: 60, stagger: 0.12, children: true })

  return (
    <section className="membership section" id="membership">
      <div className="container">
        <SectionHeading
          label="Membership"
          title="Join the Club"
          subtitle="Unlock exclusive benefits, priority booking, and become part of Coventry's cue sports community."
          align="center"
        />

        <div ref={gridRef} className="membership__grid">
          {MEMBERSHIP_TIERS.map((tier) => (
            <GlassCard
              key={tier.id}
              className={`membership__card ${tier.highlight ? 'membership__card--highlight' : ''}`}
            >
              {tier.highlight && <span className="membership__popular">Most Popular</span>}
              <h3 className="membership__name">{tier.name}</h3>
              <div className="membership__price">
                <span className="membership__amount">{tier.price}</span>
                <span className="membership__period">{tier.period}</span>
              </div>
              <ul className="membership__features">
                {tier.features.map((feature) => (
                  <li key={feature}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                href="#booking"
                variant={tier.highlight ? 'primary' : 'outline'}
                className="membership__btn"
              >
                Get Started
              </Button>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
