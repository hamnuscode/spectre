'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/* ============================================================
   IntroLoader — premium one-shot intro that plays once per
   browser session (gated on sessionStorage). Animates only
   transform + opacity (plus a brief blur on the raster mark)
   so it stays GPU-friendly and smooth.

   Tweak everything here ↓
   ============================================================ */
const SEEN_KEY = 'spectre-intro-seen';

// Brand — pulled from the site's design tokens (globals.css).
const COLORS = {
  bg: 'var(--offwhite)', // site's existing light background token
  navy: 'var(--navy)',
  muted: 'var(--muted)',
};

const WORDMARK = 'Spectre';
const TAGLINE = 'Driving Real Growth';

// Timeline (seconds) — phases overlap intentionally.
const T = {
  logoIn: { start: 0.0, dur: 0.8 }, // Phase 1
  wordStart: 0.6, // Phase 2 — first letter
  letterStagger: 0.04, // 40ms apart
  letterDur: 0.55,
  lineStart: 1.2, // Phase 3
  lineDur: 0.8,
  taglineStart: 1.45,
  taglineDur: 0.55,
  exitAt: 2.0, // Phase 4 — overlay begins leaving
  exitDur: 0.6,
};

const REDUCED_FADE = 0.3; // prefers-reduced-motion: simple 300ms fade

const Z = 10050; // above navbar (z-50) and skip-link (z-[10000])

export function IntroLoader() {
  // SSR + first client render keep the overlay mounted so it is painted
  // immediately (no flash of the page before the loader). An inline script
  // in the layout hides it pre-paint when already seen this session.
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const unlock = () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.documentElement.removeAttribute('data-intro-active');
    };

    let seen = false;
    try {
      seen = !!sessionStorage.getItem(SEEN_KEY);
    } catch {
      /* storage blocked — treat as first visit */
    }

    // Already shown this session → remove instantly, restore scroll, no anim.
    if (seen) {
      setVisible(false);
      unlock();
      return;
    }

    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      /* ignore */
    }

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    setReduced(prefersReduced);

    // Lock scroll (the inline script already did this on first paint; keep it
    // authoritative here too).
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const exitAtMs = prefersReduced ? 0 : T.exitAt * 1000;
    const exitDurMs = (prefersReduced ? REDUCED_FADE : T.exitDur) * 1000;

    const t1 = window.setTimeout(() => setExiting(true), exitAtMs);
    const t2 = window.setTimeout(() => {
      setVisible(false);
      unlock();
    }, exitAtMs + exitDurMs);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (!visible) return null;

  // ---- Reduced motion: static marks, plain fade out, no movement ----
  if (reduced) {
    return (
      <motion.div
        id="spectre-intro"
        aria-hidden
        initial={{ opacity: 1 }}
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: REDUCED_FADE, ease: 'linear' }}
        style={overlayStyle}
      >
        <div style={stackStyle}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/spectre-logo.png" alt="" width={92} height={92} style={{ height: 92, width: 92 }} />
          <span style={wordmarkStyle}>{WORDMARK}</span>
          <span style={taglineStyle}>{TAGLINE}</span>
        </div>
      </motion.div>
    );
  }

  // ---- Full premium sequence ----
  return (
    <motion.div
      id="spectre-intro"
      aria-hidden
      initial={{ opacity: 1, y: 0, scale: 1 }}
      animate={
        exiting
          ? { opacity: 0, y: -24, scale: 1.02 }
          : { opacity: 1, y: 0, scale: 1 }
      }
      transition={{ duration: T.exitDur, ease: [0.16, 1, 0.3, 1] }}
      style={overlayStyle}
    >
      <div style={stackStyle}>
        {/* Phase 1 — raster mark: fade + scale 0.85→1 with blur-to-sharp */}
        <motion.img
          src="/brand/spectre-logo.png"
          alt=""
          width={92}
          height={92}
          initial={{ opacity: 0, scale: 0.85, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{
            duration: T.logoIn.dur,
            delay: T.logoIn.start,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ height: 92, width: 92, willChange: 'transform, opacity, filter' }}
        />

        {/* Phase 2 — wordmark: per-letter clip + translateY reveal */}
        <span style={wordmarkRowStyle} aria-label={WORDMARK}>
          {WORDMARK.split('').map((ch, i) => (
            <span key={i} style={letterClipStyle}>
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{
                  duration: T.letterDur,
                  delay: T.wordStart + i * T.letterStagger,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ display: 'inline-block', willChange: 'transform' }}
              >
                {ch}
              </motion.span>
            </span>
          ))}
        </span>

        {/* Phase 3 — progress line (scaleX, GPU) + tagline fade-in */}
        <div style={lineTrackStyle}>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: T.lineDur,
              delay: T.lineStart,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={lineFillStyle}
          />
        </div>
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: T.taglineDur,
            delay: T.taglineStart,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={taglineStyle}
        >
          {TAGLINE}
        </motion.span>
      </div>
    </motion.div>
  );
}

/* ---- Inline styles (kept local so the loader is self-contained) ---- */
const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: Z,
  display: 'grid',
  placeItems: 'center',
  background: COLORS.bg,
  willChange: 'transform, opacity',
};

const stackStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.25rem',
};

const wordmarkRowStyle: React.CSSProperties = {
  display: 'flex',
  fontFamily: 'var(--font-display)',
  fontWeight: 700,
  fontSize: 'clamp(2rem, 6vw, 3rem)',
  letterSpacing: '0.04em',
  color: COLORS.navy,
  lineHeight: 1.1,
};

const wordmarkStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 700,
  fontSize: 'clamp(2rem, 6vw, 3rem)',
  letterSpacing: '0.04em',
  color: COLORS.navy,
  lineHeight: 1.1,
};

const letterClipStyle: React.CSSProperties = {
  display: 'inline-block',
  overflow: 'hidden',
  // preserve spaces if the wordmark ever contains them
  whiteSpace: 'pre',
};

const lineTrackStyle: React.CSSProperties = {
  marginTop: '0.25rem',
  height: 2,
  width: 'min(220px, 56vw)',
  background: 'var(--navy-tint)',
  borderRadius: 999,
  overflow: 'hidden',
};

const lineFillStyle: React.CSSProperties = {
  height: '100%',
  width: '100%',
  background: COLORS.navy,
  transformOrigin: 'left center',
  willChange: 'transform',
};

const taglineStyle: React.CSSProperties = {
  fontSize: '0.72rem',
  textTransform: 'uppercase',
  letterSpacing: '0.28em',
  color: COLORS.muted,
  fontWeight: 500,
};
