import { useState, useEffect } from 'react';

const TARGET = new Date();
TARGET.setDate(TARGET.getDate() + 30);

function pad(n) { return String(n).padStart(2, '0'); }

export default function CountdownBanner() {
  const [visible, setVisible] = useState(true);
  const [time, setTime] = useState({ days: '30', hours: '00', mins: '00', secs: '00' });

  useEffect(() => {
    function tick() {
      const diff = Math.max(0, TARGET - new Date());
      setTime({
        days: pad(Math.floor(diff / 86400000)),
        hours: pad(Math.floor((diff % 86400000) / 3600000)),
        mins: pad(Math.floor((diff % 3600000) / 60000)),
        secs: pad(Math.floor((diff % 60000) / 1000)),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: 'relative',
      background: 'linear-gradient(135deg, #fdf0f5 0%, #fff8fb 50%, #f8f0fd 100%)',
      borderBottom: '1px solid #e8b4c8',
      padding: '1rem 2rem',
      fontFamily: "'Jost', sans-serif",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.5rem',
      flexWrap: 'wrap',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{
          fontFamily: 'Georgia, serif',
          fontSize: '11px',
          fontWeight: '500',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#993556',
          marginBottom: '2px',
        }}>✿ Grand Opening</span>
        <span style={{
          fontFamily: 'Georgia, serif',
          fontSize: '17px',
          fontWeight: '600',
          color: '#2d1a24',
        }}>CalAda & Co is Almost Here</span>
      </div>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {[
          { value: time.days, label: 'Days' },
          { value: time.hours, label: 'Hrs' },
          { value: time.mins, label: 'Mins' },
          { value: time.secs, label: 'Secs' },
        ].map(({ value, label }, i) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {i > 0 && <span style={{ color: '#d4537e', fontSize: '20px', fontFamily: 'Georgia, serif', opacity: 0.5 }}>:</span>}
            <div style={{
              textAlign: 'center',
              background: 'white',
              border: '1px solid #e8b4c8',
              borderRadius: '10px',
              padding: '8px 12px',
              minWidth: '52px',
              boxShadow: '0 1px 4px rgba(153,53,86,0.08)',
            }}>
              <span style={{
                fontFamily: 'Georgia, serif',
                fontSize: '22px',
                fontWeight: '600',
                color: '#d4537e',
                display: 'block',
                lineHeight: 1,
                marginBottom: '2px',
              }}>{value}</span>
              <span style={{
                fontSize: '9px',
                fontWeight: '500',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#b07a90',
              }}>{label}</span>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setVisible(false)}
        aria-label="Close banner"
        style={{
          position: 'absolute',
          right: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(153,53,86,0.1)',
          border: 'none',
          borderRadius: '50%',
          width: '28px',
          height: '28px',
          cursor: 'pointer',
          color: '#993556',
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          lineHeight: 1,
        }}
      >✕</button>
    </div>
  );
}