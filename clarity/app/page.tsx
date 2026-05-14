'use client'

import { useState, useEffect, useCallback } from 'react'

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

const SUBSTANCES = [
  { id: 'ketamine', label: 'Ketamine' },
  { id: 'mdma', label: 'MDMA / Ecstasy' },
  { id: 'cocaine', label: 'Cocaine' },
  { id: 'cannabis', label: 'Cannabis' },
  { id: 'alcohol', label: 'Alcohol' },
  { id: 'other', label: 'Other' },
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
  { period: '48–72 hours', note: "Peak craving window. The hardest part. You're in it.", icon: '⚡', highlight: true },
  { period: '1 week', note: 'Sleep architecture begins restoring. Dreams return.', icon: '😴' },
  { period: '2 weeks', note: 'Short-term memory noticeably sharper. Fog starts to clear.', icon: '🧠' },
  { period: '1 month', note: 'Bladder inflammation reducing. Urgency improving markedly.', icon: '✨' },
  { period: '3 months', note: 'Cognitive function measurably improved. Processing speed recovering.', icon: '📈' },
  { period: '6 months', note: 'Significant bladder healing in most users who stopped.', icon: '🌱' },
  { period: '1 year', note: 'Substantial cognitive recovery. Most report feeling like themselves again.', icon: '🌟' },
]

const DEALER_TACTICS = [
  { number: 1, title: 'The Gateway', subtitle: 'Hook #1: The Free Sample', body: "The first experience is often \"on someone else's tab.\" Once the baseline is set, you're chasing it. You didn't choose to get hooked — you were handed the trigger.", model: "Nir Eyal's Hooked model starts here: the external trigger. That first experience wires a neural pathway that your brain will spend years trying to recreate.", color: '#0099D4' },
  { number: 2, title: 'The Variable High', subtitle: 'Hook #2: The Slot Machine', body: "Every batch is different. Different purity, different effect. That unpredictability keeps you coming back — exactly like a slot machine. You're not chasing the high. You're chasing the possibility of it.", model: 'Variable reward is the most powerful behavioural hook in psychology. Inconsistent reinforcement creates stronger compulsion than reliable reward. This is deliberate.', color: '#0077AA' },
  { number: 3, title: 'The Escape Narrative', subtitle: 'Hook #3: You Deserve This', body: '"Hard week? Long day? You\'ve earned it." This story makes use feel rational — even like self-care. It\'s the most seductive marketing script ever written.', model: 'Internal triggers. Your emotional state (stress, boredom, loneliness) becomes the cue. The substance becomes your default emotional regulation strategy. That\'s when it owns you.', color: '#FF9F0A' },
  { number: 4, title: 'The Tolerance Trap', subtitle: 'Hook #4: More for Less', body: "It takes more to feel the same. You're spending more for a diminishing return. Quitting now feels like \"losing\" — but continuing is the actual loss.", model: "Investment in Hooked: the more you've put in, the harder to walk away. Sunk cost bias keeps you in the game. Your escalating spend is the evidence.", color: '#FF6B00' },
  { number: 5, title: 'The Social Proof Machine', subtitle: 'Hook #5: Everyone Does It', body: "When your entire social scene uses, abstaining feels abnormal. Use becomes invisible and ambient. Quitting means challenging your social identity — that's why it's so hard.", model: 'Social norms are the most powerful behaviour driver in existence. The dealer doesn\'t need to sell to you directly. Your environment does it for them.', color: '#FF3B30' },
  { number: 6, title: 'The Availability Architect', subtitle: 'Hook #6: Always On', body: "Three messages and it's at your door within the hour. The friction to obtain has been engineered to near-zero. Low effort plus any motivation equals use.", model: "BJ Fogg's Behaviour Model: Motivation × Ability × Trigger. When ability is effortless, even mild motivation triggers use. Your dealer's best product is convenience.", color: '#34C759' },
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

// ── Helpers ───────────────────────────────────────────────────────────
function getCleanDays(startDate: number): number {
  return Math.floor((Date.now() - startDate) / (1000 * 60 * 60 * 24))
}
function getMoneySaved(weeklySpend: number, startDate: number): number {
  return Math.round((weeklySpend / 7) * getCleanDays(startDate))
}
function getDealerGrip(frequency: string, cleanDays: number): number {
  const base: Record<string, number> = { daily: 93, 'few-week': 80, weekly: 66, monthly: 47 }
  const start = base[frequency] ?? 70
  return Math.max(8, Math.round(start - Math.min(cleanDays * 0.7, start - 10)))
}
function fmt(n: number): string { return `£${n.toLocaleString()}` }
function annualComparison(annual: number): string {
  if (annual >= 12000) return "a year's salary top-up"
  if (annual >= 6000) return 'a business-class return flight to Tokyo, twice'
  if (annual >= 3000) return 'three months of London rent'
  if (annual >= 1500) return 'a MacBook Pro'
  if (annual >= 800) return 'a long weekend in New York'
  return 'a month of groceries'
}

// ── Colour system — dark mode, Sky Sports inspired ────────────────────
const C = {
  bg:         '#09090F',
  card:       '#111319',
  cardAlt:    '#191B25',
  surface:    '#1F2130',
  accent:     '#0099D4',
  accentHi:   '#00B8F0',
  accentGlow: 'rgba(0,153,212,0.14)',
  green:      '#34C759',
  greenDim:   'rgba(52,199,89,0.12)',
  amber:      '#FF9F0A',
  amberDim:   'rgba(255,159,10,0.12)',
  red:        '#FF3B30',
  redDim:     'rgba(255,59,48,0.12)',
  text:       '#FFFFFF',
  textSec:    '#8E8E93',
  textTer:    '#48484A',
  border:     'rgba(255,255,255,0.07)',
  borderHi:   'rgba(255,255,255,0.13)',
}

// ── Shared UI ─────────────────────────────────────────────────────────
function Btn({ label, onClick, disabled, secondary, danger }: {
  label: string; onClick: () => void; disabled?: boolean; secondary?: boolean; danger?: boolean
}) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: '100%', padding: '18px 24px',
      background: disabled ? C.surface : danger ? C.red : secondary ? C.cardAlt : C.accent,
      color: disabled ? C.textTer : '#fff',
      border: secondary ? `1px solid ${C.borderHi}` : 'none',
      borderRadius: 50,
      fontSize: 17, fontWeight: 600,
      cursor: disabled ? 'not-allowed' : 'pointer',
      letterSpacing: -0.2,
      transition: 'opacity 0.15s',
      fontFamily: 'inherit',
    }}>
      {label}
    </button>
  )
}

function StepBar({ step, total }: { step: number; total: number }) {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          flex: 1, height: 3, borderRadius: 2,
          background: i < step ? C.accent : C.border,
          transition: 'background 0.3s',
        }} />
      ))}
    </div>
  )
}

function Tag({ label, color }: { label: string; color: string }) {
  return (
    <span style={{ fontSize: 10, fontWeight: 700, color, background: color + '22', padding: '3px 8px', borderRadius: 20, letterSpacing: 0.8, textTransform: 'uppercase' as const }}>
      {label}
    </span>
  )
}

// ── Bottom Nav ────────────────────────────────────────────────────────
function BottomNav({ active, onNav }: { active: Screen; onNav: (s: Screen) => void }) {
  const tabs: { id: Screen; label: string; icon: React.ReactNode }[] = [
    {
      id: 'dashboard', label: 'Today',
      icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="4" fill="currentColor"/><path d="M11 2v2M11 18v2M2 11h2M18 11h2M4.34 4.34l1.42 1.42M16.24 16.24l1.42 1.42M16.24 5.76l-1.42 1.42M5.76 16.24l-1.42 1.42" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
    },
    {
      id: 'health', label: 'Health',
      icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 19S2.5 13 2.5 7.5a4.75 4.75 0 0 1 8.5-2.9 4.75 4.75 0 0 1 8.5 2.9C19.5 13 11 19 11 19Z" fill="currentColor"/></svg>,
    },
    {
      id: 'playbook', label: 'Playbook',
      icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="4" width="7" height="14" rx="2" fill="currentColor" opacity="0.6"/><rect x="12" y="4" width="7" height="14" rx="2" fill="currentColor"/></svg>,
    },
    {
      id: 'progress', label: 'Progress',
      icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="2" y="14" width="4" height="6" rx="1.5" fill="currentColor"/><rect x="9" y="9" width="4" height="11" rx="1.5" fill="currentColor"/><rect x="16" y="4" width="4" height="16" rx="1.5" fill="currentColor"/></svg>,
    },
  ]
  return (
    <div style={{
      display: 'flex', flexShrink: 0,
      background: 'rgba(9,9,15,0.94)',
      backdropFilter: 'blur(24px)',
      borderTop: `1px solid ${C.border}`,
    }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onNav(t.id)} style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 4, border: 'none', background: 'none',
          padding: '12px 0 18px',
          cursor: 'pointer',
          color: active === t.id ? C.accent : C.textSec,
          fontSize: 10, fontWeight: active === t.id ? 600 : 400,
          transition: 'color 0.2s',
          fontFamily: 'inherit',
        }}>
          {t.icon}
          <span style={{ letterSpacing: 0.1 }}>{t.label}</span>
        </button>
      ))}
    </div>
  )
}

// ── Screen: Splash ────────────────────────────────────────────────────
function SplashScreen({ onStart }: { onStart: () => void }) {
  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      padding: '52px 28px 44px',
      background: `radial-gradient(ellipse at 20% -10%, rgba(0,153,212,0.22) 0%, ${C.bg} 55%)`,
    }}>
      <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: C.text, letterSpacing: -0.5 }}>
        Clarity
      </h1>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24, paddingTop: 32 }}>
        <div>
          <h2 style={{ margin: '0 0 18px', fontSize: 52, fontWeight: 900, color: C.text, lineHeight: 1.02, letterSpacing: -2.5 }}>
            See through<br />the pattern.
          </h2>
          <p style={{ margin: 0, fontSize: 18, color: C.textSec, lineHeight: 1.65, fontWeight: 400 }}>
            Know what's really holding you. No judgment, no noise — just an honest picture.
          </p>
        </div>

        <div style={{ background: C.card, borderRadius: 16, padding: '18px 20px', border: `1px solid ${C.border}` }}>
          <p style={{ margin: 0, fontSize: 15, color: C.textSec, lineHeight: 1.65, fontWeight: 400 }}>
            <span style={{ color: C.text, fontWeight: 600 }}>For the 22–40 professional</span>{' '}
            who knows something's off but hasn't stopped to look at it honestly.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Btn label="Begin" onClick={onStart} />
        <p style={{ margin: 0, fontSize: 13, color: C.textTer, textAlign: 'center', fontWeight: 400 }}>
          No account. No data shared. Stays on your device.
        </p>
      </div>
    </div>
  )
}

// ── Onboarding shell ──────────────────────────────────────────────────
function ObShell({ step, total, children }: { step: number; total: number; children: React.ReactNode }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.bg, padding: '0 24px 36px' }}>
      <div style={{ paddingTop: 92 }}>
        <StepBar step={step} total={total} />
        <p style={{ fontSize: 12, fontWeight: 600, color: C.accent, textTransform: 'uppercase', letterSpacing: 1.5, margin: '14px 0 0' }}>
          Step {step} of {total}
        </p>
      </div>
      {children}
    </div>
  )
}

// ── Screen: Onboarding Name ───────────────────────────────────────────
function ObName({ onNext }: { onNext: (name: string) => void }) {
  const [val, setVal] = useState('')
  return (
    <ObShell step={1} total={5}>
      <h2 style={{ fontSize: 32, fontWeight: 800, color: C.text, margin: '14px 0 10px', lineHeight: 1.1 }}>What's your name?</h2>
      <p style={{ fontSize: 15, color: C.textSec, margin: '0 0 32px', lineHeight: 1.6, fontWeight: 400 }}>
        No sign-up. No data shared. Everything stays on your device.
      </p>
      <div>
        <label style={{ fontSize: 13, fontWeight: 500, color: C.textSec, display: 'block', marginBottom: 10 }}>
          First name
        </label>
        <input
          type="text"
          placeholder="Your first name..."
          value={val}
          onChange={e => setVal(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && val.trim() && onNext(val.trim())}
          autoFocus
          style={{
            width: '100%', padding: '18px 20px',
            fontSize: 18, fontWeight: 600,
            border: `1.5px solid ${val ? C.accent : C.border}`,
            borderRadius: 16, outline: 'none',
            background: C.card, color: C.text,
            boxSizing: 'border-box', transition: 'border-color 0.2s',
            fontFamily: 'inherit',
          }}
        />
      </div>
      <div style={{ flex: 1 }} />
      <Btn label="Continue" onClick={() => val.trim() && onNext(val.trim())} disabled={!val.trim()} />
    </ObShell>
  )
}

// ── Screen: Onboarding Type ───────────────────────────────────────────
function ObType({ name, onNext }: { name: string; onNext: (type: string) => void }) {
  const [sel, setSel] = useState('')
  return (
    <ObShell step={2} total={5}>
      <h2 style={{ fontSize: 32, fontWeight: 800, color: C.text, margin: '14px 0 10px', lineHeight: 1.1 }}>Hey {name}, what brings you here?</h2>
      <p style={{ fontSize: 15, color: C.textSec, margin: '0 0 28px', fontWeight: 400 }}>No wrong answer.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
        {USER_TYPES.map(t => (
          <button key={t.id} onClick={() => setSel(t.id)} style={{
            padding: '18px 20px',
            border: `1.5px solid ${sel === t.id ? C.accent : C.border}`,
            borderRadius: 16,
            background: sel === t.id ? `rgba(0,153,212,0.12)` : C.card,
            display: 'flex', alignItems: 'center', gap: 14,
            cursor: 'pointer', textAlign: 'left', transition: 'all 0.18s',
            fontFamily: 'inherit',
          }}>
            <span style={{ fontSize: 24 }}>{t.emoji}</span>
            <span style={{ fontSize: 15, fontWeight: 600, color: sel === t.id ? C.accentHi : C.text, lineHeight: 1.4 }}>{t.label}</span>
          </button>
        ))}
      </div>
      <Btn label="Continue" onClick={() => sel && onNext(sel)} disabled={!sel} />
    </ObShell>
  )
}

// ── Screen: Onboarding Substances ─────────────────────────────────────
function ObSubstances({ onNext }: { onNext: (subs: string[]) => void }) {
  const [sel, setSel] = useState<string[]>([])
  const toggle = (id: string) => setSel(p => p.includes(id) ? p.filter(s => s !== id) : [...p, id])
  return (
    <ObShell step={3} total={5}>
      <h2 style={{ fontSize: 32, fontWeight: 800, color: C.text, margin: '14px 0 10px', lineHeight: 1.1 }}>Which substances are in your life?</h2>
      <p style={{ fontSize: 15, color: C.textSec, margin: '0 0 28px', fontWeight: 400 }}>Select all that apply. Honest data, honest picture.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
        {SUBSTANCES.map(s => (
          <button key={s.id} onClick={() => toggle(s.id)} style={{
            padding: '17px 20px',
            border: `1.5px solid ${sel.includes(s.id) ? C.accent : C.border}`,
            borderRadius: 16,
            background: sel.includes(s.id) ? 'rgba(0,153,212,0.12)' : C.card,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            cursor: 'pointer', transition: 'all 0.18s',
            fontFamily: 'inherit',
          }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: sel.includes(s.id) ? C.accentHi : C.text }}>{s.label}</span>
            {sel.includes(s.id) && (
              <div style={{ width: 22, height: 22, borderRadius: 11, background: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700 }}>✓</div>
            )}
          </button>
        ))}
      </div>
      <Btn label="Continue" onClick={() => sel.length > 0 && onNext(sel)} disabled={sel.length === 0} />
    </ObShell>
  )
}

// ── Screen: Onboarding Spend ──────────────────────────────────────────
function ObSpend({ onNext }: { onNext: (spend: number) => void }) {
  const [spend, setSpend] = useState(120)
  const annual = spend * 52
  return (
    <ObShell step={4} total={5}>
      <h2 style={{ fontSize: 32, fontWeight: 800, color: C.text, margin: '14px 0 10px', lineHeight: 1.1 }}>How much a week?</h2>
      <p style={{ fontSize: 15, color: C.textSec, margin: '0 0 28px', fontWeight: 400 }}>Across all substances, roughly. Ballpark is fine.</p>

      <div style={{ background: C.card, borderRadius: 20, padding: '28px 24px', textAlign: 'center', marginBottom: 24, border: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 56, fontWeight: 900, color: C.accent, letterSpacing: -2, lineHeight: 1 }}>£{spend}</div>
        <div style={{ fontSize: 14, color: C.textSec, marginTop: 4, fontWeight: 400 }}>per week</div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <label style={{ fontSize: 13, fontWeight: 500, color: C.textSec, display: 'block', marginBottom: 14 }}>
          Weekly spend
        </label>
        <input
          type="range" min={10} max={500} step={10} value={spend}
          onChange={e => setSpend(Number(e.target.value))}
          style={{ width: '100%', accentColor: C.accent, height: 5, marginBottom: 8 }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.textTer, fontWeight: 400 }}>
          <span>£10</span><span>£500+</span>
        </div>
      </div>

      <div style={{ background: `rgba(255,159,10,0.10)`, border: `1px solid rgba(255,159,10,0.2)`, borderRadius: 18, padding: '18px 20px', marginBottom: 28 }}>
        <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: C.amber }}>
          That's <span style={{ fontSize: 22 }}>{fmt(annual)}</span> a year
        </p>
        <p style={{ margin: '6px 0 0', fontSize: 13, color: C.textSec, fontWeight: 400 }}>
          Enough for {annualComparison(annual)}.
        </p>
      </div>

      <Btn label="Continue" onClick={() => onNext(spend)} />
    </ObShell>
  )
}

// ── Screen: Onboarding Frequency ──────────────────────────────────────
function ObFrequency({ onNext }: { onNext: (freq: string) => void }) {
  const [sel, setSel] = useState('')
  return (
    <ObShell step={5} total={5}>
      <h2 style={{ fontSize: 32, fontWeight: 800, color: C.text, margin: '14px 0 10px', lineHeight: 1.1 }}>How often are you using?</h2>
      <p style={{ fontSize: 15, color: C.textSec, margin: '0 0 28px', fontWeight: 400 }}>This calibrates your Dealer's Grip score.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
        {FREQUENCIES.map(f => (
          <button key={f.id} onClick={() => setSel(f.id)} style={{
            padding: '18px 20px',
            border: `1.5px solid ${sel === f.id ? C.accent : C.border}`,
            borderRadius: 16,
            background: sel === f.id ? 'rgba(0,153,212,0.12)' : C.card,
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
            cursor: 'pointer', transition: 'all 0.18s', textAlign: 'left',
            fontFamily: 'inherit',
          }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: sel === f.id ? C.accentHi : C.text }}>{f.label}</span>
            <span style={{ fontSize: 13, color: C.textSec, marginTop: 3, fontWeight: 400 }}>{f.desc}</span>
          </button>
        ))}
      </div>
      <Btn label="See My Picture" onClick={() => sel && onNext(sel)} disabled={!sel} />
    </ObShell>
  )
}

// ── Screen: Onboarding Complete ───────────────────────────────────────
function ObComplete({ name, onDone }: { name: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800)
    return () => clearTimeout(t)
  }, [onDone])
  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '0 32px',
      background: `radial-gradient(ellipse at 50% 40%, rgba(0,153,212,0.18) 0%, ${C.bg} 65%)`,
      gap: 20, textAlign: 'center',
    }}>
      <div style={{ fontSize: 72, lineHeight: 1 }}>✨</div>
      <div>
        <h2 style={{ fontSize: 32, fontWeight: 900, color: C.text, margin: 0, lineHeight: 1.2 }}>
          Your picture is ready,<br />{name}.
        </h2>
        <p style={{ fontSize: 16, color: C.textSec, margin: '16px 0 0', lineHeight: 1.6, fontWeight: 400 }}>
          No filter. No judgment.<br />Just an honest look.
        </p>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 8, height: 8, borderRadius: 4, background: C.accent,
            opacity: 0.3 + i * 0.35,
            animation: 'fadeIn 0.4s ease both',
            animationDelay: `${i * 0.15}s`,
          }} />
        ))}
      </div>
    </div>
  )
}

// ── Screen: Dashboard ─────────────────────────────────────────────────
function Dashboard({ user, onNav }: { user: UserData; onNav: (s: Screen) => void }) {
  const cleanDays = getCleanDays(user.startDate)
  const saved = getMoneySaved(user.weeklySpend, user.startDate)
  const grip = getDealerGrip(user.frequency, cleanDays)
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const streakEmoji = cleanDays === 0 ? '🌅' : cleanDays < 3 ? '🔆' : cleanDays < 7 ? '🔥' : cleanDays < 30 ? '⚡' : '🏆'

  return (
    <div style={{ overflowY: 'auto', background: C.bg }}>
      {/* Combined top sheet — greeting + streak */}
      <div style={{
        background: `linear-gradient(160deg, rgba(0,153,212,0.28) 0%, rgba(0,40,80,0.6) 45%, ${C.card} 100%)`,
        padding: '40px 24px 32px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, background: 'rgba(0,153,212,0.1)', borderRadius: '50%', filter: 'blur(48px)', pointerEvents: 'none' }} />
        <p style={{ margin: '0 0 4px', fontSize: 14, color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>{greeting}</p>
        <h2 style={{ margin: '0 0 24px', fontSize: 28, fontWeight: 800, color: C.text, letterSpacing: -0.5 }}>{user.name}</h2>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1.5 }}>Clean streak</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 72, fontWeight: 900, color: C.text, letterSpacing: -3, lineHeight: 1 }}>{cleanDays}</span>
              <span style={{ fontSize: 20, fontWeight: 500, color: 'rgba(255,255,255,0.55)' }}>{cleanDays === 1 ? 'day' : 'days'}</span>
            </div>
            <p style={{ margin: '10px 0 0', fontSize: 14, color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>
              {cleanDays === 0 ? 'Your journey starts now.' : `Day ${cleanDays} of your clarity journey`}
            </p>
          </div>
          <span style={{ fontSize: 64, lineHeight: 1, marginBottom: 4 }}>{streakEmoji}</span>
        </div>
      </div>

      {/* Health Picture + Playbook — directly below top sheet */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '16px 16px 0' }}>
        {[
          { screen: 'health' as Screen, emoji: '🫀', title: 'Health Picture', sub: 'Real data, no filter' },
          { screen: 'playbook' as Screen, emoji: '🎭', title: 'The Playbook', sub: 'How you got hooked' },
        ].map(card => (
          <button key={card.screen} onClick={() => onNav(card.screen)} style={{
            background: C.card, borderRadius: 20, padding: '20px 18px',
            border: `1px solid ${C.border}`, cursor: 'pointer', textAlign: 'left',
            transition: 'border-color 0.2s', fontFamily: 'inherit',
          }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>{card.emoji}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.text, lineHeight: 1.3 }}>{card.title}</div>
            <div style={{ fontSize: 12, color: C.textSec, marginTop: 4, fontWeight: 400 }}>{card.sub}</div>
          </button>
        ))}
      </div>

      <div style={{ padding: '14px 16px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Money saved */}
        <div style={{ background: C.greenDim, borderRadius: 22, padding: '22px 22px', border: `1px solid rgba(52,199,89,0.2)` }}>
          <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: C.green, textTransform: 'uppercase', letterSpacing: 1.2 }}>Money saved</p>
          <div style={{ fontSize: 44, fontWeight: 900, color: C.green, marginTop: 8, letterSpacing: -1.5, lineHeight: 1 }}>{fmt(saved)}</div>
          <p style={{ margin: '8px 0 0', fontSize: 13, color: C.textSec, fontWeight: 400 }}>
            {saved === 0
              ? `You spend ${fmt(user.weeklySpend)} a week. Start your first clear day.`
              : `${fmt(user.weeklySpend)} × ${cleanDays} ${cleanDays === 1 ? 'day' : 'days'}. Yours, not theirs.`}
          </p>
        </div>

        {/* Dealer's Grip */}
        <div style={{ background: C.card, borderRadius: 22, padding: '20px 22px', border: `1px solid ${C.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: C.textSec, textTransform: 'uppercase', letterSpacing: 1.2 }}>Dealer's grip</p>
              <p style={{ margin: '4px 0 0', fontSize: 12, color: C.textTer, fontWeight: 400 }}>How much control they hold over you</p>
            </div>
            <span style={{ fontSize: 24, fontWeight: 900, color: grip > 65 ? C.red : grip > 35 ? C.amber : C.green, letterSpacing: -0.5 }}>
              {grip}%
            </span>
          </div>
          <div style={{ height: 8, background: C.surface, borderRadius: 4, overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: `${grip}%`,
              background: grip > 65 ? C.red : grip > 35 ? C.amber : C.green,
              borderRadius: 4, transition: 'width 1.2s cubic-bezier(0.16,1,0.3,1)',
            }} />
          </div>
          <p style={{ margin: '10px 0 0', fontSize: 12, color: C.textSec, lineHeight: 1.5, fontWeight: 400 }}>
            {grip > 65 ? '⚠️ Strong dependency pattern. Every clean day reduces this.'
              : grip > 35 ? '📈 Grip loosening. You\'re starting to take it back.'
              : '✅ You\'re breaking free. The pattern is collapsing.'}
          </p>
        </div>

        {/* Today's challenge */}
        <div style={{ background: C.amberDim, borderRadius: 22, padding: '20px 22px', marginBottom: 24, border: `1px solid rgba(255,159,10,0.2)` }}>
          <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 700, color: C.amber, textTransform: 'uppercase', letterSpacing: 1.2 }}>Today's challenge</p>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: C.text, lineHeight: 1.45 }}>
            Name the trigger. What usually starts the urge?
          </p>
          <p style={{ margin: '8px 0 0', fontSize: 13, color: C.textSec, lineHeight: 1.5, fontWeight: 400 }}>
            Stress? Boredom? A specific person? A specific time? Naming it breaks 30% of the pattern.
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Screen: Health ────────────────────────────────────────────────────
function HealthScreen({ user }: { user: UserData }) {
  const [tab, setTab] = useState<'moderate' | 'severe' | 'recovery'>('moderate')
  const hasKetamine = user.substances.includes('ketamine')

  return (
    <div style={{ overflowY: 'auto', background: C.bg }}>
      <div style={{ padding: '32px 22px 18px' }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: C.text, margin: 0, letterSpacing: -0.5 }}>Your health picture</h2>
        <p style={{ fontSize: 14, color: C.textSec, margin: '10px 0 0', lineHeight: 1.55, fontWeight: 400 }}>
          {hasKetamine
            ? 'Ketamine-specific data from peer-reviewed research. No filter.'
            : 'Evidence-based data on substance use. No scare tactics — just facts.'}
        </p>
      </div>

      <div style={{ display: 'flex', padding: '0 18px', gap: 8, marginBottom: 18 }}>
        {([['moderate', '⚠️ Moderate'], ['severe', '🔴 Severe'], ['recovery', '💚 Recovery']] as [string, string][]).map(([t, l]) => (
          <button key={t} onClick={() => setTab(t as typeof tab)} style={{
            flex: 1, padding: '10px 4px', border: 'none', borderRadius: 50,
            background: tab === t ? C.accent : C.card,
            color: tab === t ? '#fff' : C.textSec,
            fontSize: 11, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
            fontFamily: 'inherit', border: `1px solid ${tab === t ? 'transparent' : C.border}` as any,
          }}>
            {l}
          </button>
        ))}
      </div>

      <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {tab === 'moderate' && (
          <>
            <div style={{ background: C.amberDim, borderRadius: 14, padding: '14px 16px', border: `1px solid rgba(255,159,10,0.18)` }}>
              <p style={{ margin: 0, fontSize: 13, color: C.textSec, lineHeight: 1.55, fontWeight: 400 }}>
                These effects emerge with regular use. Most are reversible if you stop now.
              </p>
            </div>
            {HEALTH_MODERATE.map((item, i) => (
              <div key={i} style={{ background: C.card, borderRadius: 18, padding: '18px 20px', borderLeft: `3px solid ${C.amber}`, border: `1px solid ${C.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.amber, textTransform: 'uppercase', letterSpacing: 1 }}>{item.organ}</span>
                  <Tag label="Moderate" color={C.amber} />
                </div>
                <p style={{ margin: '0 0 7px', fontSize: 15, fontWeight: 700, color: C.text }}>{item.impact}</p>
                <p style={{ margin: 0, fontSize: 13, color: C.textSec, lineHeight: 1.55, fontWeight: 400 }}>{item.data}</p>
              </div>
            ))}
          </>
        )}
        {tab === 'severe' && (
          <>
            <div style={{ background: C.redDim, borderRadius: 14, padding: '14px 16px', border: `1px solid rgba(255,59,48,0.18)` }}>
              <p style={{ margin: 0, fontSize: 13, color: C.textSec, lineHeight: 1.55, fontWeight: 400 }}>
                These are documented outcomes in peer-reviewed medical literature. They happen to real people. The data is not hypothetical.
              </p>
            </div>
            {HEALTH_SEVERE.map((item, i) => (
              <div key={i} style={{ background: C.card, borderRadius: 18, padding: '18px 20px', border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.red}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.red, textTransform: 'uppercase', letterSpacing: 1 }}>{item.organ}</span>
                  <Tag label="Severe" color={C.red} />
                </div>
                <p style={{ margin: '0 0 7px', fontSize: 15, fontWeight: 700, color: C.text }}>{item.impact}</p>
                <p style={{ margin: 0, fontSize: 13, color: C.textSec, lineHeight: 1.55, fontWeight: 400 }}>{item.data}</p>
              </div>
            ))}
            <div style={{ background: C.card, borderRadius: 14, padding: '14px 16px', border: `1px solid ${C.border}` }}>
              <p style={{ margin: 0, fontSize: 11, color: C.textTer, lineHeight: 1.6, fontWeight: 400 }}>
                Sources: Cottrell AM et al. (2008), Morgan CJA et al. (2010), Winstock AR et al. (2012), Kalsi SS et al. (2011). Global Drug Survey, FRANK, NHS Clinical Guidelines.
              </p>
            </div>
          </>
        )}
        {tab === 'recovery' && (
          <>
            <div style={{ background: C.greenDim, borderRadius: 14, padding: '14px 16px', border: `1px solid rgba(52,199,89,0.18)` }}>
              <p style={{ margin: 0, fontSize: 13, color: C.textSec, lineHeight: 1.55, fontWeight: 400 }}>
                Your body starts recovering the moment you stop. This is what the evidence shows — for real.
              </p>
            </div>
            {RECOVERY_TIMELINE.map((item, i) => (
              <div key={i} style={{
                background: item.highlight ? C.amberDim : C.card,
                borderRadius: 18, padding: '18px 20px',
                display: 'flex', gap: 14, alignItems: 'flex-start',
                border: item.highlight ? `1px solid rgba(255,159,10,0.25)` : `1px solid ${C.border}`,
              }}>
                <span style={{ fontSize: 28, flexShrink: 0, lineHeight: 1 }}>{item.icon}</span>
                <div>
                  <p style={{ margin: '0 0 5px', fontSize: 13, fontWeight: 700, color: item.highlight ? C.amber : C.accent }}>{item.period}</p>
                  <p style={{ margin: 0, fontSize: 14, color: C.textSec, lineHeight: 1.55, fontWeight: 400 }}>{item.note}</p>
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

// ── Screen: Playbook ──────────────────────────────────────────────────
function PlaybookScreen() {
  const [expanded, setExpanded] = useState<number | null>(null)
  return (
    <div style={{ overflowY: 'auto', background: C.bg }}>
      <div style={{ padding: '32px 22px 18px' }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: C.text, margin: 0, letterSpacing: -0.5 }}>The Playbook</h2>
        <p style={{ fontSize: 14, color: C.textSec, margin: '10px 0 0', lineHeight: 1.55, fontWeight: 400 }}>
          Every dealer, every addiction, every hook — same six moves. Understanding the system is how you break it.
        </p>
      </div>
      <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {DEALER_TACTICS.map((tactic, i) => (
          <div key={i} style={{ background: C.card, borderRadius: 20, overflow: 'hidden', border: `1px solid ${C.border}` }}>
            <button onClick={() => setExpanded(expanded === i ? null : i)} style={{
              width: '100%', padding: '18px 20px', border: 'none', background: 'none',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left',
              fontFamily: 'inherit',
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 14, background: tactic.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, fontWeight: 900, color: '#fff', flexShrink: 0,
              }}>
                {tactic.number}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: C.text }}>{tactic.title}</p>
                <p style={{ margin: '3px 0 0', fontSize: 12, color: C.textSec, fontWeight: 400 }}>{tactic.subtitle}</p>
              </div>
              <span style={{ fontSize: 18, color: C.textTer, transform: expanded === i ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s', display: 'inline-block' }}>›</span>
            </button>
            {expanded === i && (
              <div style={{ padding: '0 20px 20px' }}>
                <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
                  <p style={{ margin: '0 0 14px', fontSize: 14, color: C.textSec, lineHeight: 1.65, fontWeight: 400 }}>{tactic.body}</p>
                  <div style={{ background: C.surface, borderRadius: 14, padding: '14px 16px', borderLeft: `3px solid ${C.accent}` }}>
                    <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 700, color: C.accent, textTransform: 'uppercase', letterSpacing: 1 }}>Hooked — Nir Eyal</p>
                    <p style={{ margin: 0, fontSize: 13, color: C.textSec, lineHeight: 1.6, fontWeight: 400 }}>{tactic.model}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        <div style={{ background: `rgba(0,153,212,0.08)`, borderRadius: 20, padding: 22, border: `1px solid rgba(0,153,212,0.2)` }}>
          <p style={{ margin: '0 0 10px', fontSize: 15, fontWeight: 800, color: C.accentHi }}>The counter-strategy</p>
          <p style={{ margin: 0, fontSize: 14, color: C.textSec, lineHeight: 1.65, fontWeight: 400 }}>
            Clarity uses the same Hooked model — in reverse. Your streak is the trigger. Checking in is the action. Unlocking milestones is the variable reward. Your data, savings and progress are the investment. Same system. Your goal, not theirs.
          </p>
        </div>
        <div style={{ height: 24 }} />
      </div>
    </div>
  )
}

// ── Screen: Progress ──────────────────────────────────────────────────
function ProgressScreen({ user }: { user: UserData }) {
  const cleanDays = getCleanDays(user.startDate)
  const saved = getMoneySaved(user.weeklySpend, user.startDate)
  const annual = user.weeklySpend * 52
  const unlocked = ACHIEVEMENTS.filter(a => cleanDays >= a.days || a.id === 'first-step')
  const locked = ACHIEVEMENTS.filter(a => cleanDays < a.days && a.id !== 'first-step')
  const nextMilestone = locked[0]

  return (
    <div style={{ overflowY: 'auto', background: C.bg }}>
      <div style={{ padding: '32px 22px 18px' }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: C.text, margin: 0, letterSpacing: -0.5 }}>Progress</h2>
        <p style={{ fontSize: 14, color: C.textSec, margin: '10px 0 0', fontWeight: 400 }}>Every day is data. Every day counts.</p>
      </div>
      <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ background: C.card, borderRadius: 20, padding: '20px 18px', textAlign: 'center', border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 44, fontWeight: 900, color: C.accent, letterSpacing: -2, lineHeight: 1 }}>{cleanDays}</div>
            <div style={{ fontSize: 12, color: C.textSec, marginTop: 8, fontWeight: 400 }}>days clear</div>
          </div>
          <div style={{ background: C.card, borderRadius: 20, padding: '20px 18px', textAlign: 'center', border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: saved >= 1000 ? 28 : 36, fontWeight: 900, color: C.green, letterSpacing: -1.5, lineHeight: 1 }}>{fmt(saved)}</div>
            <div style={{ fontSize: 12, color: C.textSec, marginTop: 8, fontWeight: 400 }}>saved so far</div>
          </div>
        </div>

        <div style={{ background: C.amberDim, borderRadius: 20, padding: '20px 22px', border: `1px solid rgba(255,159,10,0.2)` }}>
          <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 700, color: C.amber, textTransform: 'uppercase', letterSpacing: 1 }}>The annual stake</p>
          <p style={{ margin: '0 0 8px', fontSize: 36, fontWeight: 900, color: C.text, letterSpacing: -1 }}>{fmt(annual)}</p>
          <p style={{ margin: 0, fontSize: 13, color: C.textSec, lineHeight: 1.5, fontWeight: 400 }}>
            That's what continuing for a year costs. {annualComparison(annual)} — yours or theirs.
          </p>
        </div>

        {nextMilestone && (
          <div style={{ background: C.accentGlow, borderRadius: 20, padding: '20px 22px', border: `1px solid rgba(0,153,212,0.2)` }}>
            <p style={{ margin: '0 0 12px', fontSize: 11, fontWeight: 700, color: C.accent, textTransform: 'uppercase', letterSpacing: 1 }}>Next milestone</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 40 }}>{nextMilestone.emoji}</span>
              <div>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 800, color: C.text }}>{nextMilestone.label}</p>
                <p style={{ margin: '4px 0 0', fontSize: 13, color: C.textSec, fontWeight: 400 }}>
                  {nextMilestone.days - cleanDays} more {nextMilestone.days - cleanDays === 1 ? 'day' : 'days'} — {nextMilestone.desc}
                </p>
              </div>
            </div>
            <div style={{ marginTop: 14, height: 6, background: C.surface, borderRadius: 3, overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${Math.min(100, (cleanDays / nextMilestone.days) * 100)}%`,
                background: C.accent, borderRadius: 3,
                transition: 'width 1s cubic-bezier(0.16,1,0.3,1)',
              }} />
            </div>
          </div>
        )}

        <div>
          <p style={{ fontSize: 12, fontWeight: 700, color: C.textSec, textTransform: 'uppercase', letterSpacing: 1.2, margin: '4px 0 12px' }}>Earned</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {unlocked.map(a => (
              <div key={a.id} style={{ background: C.card, borderRadius: 16, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14, border: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 32, lineHeight: 1 }}>{a.emoji}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: C.accent }}>{a.label}</p>
                  <p style={{ margin: '3px 0 0', fontSize: 12, color: C.textSec, fontWeight: 400 }}>{a.desc}</p>
                </div>
                <div style={{ width: 24, height: 24, borderRadius: 12, background: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 800 }}>✓</div>
              </div>
            ))}
          </div>
        </div>

        {locked.length > 0 && (
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: C.textSec, textTransform: 'uppercase', letterSpacing: 1.2, margin: '4px 0 12px' }}>Coming up</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {locked.slice(0, 4).map(a => (
                <div key={a.id} style={{ background: C.card, borderRadius: 16, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14, opacity: 0.45, border: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: 32, lineHeight: 1, filter: 'grayscale(1)' }}>{a.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: C.textSec }}>{a.label}</p>
                    <p style={{ margin: '3px 0 0', fontSize: 12, color: C.textTer, fontWeight: 400 }}>{a.days - cleanDays} more {a.days - cleanDays === 1 ? 'day' : 'days'}</p>
                  </div>
                  <span style={{ fontSize: 16 }}>🔒</span>
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

// ── Main App ──────────────────────────────────────────────────────────
const DEFAULT_USER: UserData = {
  name: '', userType: '', substances: [],
  weeklySpend: 100, frequency: 'weekly', startDate: Date.now(),
}

export default function ClarityApp() {
  const [screen, setScreen] = useState<Screen>('splash')
  const [user, setUser] = useState<UserData>(DEFAULT_USER)
  const patch = useCallback((updates: Partial<UserData>) => setUser(p => ({ ...p, ...updates })), [])
  const isMainScreen = ['dashboard', 'health', 'playbook', 'progress'].includes(screen)

  const renderContent = () => {
    switch (screen) {
      case 'splash':        return <SplashScreen onStart={() => setScreen('ob-name')} />
      case 'ob-name':       return <ObName onNext={name => { patch({ name }); setScreen('ob-type') }} />
      case 'ob-type':       return <ObType name={user.name} onNext={userType => { patch({ userType }); setScreen('ob-substances') }} />
      case 'ob-substances': return <ObSubstances onNext={substances => { patch({ substances }); setScreen('ob-spend') }} />
      case 'ob-spend':      return <ObSpend onNext={weeklySpend => { patch({ weeklySpend }); setScreen('ob-frequency') }} />
      case 'ob-frequency':  return <ObFrequency onNext={frequency => { patch({ frequency, startDate: Date.now() }); setScreen('ob-complete') }} />
      case 'ob-complete':   return <ObComplete name={user.name} onDone={() => setScreen('dashboard')} />
      case 'dashboard':     return <Dashboard user={user} onNav={setScreen} />
      case 'health':        return <HealthScreen user={user} />
      case 'playbook':      return <PlaybookScreen />
      case 'progress':      return <ProgressScreen user={user} />
      default:              return null
    }
  }

  return (
    <>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        input[type=range] { -webkit-appearance: none; appearance: none; background: transparent; }
        input[type=range]::-webkit-slider-runnable-track { height: 5px; border-radius: 3px; background: rgba(255,255,255,0.1); }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 24px; height: 24px; border-radius: 50%; background: #0099D4; margin-top: -9.5px; box-shadow: 0 2px 8px rgba(0,153,212,0.5); cursor: grab; }
        * { -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { display: none; }
        ::placeholder { color: #48484A; }
      `}</style>
      <div style={{
        maxWidth: 480, margin: '0 auto',
        height: '100dvh', display: 'flex', flexDirection: 'column',
        background: C.bg, overflow: 'hidden',
        fontFamily: 'var(--font-inter), Inter, -apple-system, sans-serif',
      }}>
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          {renderContent()}
        </div>
        {isMainScreen && <BottomNav active={screen} onNav={setScreen} />}
      </div>
    </>
  )
}
