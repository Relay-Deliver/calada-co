import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GRAND_OPENING   = new Date('2026-07-01T00:00:00');
const STORAGE_KEY     = 'calada_launch_entered';
const CONFETTI_COLORS = ['#D4537E','#c084a0','#1A2744','#f0c8d8','#ffffff','#ffd700'];

function calcTimeLeft(target) {
  const diff = target - Date.now();
  if (diff <= 0) return null;
  return {
    days:    Math.floor(diff / 864e5),
    hours:   Math.floor((diff % 864e5) / 36e5),
    minutes: Math.floor((diff % 36e5)  / 6e4),
    seconds: Math.floor((diff % 6e4)   / 1e3),
  };
}

function useCountdown(target) {
  const [t, setT] = useState(() => calcTimeLeft(target));
  useEffect(() => {
    const id = setInterval(() => setT(calcTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

// ready prop: wait for preloader to finish before showing the gate
export default function LaunchGate({ children, ready = true }) {
  const [show, setShow] = useState(() => {
    // Never show if grand opening has already passed
    if (Date.now() >= GRAND_OPENING.getTime()) return false;
    const stored = localStorage.getItem(STORAGE_KEY);
    // Show once per 24 hours so returning visitors still see the countdown
    if (!stored) return true;
    return Date.now() - parseInt(stored, 10) > 86_400_000;
  });

  const [entering, setEntering] = useState(false);
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const countdown = useCountdown(GRAND_OPENING);

  const fireConfetti = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    if (animRef.current) cancelAnimationFrame(animRef.current);

    const cx = canvas.width  / 2;
    const cy = canvas.height / 2;

    // 200 pieces radiating from center in all 360°
    const pieces = Array.from({ length: 200 }, (_, i) => {
      const angle = (i / 200) * Math.PI * 2 + (Math.random() - 0.5) * 0.35;
      const speed = Math.random() * 14 + 5;
      return {
        x: cx, y: cy,
        w: Math.random() * 11 + 4,
        h: Math.random() * 6  + 3,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        rot: Math.random() * Math.PI * 2,
        rv:  (Math.random() - 0.5) * 0.18,
        vx:  Math.cos(angle) * speed,
        vy:  Math.sin(angle) * speed,
        g:   0.28,
        alpha: 1,
      };
    });

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      pieces.forEach(p => {
        p.vy += p.g;
        p.x  += p.vx; p.y += p.vy; p.rot += p.rv;
        if (frame > 55) p.alpha = Math.max(0, p.alpha - 0.018);
        if (p.alpha > 0) alive = true;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      frame++;
      if (alive && frame < 160) animRef.current = requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    draw();
  }, []);

  const handleEnter = () => {
    if (entering) return;
    setEntering(true);
    fireConfetti();
    setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
      setShow(false);
    }, 950);
  };

  return (
    <>
      {/* Full app renders behind the gate — backdrop-filter blurs it */}
      {children}

      <AnimatePresence>
        {/* ready: preloader done. show: gate not yet passed. */}
        {ready && show && (
          <motion.div
            key="launch-gate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            style={{
              position: 'fixed', inset: 0, zIndex: 9998,
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              backgroundColor: 'rgba(26,39,68,0.78)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '20px',
            }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 28 }}
              animate={{ scale: 1,    opacity: 1, y: 0  }}
              exit={{    scale: 0.82, opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.34, 1.26, 0.64, 1] }}
              style={{
                background: 'rgba(255,253,251,0.98)',
                borderRadius: '24px',
                padding: 'clamp(32px,5vw,48px) clamp(24px,5vw,40px)',
                maxWidth: '460px',
                width: '100%',
                textAlign: 'center',
              }}
            >
              {/* Logo */}
              <img
                src="/assets/cal.png"
                alt="CalAda & Co."
                style={{
                  height: '52px', maxWidth: '200px',
                  objectFit: 'contain',
                  margin: '0 auto 22px', display: 'block',
                }}
              />

              {/* Eyebrow */}
              <p style={{
                fontSize: '10px', fontWeight: 800, letterSpacing: '0.22em',
                color: '#c084a0', textTransform: 'uppercase', margin: '0 0 10px',
              }}>
                Grand Opening · July 1, 2026
              </p>

              {/* Headline */}
              <h2 style={{
                fontSize: 'clamp(20px,4vw,26px)', fontWeight: 600,
                color: '#1A2744', margin: '0 0 12px',
                fontFamily: 'Georgia,serif', lineHeight: 1.25,
              }}>
                CalAda & Co is Almost Here
              </h2>

              <p style={{
                fontSize: '14px', color: '#6b7280',
                margin: '0 0 32px', lineHeight: 1.7,
              }}>
                A boutique made with love for mothers, families & little ones.
                Launching soon — feel free to look around!
              </p>

              {/* Countdown */}
              {countdown ? (
                <div style={{
                  display: 'flex', gap: '10px',
                  justifyContent: 'center', margin: '0 0 36px',
                }}>
                  {[
                    { label: 'Days', value: countdown.days    },
                    { label: 'Hrs',  value: countdown.hours   },
                    { label: 'Mins', value: countdown.minutes },
                    { label: 'Secs', value: countdown.seconds },
                  ].map(({ label, value }) => (
                    <div key={label} style={{
                      background: '#1A2744', borderRadius: '12px',
                      padding: '14px 8px', flex: 1, minWidth: 0,
                    }}>
                      <motion.p
                        key={value}
                        initial={{ y: -6, opacity: 0 }}
                        animate={{ y:  0, opacity: 1 }}
                        transition={{ duration: 0.18 }}
                        style={{
                          fontSize: 'clamp(18px,4vw,28px)',
                          fontWeight: 700, color: '#ffffff',
                          margin: 0, lineHeight: 1,
                          fontVariantNumeric: 'tabular-nums',
                        }}
                      >
                        {String(value).padStart(2, '0')}
                      </motion.p>
                      <p style={{
                        fontSize: '9px', color: '#c084a0',
                        margin: '5px 0 0', letterSpacing: '0.12em',
                        textTransform: 'uppercase', fontWeight: 600,
                      }}>
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{
                  fontSize: '18px', fontWeight: 600,
                  color: '#c084a0', margin: '0 0 36px',
                }}>
                  We're live! Welcome to CalAda & Co!
                </p>
              )}

              {/* CTA */}
              <motion.button
                whileHover={!entering ? { scale: 1.03 } : {}}
                whileTap={!entering  ? { scale: 0.97 } : {}}
                onClick={handleEnter}
                disabled={entering}
                style={{
                  width: '100%', padding: '16px 24px',
                  background: entering ? '#22c55e' : '#c084a0',
                  color: 'white', border: 'none', borderRadius: '12px',
                  fontSize: '14px', fontWeight: 700,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  cursor: entering ? 'default' : 'pointer',
                  transition: 'background 0.3s',
                }}
              >
                {entering ? '✓ Welcome to CalAda & Co!' : "Let's Go →"}
              </motion.button>

              <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '14px' }}>
                Browse while we prepare for launch
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti canvas — above everything including the gate overlay */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed', inset: 0,
          zIndex: 9999, pointerEvents: 'none',
        }}
      />
    </>
  );
}