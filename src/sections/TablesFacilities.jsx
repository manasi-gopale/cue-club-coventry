import SectionHeading from '../components/ui/SectionHeading'
import GlassCard from '../components/ui/GlassCard'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { TABLES } from '../utils/constants'

export default function TablesFacilities() {
  const gridRef = useScrollAnimation({ y: 60, stagger: 0.15, children: true })

  return (
    <section className="tables section" id="tables">
      <div className="tables__bg" aria-hidden="true" />
      <div className="container">
        <SectionHeading
          label="Facilities"
          title="World-Class Tables"
          subtitle="Every surface is meticulously maintained to tournament standards. Choose your game, choose your experience."
        />

        <div ref={gridRef} className="tables__grid">
          {TABLES.map((table) => (
            <GlassCard key={table.id} className="tables__card">
              <div className="tables__card-header">
                <span className="tables__tag">{table.tag}</span>
                <span className="tables__count">{table.count} tables</span>
              </div>
              <h3 className="tables__name">{table.name}</h3>
              <p className="tables__desc">{table.description}</p>
              <div className="tables__footer">
                <span className="tables__price">{table.price}</span>
                <a href="#booking" className="tables__book-link">
                  Book Now →
                </a>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="tables__amenities">
          {['Premium Bar', 'Free WiFi', 'Coaching Available', 'Private Events', 'Parking', 'Accessible'].map(
            (item) => (
              <span key={item} className="tables__amenity">
                {item}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  )
}
