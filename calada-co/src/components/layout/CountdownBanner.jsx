import { useState, useEffect } from 'react';

try { localStorage.removeItem('calada_countdown_target'); } catch(e) {}
const TARGET = new Date('2026-07-15T00:00:00');


function pad(n) { return String(n).padStart(2, '0'); }

export default function CountdownBanner() {

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



  return (
    <div className="relative flex flex-col items-center justify-center gap-3 border-b border-[#e8b4c8] bg-[linear-gradient(135deg,#fdf0f5_0%,#fff8fb_50%,#f8f0fd_100%)] px-10 py-3 text-center sm:flex-row sm:gap-6 sm:px-8 sm:py-4">
      <div className="flex flex-col items-center">
        <span className="font-serif text-[10px] font-semibold uppercase tracking-[0.18em] text-pink-dark sm:text-[11px]">
          Grand Opening
        </span>
        <span className="font-serif text-[15px] font-semibold leading-tight text-[#2d1a24] sm:text-[17px]">
          CalAda &amp; Co is Almost Here
        </span>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        {[
          { value: time.days, label: 'Days' },
          { value: time.hours, label: 'Hrs' },
          { value: time.mins, label: 'Mins' },
          { value: time.secs, label: 'Secs' },
        ].map(({ value, label }, i) => (
          <div key={label} className="flex items-center gap-2">
            {i > 0 && <span className="hidden font-serif text-xl text-pink/50 sm:inline">:</span>}
            <div className="min-w-[48px] rounded-lg border border-[#e8b4c8] bg-white px-2.5 py-2 text-center shadow-[0_1px_4px_rgba(153,53,86,0.08)] sm:min-w-[52px] sm:px-3">
              <span className="block font-serif text-xl font-semibold leading-none text-pink sm:text-[22px]">
                {value}
              </span>
              <span className="mt-1 block text-[8px] font-semibold uppercase tracking-[0.1em] text-[#b07a90] sm:text-[9px]">
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
}