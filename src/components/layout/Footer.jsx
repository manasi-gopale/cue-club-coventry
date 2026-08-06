import { CLUB_INFO } from '../../utils/constants'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__glow" aria-hidden="true" />
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-mark">CC</span>
            <div>
              <h3 className="footer__name">{CLUB_INFO.name}</h3>
              <p className="footer__tagline">{CLUB_INFO.tagline}</p>
            </div>
          </div>
          <p className="footer__address">{CLUB_INFO.address}</p>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Hours</h4>
          <p>{CLUB_INFO.hours.weekday}</p>
          <p>{CLUB_INFO.hours.weekend}</p>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Contact</h4>
          <a href={`tel:${CLUB_INFO.phone.replace(/\s/g, '')}`}>{CLUB_INFO.phone}</a>
          <a href={`mailto:${CLUB_INFO.email}`}>{CLUB_INFO.email}</a>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Quick Links</h4>
          <a href="#about">About</a>
          <a href="#membership">Membership</a>
          <a href="#events">Events</a>
          <a href="#booking">Book a Table</a>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>&copy; {new Date().getFullYear()} Cue Club Coventry. All rights reserved.</p>
          <div className="footer__social">
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Facebook">FB</a>
            <a href="#" aria-label="Twitter">X</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
