export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Tables', href: '#tables' },
  { label: 'Membership', href: '#membership' },
  { label: 'Events', href: '#events' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Book', href: '#booking' },
]

export const TABLES = [
  {
    id: 1,
    name: 'Championship Snooker',
    description: 'Full-size tournament tables with professional slate beds and premium cloth.',
    count: 4,
    price: '£12/hr',
    tag: 'Pro Grade',
  },
  {
    id: 2,
    name: 'American Pool',
    description: 'Diamond-branded 9-ball tables with precision levelling and tournament lighting.',
    count: 6,
    price: '£10/hr',
    tag: 'Most Popular',
  },
  {
    id: 3,
    name: 'VIP Lounge',
    description: 'Private room with dedicated table, bar service, and ambient surround sound.',
    count: 2,
    price: '£25/hr',
    tag: 'Exclusive',
  },
]

export const MEMBERSHIP_TIERS = [
  {
    id: 'casual',
    name: 'Casual',
    price: '£15',
    period: '/month',
    features: ['10% off table hire', 'Priority weekend booking', 'Member events access', 'Free cue hire'],
    highlight: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '£35',
    period: '/month',
    features: ['20% off table hire', 'Unlimited weekday play', 'Coaching sessions', 'VIP lounge access', 'Guest passes ×2'],
    highlight: true,
  },
  {
    id: 'elite',
    name: 'Elite',
    price: '£75',
    period: '/month',
    features: ['Unlimited table access', 'Private coaching', 'Exclusive tournaments', 'Dedicated locker', 'Premium bar tab'],
    highlight: false,
  },
]

export const EVENTS = [
  {
    id: 1,
    title: 'Friday Night 9-Ball',
    date: 'Every Friday · 7PM',
    description: 'Open tournament with cash prizes. All skill levels welcome.',
    type: 'Tournament',
  },
  {
    id: 2,
    title: 'Snooker Masters Qualifier',
    date: 'Mar 15 · 2PM',
    description: 'Regional qualifying round for the national snooker championship.',
    type: 'Championship',
  },
  {
    id: 3,
    title: 'Ladies Night',
    date: 'Every Wednesday · 6PM',
    description: 'Free coaching session followed by friendly doubles competition.',
    type: 'Social',
  },
  {
    id: 4,
    title: 'Corporate Challenge Cup',
    date: 'Apr 22 · 5PM',
    description: 'Team-based pool tournament for local businesses. Trophy & bragging rights.',
    type: 'Corporate',
  },
]

export const GALLERY_ITEMS = [
  { id: 1, label: 'Main Hall', gradient: 'linear-gradient(135deg, #1a3a2a 0%, #0d1f15 100%)' },
  { id: 2, label: 'VIP Lounge', gradient: 'linear-gradient(135deg, #2a1a3a 0%, #150d1f 100%)' },
  { id: 3, label: 'Bar Area', gradient: 'linear-gradient(135deg, #3a2a1a 0%, #1f150d 100%)' },
  { id: 4, label: 'Tournament Night', gradient: 'linear-gradient(135deg, #1a2a3a 0%, #0d151f 100%)' },
  { id: 5, label: 'Coaching Session', gradient: 'linear-gradient(135deg, #2a3a1a 0%, #151f0d 100%)' },
  { id: 6, label: 'Championship Table', gradient: 'linear-gradient(135deg, #3a1a2a 0%, #1f0d15 100%)' },
]

export const CLUB_INFO = {
  name: 'Cue Club Coventry',
  tagline: 'Where Precision Meets Atmosphere',
  address: '42 Far Gosford Street, Coventry, CV1 5DW',
  phone: '024 7654 3210',
  email: 'hello@cueclubcoventry.co.uk',
  hours: {
    weekday: 'Mon–Thu: 12PM – 11PM',
    weekend: 'Fri–Sat: 11AM – 1AM · Sun: 12PM – 10PM',
  },
}
