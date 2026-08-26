// Native Web Audio API Sound Engine for Cue Club Coventry
// Synthesizes realistic resin ball clacks, felt cushion thuds, and subtle room acoustics

class SoundEngine {
  constructor() {
    this.ctx = null
    this.enabled = false
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  toggleSound(forceState) {
    this.init()
    this.enabled = forceState !== undefined ? forceState : !this.enabled
    return this.enabled
  }

  // Synthesize hard resin ball-to-ball impact clack
  playBallCollision(intensity = 1) {
    if (!this.enabled || !this.ctx) return

    try {
      const now = this.ctx.currentTime
      const clampedIntensity = Math.min(Math.max(intensity, 0.1), 2)

      // High transient click (resin impact)
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(1800, now)
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.04)

      gain.gain.setValueAtTime(0.4 * clampedIntensity, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.04)

      // Secondary wood body thud
      const osc2 = this.ctx.createOscillator()
      const gain2 = this.ctx.createGain()

      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(320, now)
      osc2.frequency.exponentialRampToValueAtTime(80, now + 0.08)

      gain2.gain.setValueAtTime(0.25 * clampedIntensity, now)
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.08)

      osc2.connect(gain2)
      gain2.connect(this.ctx.destination)

      osc2.start(now)
      osc2.stop(now + 0.08)
    } catch (_) {}
  }

  // Synthesize soft felt cushion bounce thud
  playCushionBounce(intensity = 1) {
    if (!this.enabled || !this.ctx) return

    try {
      const now = this.ctx.currentTime
      const clampedIntensity = Math.min(Math.max(intensity, 0.1), 1.5)

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(160, now)
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.09)

      gain.gain.setValueAtTime(0.3 * clampedIntensity, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.09)
    } catch (_) {}
  }
}

export const soundEngine = new SoundEngine()
