import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../components/ui/SectionHeading'
import GlassCard from '../components/ui/GlassCard'
import Button from '../components/ui/Button'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { CLUB_INFO } from '../utils/constants'

export default function Booking() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    table: 'american-pool',
    players: '2',
  })
  const [submitted, setSubmitted] = useState(false)
  const formRef = useScrollAnimation({ y: 50 })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="booking section" id="booking">
      <div className="booking__glow" aria-hidden="true" />
      <div className="container">
        <SectionHeading
          label="Reservations"
          title="Book Your Table"
          subtitle="Reserve your spot at Coventry's finest cue sports venue. Walk-ins welcome, booking recommended."
          align="center"
        />

        <div className="booking__layout">
          <GlassCard className="booking__info" hover={false}>
            <h3>Visit Us</h3>
            <div className="booking__detail">
              <span className="booking__detail-label">Address</span>
              <p>{CLUB_INFO.address}</p>
            </div>
            <div className="booking__detail">
              <span className="booking__detail-label">Phone</span>
              <a href={`tel:${CLUB_INFO.phone.replace(/\s/g, '')}`}>{CLUB_INFO.phone}</a>
            </div>
            <div className="booking__detail">
              <span className="booking__detail-label">Hours</span>
              <p>{CLUB_INFO.hours.weekday}</p>
              <p>{CLUB_INFO.hours.weekend}</p>
            </div>
          </GlassCard>

          <div ref={formRef}>
            <GlassCard className="booking__form-card" hover={false}>
              {submitted ? (
                <motion.div
                  className="booking__success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="booking__success-icon">✓</div>
                  <h3>Booking Request Sent</h3>
                  <p>We&apos;ll confirm your reservation within 2 hours.</p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>
                    Book Another
                  </Button>
                </motion.div>
              ) : (
                <form className="booking__form" onSubmit={handleSubmit}>
                  <div className="booking__row">
                    <div className="booking__field">
                      <label htmlFor="name">Full Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                      />
                    </div>
                    <div className="booking__field">
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="booking__row">
                    <div className="booking__field">
                      <label htmlFor="date">Date</label>
                      <input
                        id="date"
                        name="date"
                        type="date"
                        required
                        value={form.date}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="booking__field">
                      <label htmlFor="time">Time</label>
                      <input
                        id="time"
                        name="time"
                        type="time"
                        required
                        value={form.time}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="booking__row">
                    <div className="booking__field">
                      <label htmlFor="table">Table Type</label>
                      <select
                        id="table"
                        name="table"
                        value={form.table}
                        onChange={handleChange}
                      >
                        <option value="american-pool">American Pool — £10/hr</option>
                        <option value="snooker">Championship Snooker — £12/hr</option>
                        <option value="vip">VIP Lounge — £25/hr</option>
                      </select>
                    </div>
                    <div className="booking__field">
                      <label htmlFor="players">Players</label>
                      <select
                        id="players"
                        name="players"
                        value={form.players}
                        onChange={handleChange}
                      >
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <option key={n} value={String(n)}>
                            {n} {n === 1 ? 'Player' : 'Players'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <Button variant="primary" className="booking__submit">
                    Confirm Booking
                  </Button>
                </form>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  )
}
