'use client'

import { useState, useEffect, useCallback } from 'react'

// ── Types ────────────────────────────────────────────────────────────
type Screen =
  | 'splash'
  | 'ob-name' | 'ob-type' | 'ob-substances' | 'ob-spend' | 'ob-frequency' | 'ob-complete'
  | 'dashboard' | 'health' | 'playbook' | 'progress'

interface UserData {
  name: string
  userType: string
  substances: string[]
  weeklySpend: number
  frequency: string
  startDate: number
}

// ── Data constants ───────────────────────────────────────────────────
const SUBSTANCES = [
  { id: 'ketamine', label: 'Ketamine', featured: true },
  { id: 'mdma', label: 'MDMA / Ecstasy', featured: false },
  { id: 'cocaine', label: 'Cocaine', featured: false },
  { id: 'cannabis', label: 'Cannabis', featured: false },
  { id: 'alcohol', label: 'Alcohol', featured: false },
  { id: 'prescription', label: 'Prescription Meds', featured: false },
  { id: 'other', label: 'Other', featured: false },
]

const USER_TYPES = [
  { id: 'curious', label: "I'm curious about my habits", emoji: '🔍' },
  { id: 'concerned', label: "I'm concerned about my use", emoji: '💭' },
  { id: 'stopping', label: "I want to cut back or stop", emoji: '💪' },
  { id: 'supporting', label: "I'm supporting someone I care about", emoji: '❤️' },
]

const FREQUENCIES = [
  { id: 'daily', label: 'Daily', desc: 'Most days of the week' },
  { id: 'few-week', label: 'A few times a week', desc: '2–4 times per week' },
  { id: 'weekly', label: 'Weekly', desc: 'Once a week or so' },
  { id: 'monthly', label: 'Monthly', desc: 'A few times a month' },
]

const HEALTH_MODERATE = [
  { organ: 'Brain', impact: 'Memory gaps & cognitive slowing', data: 'Processing speed drops ~15% with regular use. Short-term recall measurably impaired within weeks.' },
  { organ: 'Bladder', impact: 'Early irritation & urgency', data: 'First signs of ketamine cystitis — urgency, frequency, discomfort. Easily reversed at this stage.' },
  { organ: 'Nose', impact: 'Nasal tissue erosion', data: 'Septum damage begins within 6–12 months of regular insufflation. Cartilage does not regenerate.' },
  { organ: 'Mood', impact: 'Between-use depression', data: 'Rebound depression affects 60%+ of regular users. The comedown creates the trigger for next use.' },
  { organ: 'Sleep', impact: 'REM suppression', data: 'Restorative sleep quality diminished. Dreams suppressed. Cognitive consolidation impaired.' },
]

const HEALTH_SEVERE = [
  { organ: 'Bladder', impact: 'Ketamine Cystitis', data: '30% of heavy users develop this. The bladder contracts to <50ml capacity. Some require surgical removal — a permanent, life-altering outcome.' },
  { organ: 'Kidneys', impact: 'Hydronephrosis', data: 'Kidney swelling from blocked urine drainage. Permanent kidney damage in 20% of K-cystitis cases. Some require dialysis.' },
  { organ: 'Liver', impact: 'Ketamine-induced hepatotoxicity', data: 'Liver enzyme elevation in ~10% of chronic users. Biliary dilation and cholangiopathy documented in heavy use cases.' },
  { organ: 'Brain', impact: 'Permanent cognitive impairment', data: 'Executive function and working memory do not fully recover in long-term users even after cessation. White matter changes visible on MRI.' },
  { organ: 'Psychology', impact: 'Addiction', data: '1 in 3 regular ketamine users meets clinical criteria for substance use disorder. The psychological dependency is the last thing to resolve.' },
]

const RECOVERY_TIMELINE = [
  { period: '24 hours', note: 'Kidneys begin clearing ketamine metabolites', icon: '💧' },
  { period: '48–72 hours', note: 'Peak craving window. The hardest part. You\'re in it.', icon: '⚡', highlight: true },
  { period: '1 week', note: 'Sleep architecture begins restoring. Dreams return.', icon: '😴' },
  { period: '2 weeks', note: 'Short-term memory noticeably sharper. Fog starts to clear.', icon: '🧠' },
  { period: '1 month', note: 'Bladder inflammation reducing. Urgency improving markedly.', icon: '✨' },
  { period: '3 months', note: 'Cognitive function measurably improved. Studies confirm processing speed recovering.', icon: '📈' },
  { period: '6 months', note: 'Significant bladder healing in most users who stopped.', icon: '🌱' },
  { period: '1 year', note: 'Substantial cognitive recovery. Most report feeling like themselves again.', icon: '🌟' },
]

const DEALER_TACTICS = [
  {
    number: 1,
    title: 'The Gateway',
    subtitle: 'Hook #1: The Free Sample',
    body: 'The first experience is often "on someone else\'s tab." Once the baseline is set, you\'re chasing it. You didn\'t choose to get hooked — you were handed the trigger.',
    model: 'Nir Eyal\'s Hooked model starts here: the external trigger. That first experience wires a neural pathway that your brain will spend years trying to recreate.',
    color: '#003087',
  },
  {
    number: 2,
    title: 'The Variable High',
    subtitle: 'Hook #2: The Slot Machine',
    body: 'Every batch is different. Different purity, different effect. That unpredictability keeps you coming back — exactly like a slot machine. You\'re not chasing the high. You\'re chasing the possibility of it.',
    model: 'Variable reward is the most powerful behavioural hook in psychology. Inconsistent reinforcement creates stronger compulsion than reliable reward. This is deliberate.',
    color: '#0066B2',
  },
  {
    number: 3,
    title: 'The Escape Narrative',
    subtitle: 'Hook #3: You Deserve This',
    body: '"Hard week? Long day? You\'ve earned it." This story makes use feel rational — even like self-care. It\'s the most seductive marketing script ever written.',
    model: 'Internal triggers. Your emotional state (stress, boredom, loneliness) becomes the cue. The substance becomes your default emotional regulation strategy. That\'s when it owns you.',
    color: '#F57600',
  },
  {
    number: 4,
    title: 'The Tolerance Trap',
    subtitle: 'Hook #4: More for Less',
    body: 'It takes more to feel the same. You\'re spending more for a diminishing return. Quitting now feels like "losing" — but continuing is the actual loss.',
    model: 'Investment in Hooked: the more you\'ve put in, the harder to walk away. Sunk cost bias keeps you in the game. Your escalating spend is the evidence.',
    color: '#C85000',
  },
  {
    number: 5,
    title: 'The Social Proof Machine',
    subtitle: 'Hook #5: Everyone Does It',
    body: 'When your entire social scene uses, abstaining feels abnormal. Use becomes invisible and ambient. Quitting means challenging your social identity — that\'s why it\'s so hard.',
    model: 'Social norms are the most powerful behaviour driver in existence. The dealer doesn\'t need to sell to you directly. Your environment does it for them.',
    color: '#BB1919',
  },
  {
    number: 6,
    title: 'The Availability Architect',
    subtitle: 'Hook #6: Always On',
    body: 'Three messages and it\'s at your door within the hour. The friction to obtain has been engineered to near-zero. Low effort plus any motivation equals use.',
    model: 'BJ Fogg\'s Behaviour Model: Motivation × Ability × Trigger. When ability is effortless, even mild motivation triggers use. Your dealer\'s best product is convenience.',
    color: '#00A4E4',
  },
]

const ACHIEVEMENTS = [
  { id: 'first-step', label: 'First Step', desc: 'You looked at it honestly', days: 0, emoji: '👁️' },
  { id: '24h', label: '24 Hours', desc: 'One full day clear', days: 1, emoji: '🌅' },
  { id: '72h', label: '72 Hours', desc: 'Past the hardest window', days: 3, emoji: '💪' },
  { id: '1w', label: 'One Week', desc: 'Seven days of clarity', days: 7, emoji: '🔥' },
  { id: '2w', label: 'Fortnight', desc: 'Two weeks strong', days: 14, emoji: '⚡' },
  { id: '1m', label: 'One Month', desc: 'Thirty days free', days: 30, emoji: '🏆' },
  { id: '3m', label: 'Quarter', desc: '90 days — measurably different', days: 90, emoji: '🧠' },
  { id: '1y', label: 'Year One', desc: 'A full year of freedom', days: 365, emoji: '🌟' },
]

// ── Helpers ──────────────────────────────────────────────────────────
function getCleanDays(startDate: number): number {
  return Math.floor((Date.now() - startDate) / (1000 * 60 * 60 * 24))
}

function getMoneySaved(weeklySpend: number, startDate: number): number {
  const days = getCleanDays(startDate)
  return Math.round((weeklySpend / 7) * days)
}

function getDealerGrip(frequency: string, cleanDays: number): number {
  const base: Record<string, number> = { daily: 93, 'few-week': 80, weekly: 66, monthly: 47 }
  const start = base[frequency] ?? 70
  const reduction = Math.min(cleanDays * 0.7, start - 10)
  return Math.max(8, Math.round(start - reduction))
}

function fmt(n: number): string {
  return `£${n.toLocaleString()}`
}

function annualComparison(annual: number): string {
  if (annual >= 12000) return 'a year\'s salary top-up'
  if (annual >= 6000) return 'a business-class return flight to Tokyo, twice'
  if (annual >= 3000) return 'three months of London rent'
  if (annual >= 1500) return 'a MacBook Pro'
  if (annual >= 800) return 'a long weekend in New York'
  return 'a month of groceries'
}

// ── Shared UI ────────────────────────────────────────────────────────
// Sky Sports navy · TNT Sport orange · BBC Sport red
const C = {
  purple: '#003087',       // Sky Sports navy — primary
  purpleLight: '#E3EDF8',  // light navy tint
  purpleDark: '#001A5C',   // deep navy
  indigo: '#0066B2',       // Sky Sports mid blue
  green: '#00875A',        // money / positive
  greenLight: '#E2F5EC',
  amber: '#F57600',        // TNT Sport orange
  amberLight: '#FFF2E6',   // light TNT orange
  red: '#BB1919',          // BBC Sport red
  redLight: '#FFE8E8',
  text: '#0A0F2E',         // near-black navy text
  muted: '#4A5D7A',        // muted navy-grey
  border: '#C5D7EE',       // light blue border
  bg: '#EDF3FB',           // light sky background
  card: '#ffffff',
}

function Btn({
  label, onClick, disabled, secondary, danger,
}: {
  label: string
  onClick: () => void
  disabled?: boolean
  secondary?: boolean
  danger?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '100%',
        padding: '17px 24px',
        background: disabled
          ? '#e5e7eb'
          : danger
          ? 'linear-gradient(135deg, #BB1919, #8B0000)'
          : secondary
          ? C.purpleLight
          : 'linear-gradient(135deg, #003087, #0066B2)',
        color: disabled ? '#9ca3af' : secondary ? C.purple : '#fff',
        border: secondary ? `2px solid ${C.purple}` : 'none',
        borderRadius: 16,
        fontSize: 17,
        fontWeight: 700,
        cursor: disabled ? 'not-allowed' : 'pointer',
        letterSpacing: 0.2,
        transition: 'opacity 0.15s',
        flexShrink: 0,
      }}
    >
      {label}
    </button>
  )
}

function Tag({ label, color }: { label: string; color: string }) {
  const bg = color + '20'
  return (
    <span style={{ fontSize: 10, fontWeight: 700, color, background: bg, padding: '3px 8px', borderRadius: 20, letterSpacing: 0.8, textTransform: 'uppercase' }}>
      {label}
    </span>
  )
}

function StepBar({ step, total }: { step: number; total: number }) {
  return (
    <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i < step ? C.purple : '#e5e7eb', transition: 'background 0.3s' }} />
      ))}
    </div>
  )
}

// ── Status Bar + Dynamic Island ───────────────────────────────────────
function StatusBar() {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 30000)
    return () => clearInterval(t)
  }, [])
  const hh = time.getHours().toString().padStart(2, '0')
  const mm = time.getMinutes().toString().padStart(2, '0')
  return (
    <div style={{ height: 52, display: 'flex', alignItems: 'center', paddingInline: 26, justifyContent: 'space-between', flexShrink: 0, position: 'relative' }}>
      <span style={{ fontSize: 15, fontWeight: 700, color: C.text, zIndex: 1 }}>{hh}:{mm}</span>
      {/* Dynamic Island */}
      <div style={{
        position: 'absolute', left: '50%', top: 10,
        transform: 'translateX(-50%)',
        width: 126, height: 36,
        background: '#000',
        borderRadius: 22,
        zIndex: 10,
      }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, zIndex: 1 }}>
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="9" width="3" height="3" rx="1" fill={C.text} />
          <rect x="4.5" y="6" width="3" height="6" rx="1" fill={C.text} />
          <rect x="9" y="3" width="3" height="9" rx="1" fill={C.text} />
          <rect x="13.5" y="0" width="3" height="12" rx="1" fill={C.text} />
        </svg>
        <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
          <path d="M7.5 3C9.5 3 11.3 3.8 12.7 5L14 3.7C12.3 2.1 10 1 7.5 1 5 1 2.7 2.1 1 3.7L2.3 5C3.7 3.8 5.5 3 7.5 3Z" fill={C.text} />
          <path d="M7.5 6C8.7 6 9.8 6.5 10.6 7.3L11.9 6C10.8 4.9 9.2 4.2 7.5 4.2 5.8 4.2 4.2 4.9 3.1 6L4.4 7.3C5.2 6.5 6.3 6 7.5 6Z" fill={C.text} />
          <circle cx="7.5" cy="10" r="1.5" fill={C.text} />
        </svg>
        <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <div style={{ width: 22, height: 11, border: `1.5px solid ${C.text}`, borderRadius: 3, position: 'relative', display: 'flex', alignItems: 'center', padding: '1px 1px' }}>
            <div style={{ width: '75%', height: '100%', background: '#059669', borderRadius: 1.5 }} />
          </div>
          <div style={{ width: 2, height: 5, background: C.text, borderRadius: 1, opacity: 0.5 }} />
        </div>
      </div>
    </div>
  )
}

function HomeIndicator() {
  return (
    <div style={{ height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <div style={{ width: 134, height: 5, background: '#000', borderRadius: 3, opacity: 0.18 }} />
    </div>
  )
}

function BottomNav({ active, onNav }: { active: Screen; onNav: (s: Screen) => void }) {
  const tabs: { id: Screen; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Today', icon: '⊙' },
    { id: 'health', label: 'Health', icon: '♡' },
    { id: 'playbook', label: 'Playbook', icon: '◈' },
    { id: 'progress', label: 'Progress', icon: '◎' },
  ]
  return (
    <div style={{
      height: 62, borderTop: '1px solid rgba(0,0,0,0.07)', display: 'flex',
      background: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(20px)', flexShrink: 0,
    }}>
      {tabs.map(t => (
        <button
          key={t.id}
          onClick={() => onNav(t.id)}
          style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', gap: 2, border: 'none', background: 'none',
            cursor: 'pointer', color: active === t.id ? C.purple : '#9ca3af',
            fontSize: 12, fontWeight: active === t.id ? 700 : 400,
            transition: 'color 0.2s',
          }}
        >
          <span style={{ fontSize: 22, lineHeight: 1 }}>{t.icon}</span>
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  )
}

// ── Screen: Splash ───────────────────────────────────────────────────
function SplashScreen({ onStart }: { onStart: () => void }) {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '0 32px 40px',
      background: 'linear-gradient(165deg, #EDF3FB 0%, #C8DFF2 55%, #B0CFEA 100%)',
      gap: 28, textAlign: 'center',
    }}>
      <div style={{
        width: 88, height: 88,
        background: 'linear-gradient(135deg, #003087 0%, #0066B2 100%)',
        borderRadius: 26, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 40, boxShadow: '0 20px 48px rgba(0,48,135,0.40)',
      }}>
        👁️
      </div>

      <div>
        <h1 style={{ fontSize: 40, fontWeight: 900, color: C.text, margin: 0, letterSpacing: -1.5 }}>
          Clarity
        </h1>
        <p style={{ fontSize: 16, color: C.muted, margin: '10px 0 0', lineHeight: 1.6 }}>
          See through the pattern.<br />Know what's really holding you.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', marginTop: 16 }}>
        <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: 18, padding: '16px 18px', textAlign: 'left', backdropFilter: 'blur(10px)' }}>
          <p style={{ margin: 0, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
            <span style={{ fontWeight: 700 }}>For the 22–40 professional</span> who knows something's off but hasn't stopped to look at it honestly.
          </p>
        </div>
      </div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Btn label="Begin" onClick={onStart} />
        <p style={{ fontSize: 12, color: '#9ca3af', margin: 0 }}>No account. No data shared. Stays on your phone.</p>
      </div>
    </div>
  )
}

// ── Screen: Onboarding Name ──────────────────────────────────────────
function ObName({ onNext }: { onNext: (name: string) => void }) {
  const [val, setVal] = useState('')
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '32px 26px 28px', background: C.bg, gap: 0 }}>
      <StepBar step={1} total={5} />
      <p style={{ fontSize: 12, fontWeight: 700, color: C.purple, textTransform: 'uppercase', letterSpacing: 1.5, margin: '14px 0 0' }}>Step 1 of 5</p>
      <h2 style={{ fontSize: 30, fontWeight: 900, color: C.text, margin: '10px 0 8px', lineHeight: 1.1 }}>What's your name?</h2>
      <p style={{ fontSize: 14, color: C.muted, margin: '0 0 28px', lineHeight: 1.6 }}>
        No sign-up. No data shared. Everything stays on your device.
      </p>
      <input
        type="text"
        placeholder="Your first name..."
        value={val}
        onChange={e => setVal(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && val.trim() && onNext(val.trim())}
        autoFocus
        style={{
          width: '100%', padding: '18px 20px', fontSize: 20, fontWeight: 700,
          border: `2px solid ${val ? C.purple : C.border}`,
          borderRadius: 16, outline: 'none', background: '#fff', color: C.text,
          boxSizing: 'border-box', transition: 'border-color 0.2s',
          WebkitTapHighlightColor: 'transparent',
        }}
      />
      <div style={{ flex: 1 }} />
      <Btn label="Continue →" onClick={() => val.trim() && onNext(val.trim())} disabled={!val.trim()} />
    </div>
  )
}

// ── Screen: Onboarding User Type ─────────────────────────────────────
function ObType({ name, onNext }: { name: string; onNext: (type: string) => void }) {
  const [sel, setSel] = useState('')
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '32px 26px 28px', background: C.bg, overflowY: 'auto', gap: 0 }}>
      <StepBar step={2} total={5} />
      <p style={{ fontSize: 12, fontWeight: 700, color: C.purple, textTransform: 'uppercase', letterSpacing: 1.5, margin: '14px 0 0' }}>Step 2 of 5</p>
      <h2 style={{ fontSize: 28, fontWeight: 900, color: C.text, margin: '10px 0 8px', lineHeight: 1.15 }}>Hey {name}, what brings you here?</h2>
      <p style={{ fontSize: 14, color: C.muted, margin: '0 0 24px' }}>No wrong answer.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
        {USER_TYPES.map(t => (
          <button
            key={t.id}
            onClick={() => setSel(t.id)}
            style={{
              padding: '18px 20px', border: `2px solid ${sel === t.id ? C.purple : C.border}`,
              borderRadius: 16, background: sel === t.id ? C.purpleLight : '#fff',
              display: 'flex', alignItems: 'center', gap: 14,
              cursor: 'pointer', textAlign: 'left', transition: 'all 0.18s',
            }}
          >
            <span style={{ fontSize: 26 }}>{t.emoji}</span>
            <span style={{ fontSize: 15, fontWeight: 600, color: sel === t.id ? C.purple : C.text, lineHeight: 1.4 }}>{t.label}</span>
          </button>
        ))}
      </div>
      <Btn label="Continue →" onClick={() => sel && onNext(sel)} disabled={!sel} />
    </div>
  )
}

// ── Screen: Onboarding Substances ────────────────────────────────────
function ObSubstances({ onNext }: { onNext: (subs: string[]) => void }) {
  const [sel, setSel] = useState<string[]>([])
  const toggle = (id: string) =>
    setSel(p => p.includes(id) ? p.filter(s => s !== id) : [...p, id])
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '32px 26px 28px', background: C.bg, overflowY: 'auto', gap: 0 }}>
      <StepBar step={3} total={5} />
      <p style={{ fontSize: 12, fontWeight: 700, color: C.purple, textTransform: 'uppercase', letterSpacing: 1.5, margin: '14px 0 0' }}>Step 3 of 5</p>
      <h2 style={{ fontSize: 28, fontWeight: 900, color: C.text, margin: '10px 0 8px', lineHeight: 1.15 }}>Which substances are in your life?</h2>
      <p style={{ fontSize: 14, color: C.muted, margin: '0 0 24px' }}>Select all that apply. Honest data, honest picture.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 28 }}>
        {SUBSTANCES.map(s => (
          <button
            key={s.id}
            onClick={() => toggle(s.id)}
            style={{
              padding: '16px 18px',
              border: `2px solid ${sel.includes(s.id) ? C.purple : C.border}`,
              borderRadius: 14,
              background: sel.includes(s.id) ? C.purpleLight : '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              cursor: 'pointer', transition: 'all 0.18s',
            }}
          >
            <span style={{ fontSize: 15, fontWeight: 600, color: sel.includes(s.id) ? C.purple : C.text }}>
              {s.label}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {s.featured && <Tag label="featured" color={C.purple} />}
              {sel.includes(s.id) && (
                <div style={{ width: 22, height: 22, borderRadius: 11, background: C.purple, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700 }}>✓</div>
              )}
            </div>
          </button>
        ))}
      </div>
      <Btn label="Continue →" onClick={() => sel.length > 0 && onNext(sel)} disabled={sel.length === 0} />
    </div>
  )
}

// ── Screen: Onboarding Weekly Spend ──────────────────────────────────
function ObSpend({ onNext }: { onNext: (spend: number) => void }) {
  const [spend, setSpend] = useState(120)
  const annual = spend * 52
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '32px 26px 28px', background: C.bg, gap: 0 }}>
      <StepBar step={4} total={5} />
      <p style={{ fontSize: 12, fontWeight: 700, color: C.purple, textTransform: 'uppercase', letterSpacing: 1.5, margin: '14px 0 0' }}>Step 4 of 5</p>
      <h2 style={{ fontSize: 28, fontWeight: 900, color: C.text, margin: '10px 0 8px', lineHeight: 1.15 }}>How much a week?</h2>
      <p style={{ fontSize: 14, color: C.muted, margin: '0 0 24px' }}>Across all substances, roughly. Ballpark is fine.</p>

      <div style={{ background: '#fff', borderRadius: 20, padding: 24, textAlign: 'center', boxShadow: '0 2px 18px rgba(0,0,0,0.07)', marginBottom: 24 }}>
        <div style={{ fontSize: 52, fontWeight: 900, color: C.purple, letterSpacing: -2 }}>£{spend}</div>
        <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>per week</div>
      </div>

      <input
        type="range" min={10} max={500} step={10} value={spend}
        onChange={e => setSpend(Number(e.target.value))}
        style={{ width: '100%', accentColor: C.purple, height: 5, marginBottom: 6 }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#9ca3af', marginBottom: 24 }}>
        <span>£10</span><span>£500+</span>
      </div>

      <div style={{ background: 'linear-gradient(135deg, #FFF2E6, #FFE0C2)', borderRadius: 18, padding: '18px 20px', marginBottom: 28 }}>
        <p style={{ margin: 0, fontSize: 15, fontWeight: 800, color: '#7A3200' }}>
          That's <span style={{ fontSize: 22 }}>{fmt(annual)}</span> a year
        </p>
        <p style={{ margin: '6px 0 0', fontSize: 13, color: '#A04400' }}>
          Enough for {annualComparison(annual)}.
        </p>
      </div>

      <div style={{ flex: 1 }} />
      <Btn label="Continue →" onClick={() => onNext(spend)} />
    </div>
  )
}

// ── Screen: Onboarding Frequency ─────────────────────────────────────
function ObFrequency({ onNext }: { onNext: (freq: string) => void }) {
  const [sel, setSel] = useState('')
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '32px 26px 28px', background: C.bg, overflowY: 'auto', gap: 0 }}>
      <StepBar step={5} total={5} />
      <p style={{ fontSize: 12, fontWeight: 700, color: C.purple, textTransform: 'uppercase', letterSpacing: 1.5, margin: '14px 0 0' }}>Step 5 of 5</p>
      <h2 style={{ fontSize: 28, fontWeight: 900, color: C.text, margin: '10px 0 8px', lineHeight: 1.15 }}>How often are you using?</h2>
      <p style={{ fontSize: 14, color: C.muted, margin: '0 0 24px' }}>This calibrates your Dealer's Grip score.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
        {FREQUENCIES.map(f => (
          <button
            key={f.id}
            onClick={() => setSel(f.id)}
            style={{
              padding: '18px 20px', border: `2px solid ${sel === f.id ? C.purple : C.border}`,
              borderRadius: 16, background: sel === f.id ? C.purpleLight : '#fff',
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
              cursor: 'pointer', transition: 'all 0.18s', textAlign: 'left',
            }}
          >
            <span style={{ fontSize: 15, fontWeight: 700, color: sel === f.id ? C.purple : C.text }}>{f.label}</span>
            <span style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{f.desc}</span>
          </button>
        ))}
      </div>
      <Btn label="See My Picture →" onClick={() => sel && onNext(sel)} disabled={!sel} />
    </div>
  )
}

// ── Screen: Onboarding Complete ──────────────────────────────────────
function ObComplete({ name, onDone }: { name: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800)
    return () => clearTimeout(t)
  }, [onDone])
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '0 32px',
      background: 'linear-gradient(165deg, #EDF3FB 0%, #C8DFF2 100%)',
      gap: 20, textAlign: 'center',
    }}>
      <div style={{ fontSize: 72, lineHeight: 1 }}>✨</div>
      <div>
        <h2 style={{ fontSize: 30, fontWeight: 900, color: C.text, margin: 0, lineHeight: 1.2 }}>
          Your picture is ready,<br />{name}.
        </h2>
        <p style={{ fontSize: 15, color: C.muted, margin: '14px 0 0', lineHeight: 1.6 }}>
          No filter. No judgment.<br />Just an honest look.
        </p>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 8, height: 8, borderRadius: 4,
            background: C.purple,
            opacity: 0.25 + i * 0.37,
            animation: 'fadeIn 0.4s ease both',
            animationDelay: `${i * 0.15}s`,
          }} />
        ))}
      </div>
    </div>
  )
}

// ── Screen: Dashboard ────────────────────────────────────────────────
function Dashboard({ user, onNav }: { user: UserData; onNav: (s: Screen) => void }) {
  const cleanDays = getCleanDays(user.startDate)
  const saved = getMoneySaved(user.weeklySpend, user.startDate)
  const grip = getDealerGrip(user.frequency, cleanDays)
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const streakEmoji = cleanDays === 0 ? '🌅' : cleanDays < 3 ? '🔆' : cleanDays < 7 ? '🔥' : cleanDays < 30 ? '⚡' : '🏆'

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: C.bg }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(140deg, #003087 0%, #005EB8 100%)',
        padding: '24px 24px 36px', borderRadius: '0 0 36px 36px',
      }}>
        <p style={{ margin: 0, fontSize: 14, color: 'rgba(255,255,255,0.65)' }}>{greeting}</p>
        <h2 style={{ margin: '4px 0 2px', fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: -0.5 }}>{user.name}</h2>
        <p style={{ margin: 0, fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>
          {cleanDays === 0 ? 'Day one starts now.' : `Day ${cleanDays} of your clarity journey`}
        </p>
      </div>

      <div style={{ padding: '18px 18px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Streak card */}
        <div style={{ background: '#fff', borderRadius: 22, padding: '22px 22px', boxShadow: '0 3px 20px rgba(0,0,0,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ margin: 0, fontSize: 11, fontWeight: 800, color: C.muted, textTransform: 'uppercase', letterSpacing: 1.2 }}>Clean streak</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
              <span style={{ fontSize: 52, fontWeight: 900, color: C.text, letterSpacing: -2, lineHeight: 1 }}>{cleanDays}</span>
              <span style={{ fontSize: 18, color: C.muted, fontWeight: 500 }}>{cleanDays === 1 ? 'day' : 'days'}</span>
            </div>
            {cleanDays === 0 && (
              <p style={{ margin: '6px 0 0', fontSize: 13, color: C.muted }}>Start today. Right now.</p>
            )}
          </div>
          <span style={{ fontSize: 62, lineHeight: 1 }}>{streakEmoji}</span>
        </div>

        {/* Money Saved */}
        <div style={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)', borderRadius: 22, padding: '22px 22px', boxShadow: '0 3px 20px rgba(5,150,105,0.12)' }}>
          <p style={{ margin: 0, fontSize: 11, fontWeight: 800, color: '#065f46', textTransform: 'uppercase', letterSpacing: 1.2 }}>Money saved</p>
          <div style={{ fontSize: 44, fontWeight: 900, color: C.green, marginTop: 6, letterSpacing: -1.5, lineHeight: 1 }}>{fmt(saved)}</div>
          <p style={{ margin: '6px 0 0', fontSize: 13, color: '#047857' }}>
            {saved === 0
              ? `You spend ${fmt(user.weeklySpend)} a week. Start your first clear day.`
              : `${fmt(user.weeklySpend)} × ${cleanDays} ${cleanDays === 1 ? 'day' : 'days'}. Yours, not theirs.`}
          </p>
        </div>

        {/* Dealer's Grip */}
        <div style={{ background: '#fff', borderRadius: 22, padding: '20px 22px', boxShadow: '0 3px 20px rgba(0,0,0,0.07)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <p style={{ margin: 0, fontSize: 11, fontWeight: 800, color: C.muted, textTransform: 'uppercase', letterSpacing: 1.2 }}>Dealer's grip</p>
              <p style={{ margin: '3px 0 0', fontSize: 12, color: '#9ca3af' }}>How much control they hold over you</p>
            </div>
            <span style={{
              fontSize: 22, fontWeight: 900,
              color: grip > 65 ? C.red : grip > 35 ? C.amber : C.green,
              letterSpacing: -0.5,
            }}>
              {grip}%
            </span>
          </div>
          <div style={{ height: 10, background: '#f3f4f6', borderRadius: 5, overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: `${grip}%`,
              background: grip > 65
                ? 'linear-gradient(90deg, #BB1919, #E02020)'
                : grip > 35
                ? 'linear-gradient(90deg, #F57600, #FF8C00)'
                : 'linear-gradient(90deg, #00875A, #00B374)',
              borderRadius: 5, transition: 'width 1.2s cubic-bezier(0.16,1,0.3,1)',
            }} />
          </div>
          <p style={{ margin: '10px 0 0', fontSize: 12, color: C.muted, lineHeight: 1.5 }}>
            {grip > 65
              ? '⚠️ Strong dependency pattern. Every clean day reduces this.'
              : grip > 35
              ? '📈 Grip loosening. You\'re starting to take it back.'
              : '✅ You\'re breaking free. The pattern is collapsing.'}
          </p>
        </div>

        {/* Quick nav */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {[
            { screen: 'health' as Screen, emoji: '🫀', title: 'Health Picture', sub: 'Real data, no filter' },
            { screen: 'playbook' as Screen, emoji: '🎭', title: 'The Playbook', sub: 'How you got hooked' },
          ].map(card => (
            <button
              key={card.screen}
              onClick={() => onNav(card.screen)}
              style={{
                background: '#fff', borderRadius: 20, padding: '20px 18px',
                border: 'none', cursor: 'pointer', textAlign: 'left',
                boxShadow: '0 3px 16px rgba(0,0,0,0.07)', transition: 'transform 0.15s',
              }}
            >
              <div style={{ fontSize: 30, marginBottom: 10 }}>{card.emoji}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.text, lineHeight: 1.3 }}>{card.title}</div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>{card.sub}</div>
            </button>
          ))}
        </div>

        {/* Today's challenge */}
        <div style={{ background: 'linear-gradient(135deg, #FFF2E6 0%, #FFE0C2 100%)', borderRadius: 22, padding: '20px 22px', marginBottom: 20 }}>
          <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 800, color: '#7A3200', textTransform: 'uppercase', letterSpacing: 1.2 }}>Today's challenge</p>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#5C2200', lineHeight: 1.45 }}>
            Name the trigger. What usually starts the urge?
          </p>
          <p style={{ margin: '8px 0 0', fontSize: 13, color: '#A04400', lineHeight: 1.5 }}>
            Stress? Boredom? A specific person? A specific time? Naming it breaks 30% of the pattern.
          </p>
        </div>

      </div>
    </div>
  )
}

// ── Screen: Health ───────────────────────────────────────────────────
function HealthScreen({ user }: { user: UserData }) {
  const [tab, setTab] = useState<'moderate' | 'severe' | 'recovery'>('moderate')
  const hasKetamine = user.substances.includes('ketamine')

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#fafaf8' }}>
      <div style={{ padding: '24px 22px 16px' }}>
        <h2 style={{ fontSize: 26, fontWeight: 900, color: C.text, margin: 0, letterSpacing: -0.5 }}>Your health picture</h2>
        <p style={{ fontSize: 14, color: C.muted, margin: '8px 0 0', lineHeight: 1.55 }}>
          {hasKetamine
            ? 'Ketamine-specific data from peer-reviewed research. No filter.'
            : 'Evidence-based data on substance use. No scare tactics — just facts.'}
        </p>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', padding: '0 18px', gap: 8, marginBottom: 18 }}>
        {([['moderate', '⚠️ Moderate'], ['severe', '🔴 Severe'], ['recovery', '💚 Recovery']] as [string, string][]).map(([t, l]) => (
          <button
            key={t}
            onClick={() => setTab(t as typeof tab)}
            style={{
              flex: 1, padding: '10px 4px', border: 'none', borderRadius: 12,
              background: tab === t ? C.purple : '#f3f4f6',
              color: tab === t ? '#fff' : C.muted,
              fontSize: 11, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            {l}
          </button>
        ))}
      </div>

      <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 13 }}>

        {tab === 'moderate' && (
          <>
            <div style={{ background: '#FFF2E6', borderRadius: 16, padding: '14px 16px' }}>
              <p style={{ margin: 0, fontSize: 13, color: '#7A3200', lineHeight: 1.55, fontWeight: 500 }}>
                These effects emerge with regular use. Most are reversible if you stop now.
              </p>
            </div>
            {HEALTH_MODERATE.map((item, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 18, padding: '18px 20px', boxShadow: '0 2px 14px rgba(0,0,0,0.06)', borderLeft: `4px solid ${C.amber}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: C.amber, textTransform: 'uppercase', letterSpacing: 1 }}>{item.organ}</span>
                  <Tag label="Moderate" color={C.amber} />
                </div>
                <p style={{ margin: '0 0 7px', fontSize: 15, fontWeight: 700, color: C.text }}>{item.impact}</p>
                <p style={{ margin: 0, fontSize: 13, color: C.muted, lineHeight: 1.55 }}>{item.data}</p>
              </div>
            ))}
          </>
        )}

        {tab === 'severe' && (
          <>
            <div style={{ background: '#fef2f2', borderRadius: 16, padding: '14px 16px' }}>
              <p style={{ margin: 0, fontSize: 13, color: '#991b1b', lineHeight: 1.55, fontWeight: 500 }}>
                These are documented outcomes in peer-reviewed medical literature. They happen to real people. The data is not hypothetical.
              </p>
            </div>
            {HEALTH_SEVERE.map((item, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 18, padding: '18px 20px', boxShadow: '0 2px 14px rgba(0,0,0,0.06)', borderLeft: `4px solid ${C.red}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: C.red, textTransform: 'uppercase', letterSpacing: 1 }}>{item.organ}</span>
                  <Tag label="Severe" color={C.red} />
                </div>
                <p style={{ margin: '0 0 7px', fontSize: 15, fontWeight: 700, color: C.text }}>{item.impact}</p>
                <p style={{ margin: 0, fontSize: 13, color: C.muted, lineHeight: 1.55 }}>{item.data}</p>
              </div>
            ))}
            <div style={{ background: '#f9fafb', borderRadius: 16, padding: '14px 16px', marginTop: 4 }}>
              <p style={{ margin: 0, fontSize: 11, color: '#9ca3af', lineHeight: 1.6 }}>
                Sources: Cottrell AM et al. (2008), Morgan CJA et al. (2010), Winstock AR et al. (2012), Kalsi SS et al. (2011). Global Drug Survey, FRANK, NHS Clinical Guidelines on Ketamine Misuse.
              </p>
            </div>
          </>
        )}

        {tab === 'recovery' && (
          <>
            <div style={{ background: '#ecfdf5', borderRadius: 16, padding: '14px 16px' }}>
              <p style={{ margin: 0, fontSize: 13, color: '#065f46', lineHeight: 1.55, fontWeight: 500 }}>
                Your body starts recovering the moment you stop. This is what the evidence shows — for real.
              </p>
            </div>
            {RECOVERY_TIMELINE.map((item, i) => (
              <div
                key={i}
                style={{
                  background: item.highlight ? 'linear-gradient(135deg, #FFF2E6, #FFE0C2)' : '#fff',
                  borderRadius: 18, padding: '18px 20px',
                  boxShadow: '0 2px 14px rgba(0,0,0,0.06)',
                  display: 'flex', gap: 14, alignItems: 'flex-start',
                  border: item.highlight ? `2px solid #F57600` : 'none',
                }}
              >
                <span style={{ fontSize: 30, flexShrink: 0, lineHeight: 1 }}>{item.icon}</span>
                <div>
                  <p style={{ margin: '0 0 5px', fontSize: 13, fontWeight: 800, color: item.highlight ? '#7A3200' : C.purple }}>{item.period}</p>
                  <p style={{ margin: 0, fontSize: 14, color: C.text, lineHeight: 1.55 }}>{item.note}</p>
                </div>
              </div>
            ))}
          </>
        )}

        <div style={{ height: 24 }} />
      </div>
    </div>
  )
}

// ── Screen: Playbook ─────────────────────────────────────────────────
function PlaybookScreen() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#fafaf8' }}>
      <div style={{ padding: '24px 22px 16px' }}>
        <h2 style={{ fontSize: 26, fontWeight: 900, color: C.text, margin: 0, letterSpacing: -0.5 }}>The Playbook</h2>
        <p style={{ fontSize: 14, color: C.muted, margin: '8px 0 0', lineHeight: 1.55 }}>
          Every dealer, every addiction, every hook — same six moves. Understanding the system is how you break it.
        </p>
      </div>

      <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {DEALER_TACTICS.map((tactic, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 2px 14px rgba(0,0,0,0.06)' }}>
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              style={{
                width: '100%', padding: '18px 20px', border: 'none', background: 'none',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left',
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 14, background: tactic.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, fontWeight: 900, color: '#fff', flexShrink: 0,
              }}>
                {tactic.number}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 800, color: C.text }}>{tactic.title}</p>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: '#9ca3af' }}>{tactic.subtitle}</p>
              </div>
              <span style={{
                fontSize: 20, color: '#d1d5db', fontWeight: 300,
                transform: expanded === i ? 'rotate(90deg)' : 'none',
                transition: 'transform 0.2s', display: 'inline-block',
              }}>›</span>
            </button>

            {expanded === i && (
              <div style={{ padding: '0 20px 20px' }}>
                <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: 16 }}>
                  <p style={{ margin: '0 0 14px', fontSize: 14, color: '#374151', lineHeight: 1.65 }}>
                    {tactic.body}
                  </p>
                  <div style={{ background: C.purpleLight, borderRadius: 14, padding: '14px 16px', borderLeft: `3px solid ${C.purple}` }}>
                    <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 800, color: C.purple, textTransform: 'uppercase', letterSpacing: 1 }}>
                      Hooked — Nir Eyal
                    </p>
                    <p style={{ margin: 0, fontSize: 13, color: C.purpleDark, lineHeight: 1.6 }}>{tactic.model}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Counter-strategy card */}
        <div style={{ background: 'linear-gradient(135deg, #E3EDF8 0%, #C8DFF2 100%)', borderRadius: 20, padding: 22, marginTop: 4 }}>
          <p style={{ margin: '0 0 10px', fontSize: 15, fontWeight: 900, color: C.purpleDark }}>The counter-strategy</p>
          <p style={{ margin: 0, fontSize: 14, color: '#001A5C', lineHeight: 1.65 }}>
            Clarity uses the same Hooked model — in reverse. Your streak is the trigger. Checking in is the action. Unlocking milestones is the variable reward. Your data, savings and progress are the investment. Same system. Your goal, not theirs.
          </p>
        </div>

        <div style={{ height: 24 }} />
      </div>
    </div>
  )
}

// ── Screen: Progress ─────────────────────────────────────────────────
function ProgressScreen({ user }: { user: UserData }) {
  const cleanDays = getCleanDays(user.startDate)
  const saved = getMoneySaved(user.weeklySpend, user.startDate)
  const annual = user.weeklySpend * 52

  const unlocked = ACHIEVEMENTS.filter(a => cleanDays >= a.days || a.id === 'first-step')
  const locked = ACHIEVEMENTS.filter(a => cleanDays < a.days && a.id !== 'first-step')
  const nextMilestone = locked[0]

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#fafaf8' }}>
      <div style={{ padding: '24px 22px 16px' }}>
        <h2 style={{ fontSize: 26, fontWeight: 900, color: C.text, margin: 0, letterSpacing: -0.5 }}>Progress</h2>
        <p style={{ fontSize: 14, color: C.muted, margin: '8px 0 0' }}>Every day is data. Every day counts.</p>
      </div>

      <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: '18px 16px', textAlign: 'center', boxShadow: '0 2px 14px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 42, fontWeight: 900, color: C.purple, letterSpacing: -2, lineHeight: 1 }}>{cleanDays}</div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 6, fontWeight: 600 }}>days clear</div>
          </div>
          <div style={{ background: '#fff', borderRadius: 20, padding: '18px 16px', textAlign: 'center', boxShadow: '0 2px 14px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: saved >= 1000 ? 28 : 36, fontWeight: 900, color: C.green, letterSpacing: -1.5, lineHeight: 1 }}>{fmt(saved)}</div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 6, fontWeight: 600 }}>saved so far</div>
          </div>
        </div>

        {/* Annual stake */}
        <div style={{ background: 'linear-gradient(135deg, #FFF2E6, #FFE0C2)', borderRadius: 20, padding: '20px 22px' }}>
          <p style={{ margin: '0 0 4px', fontSize: 12, fontWeight: 800, color: '#7A3200', textTransform: 'uppercase', letterSpacing: 1 }}>The annual stake</p>
          <p style={{ margin: '0 0 6px', fontSize: 36, fontWeight: 900, color: '#5C2200', letterSpacing: -1 }}>{fmt(annual)}</p>
          <p style={{ margin: 0, fontSize: 13, color: '#A04400', lineHeight: 1.5 }}>
            That's what continuing for a year costs. {annualComparison(annual)} — yours or theirs.
          </p>
        </div>

        {/* Next milestone */}
        {nextMilestone && (
          <div style={{ background: 'linear-gradient(135deg, #E3EDF8, #C8DFF2)', borderRadius: 20, padding: '20px 22px', border: `1px solid ${C.purple}30` }}>
            <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 800, color: C.purple, textTransform: 'uppercase', letterSpacing: 1 }}>Next milestone</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 40 }}>{nextMilestone.emoji}</span>
              <div>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 800, color: C.purpleDark }}>{nextMilestone.label}</p>
                <p style={{ margin: '3px 0 0', fontSize: 13, color: C.purple }}>
                  {nextMilestone.days - cleanDays} more {nextMilestone.days - cleanDays === 1 ? 'day' : 'days'} — {nextMilestone.desc}
                </p>
              </div>
            </div>
            <div style={{ marginTop: 14, height: 8, background: 'rgba(0,48,135,0.15)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${Math.min(100, (cleanDays / nextMilestone.days) * 100)}%`,
                background: `linear-gradient(90deg, ${C.purple}, ${C.indigo})`,
                borderRadius: 4,
                transition: 'width 1s cubic-bezier(0.16,1,0.3,1)',
              }} />
            </div>
          </div>
        )}

        {/* Earned achievements */}
        <div>
          <p style={{ fontSize: 12, fontWeight: 800, color: C.muted, textTransform: 'uppercase', letterSpacing: 1.2, margin: '4px 0 12px' }}>Earned</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {unlocked.map(a => (
              <div key={a.id} style={{
                background: '#fff', borderRadius: 16, padding: '15px 18px',
                display: 'flex', alignItems: 'center', gap: 14,
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                border: `1px solid ${C.border}`,
              }}>
                <span style={{ fontSize: 34, lineHeight: 1 }}>{a.emoji}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 15, fontWeight: 800, color: C.purple }}>{a.label}</p>
                  <p style={{ margin: '2px 0 0', fontSize: 12, color: C.muted }}>{a.desc}</p>
                </div>
                <div style={{ width: 24, height: 24, borderRadius: 12, background: C.purple, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 800 }}>✓</div>
              </div>
            ))}
          </div>
        </div>

        {/* Locked achievements */}
        {locked.length > 0 && (
          <div>
            <p style={{ fontSize: 12, fontWeight: 800, color: C.muted, textTransform: 'uppercase', letterSpacing: 1.2, margin: '4px 0 12px' }}>Coming up</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {locked.slice(0, 4).map(a => (
                <div key={a.id} style={{
                  background: '#f9fafb', borderRadius: 16, padding: '15px 18px',
                  display: 'flex', alignItems: 'center', gap: 14, opacity: 0.55,
                }}>
                  <span style={{ fontSize: 34, lineHeight: 1, filter: 'grayscale(1)' }}>{a.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#9ca3af' }}>{a.label}</p>
                    <p style={{ margin: '2px 0 0', fontSize: 12, color: '#9ca3af' }}>
                      {a.days - cleanDays} more {a.days - cleanDays === 1 ? 'day' : 'days'}
                    </p>
                  </div>
                  <span style={{ fontSize: 18 }}>🔒</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ height: 24 }} />
      </div>
    </div>
  )
}

// ── Main App ─────────────────────────────────────────────────────────
const DEFAULT_USER: UserData = {
  name: '', userType: '', substances: [],
  weeklySpend: 100, frequency: 'weekly', startDate: Date.now(),
}

export default function ClarityApp() {
  const [screen, setScreen] = useState<Screen>('splash')
  const [user, setUser] = useState<UserData>(DEFAULT_USER)

  const patch = useCallback((updates: Partial<UserData>) => {
    setUser(p => ({ ...p, ...updates }))
  }, [])

  const isMainScreen = ['dashboard', 'health', 'playbook', 'progress'].includes(screen)

  const renderContent = () => {
    switch (screen) {
      case 'splash':         return <SplashScreen onStart={() => setScreen('ob-name')} />
      case 'ob-name':        return <ObName onNext={name => { patch({ name }); setScreen('ob-type') }} />
      case 'ob-type':        return <ObType name={user.name} onNext={userType => { patch({ userType }); setScreen('ob-substances') }} />
      case 'ob-substances':  return <ObSubstances onNext={substances => { patch({ substances }); setScreen('ob-spend') }} />
      case 'ob-spend':       return <ObSpend onNext={weeklySpend => { patch({ weeklySpend }); setScreen('ob-frequency') }} />
      case 'ob-frequency':   return <ObFrequency onNext={frequency => { patch({ frequency, startDate: Date.now() }); setScreen('ob-complete') }} />
      case 'ob-complete':    return <ObComplete name={user.name} onDone={() => setScreen('dashboard')} />
      case 'dashboard':      return <Dashboard user={user} onNav={setScreen} />
      case 'health':         return <HealthScreen user={user} />
      case 'playbook':       return <PlaybookScreen />
      case 'progress':       return <ProgressScreen user={user} />
      default:               return null
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        input[type=range] { -webkit-appearance: none; appearance: none; background: transparent; }
        input[type=range]::-webkit-slider-runnable-track { height: 5px; border-radius: 3px; background: linear-gradient(90deg, #003087, #0066B2); }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 22px; height: 22px; border-radius: 50%; background: #003087; margin-top: -8.5px; box-shadow: 0 2px 8px rgba(0,48,135,0.4); cursor: grab; }
        * { -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Page wrapper — covers the Lucille site entirely */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'radial-gradient(ellipse at 30% 20%, #001A5C 0%, #000820 50%, #000D1A 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
      }}>

        {/* Side buttons (decorative) */}
        <div style={{ position: 'absolute', left: 'calc(50% - 210px)', top: '28%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[44, 44, 44].map((h, i) => (
            <div key={i} style={{ width: 4, height: h, background: 'rgba(255,255,255,0.12)', borderRadius: 2, marginLeft: -2 }} />
          ))}
        </div>
        <div style={{ position: 'absolute', left: 'calc(50% + 204px)', top: '34%' }}>
          <div style={{ width: 4, height: 72, background: 'rgba(255,255,255,0.12)', borderRadius: 2, marginLeft: 0 }} />
        </div>

        {/* iPhone 17 Pro Max frame */}
        <div style={{
          width: 393,
          height: 852,
          background: 'linear-gradient(160deg, #2a2a2c 0%, #1c1c1e 50%, #161618 100%)',
          borderRadius: 54,
          padding: 4,
          boxShadow: [
            '0 0 0 1px rgba(255,255,255,0.12)',
            '0 0 0 2px rgba(0,0,0,0.8)',
            '0 40px 80px rgba(0,0,0,0.7)',
            '0 0 60px rgba(0,164,228,0.18)',
          ].join(', '),
          position: 'relative',
          flexShrink: 0,
        }}>

          {/* Screen */}
          <div style={{
            width: '100%', height: '100%',
            background: '#fafaf8',
            borderRadius: 50,
            overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
            position: 'relative',
          }}>
            <StatusBar />

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              {renderContent()}
            </div>

            {isMainScreen
              ? <BottomNav active={screen} onNav={setScreen} />
              : <HomeIndicator />
            }
          </div>
        </div>

        {/* App name below phone */}
        <div style={{ position: 'absolute', bottom: 32, textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.25)', letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>
            Clarity · iPhone 17 Pro Max
          </p>
        </div>
      </div>
    </>
  )
}
