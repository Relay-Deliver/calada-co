import { useState } from 'react';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* Chat panel */}
      {open && (
        <div className="w-[320px] rounded-2xl bg-white shadow-2xl border border-[#eeeeee] overflow-hidden">
          {/* Header */}
          <div className="bg-navy px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/assets/calada-logo.png"
                alt="CalAda & Co."
                style={{ height: 32, width: 'auto' }}
              />
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
                <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="px-5 py-6 bg-[#fdf4f7]">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#c084a0] flex items-center justify-center shrink-0">
                <svg width="14" height="14" fill="white" viewBox="0 0 24 24">
                  <path d="M20 21v-1.8a4.2 4.2 0 0 0-4.2-4.2H8.2A4.2 4.2 0 0 0 4 19.2V21" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                  <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="1.8" fill="none"/>
                </svg>
              </div>
              <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm text-sm text-[#333333] leading-6 max-w-[220px]">
                Hi! Welcome to CalAda &amp; Co. How can we help you today?
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-[#eeeeee] bg-white flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 text-sm outline-none text-[#333333] placeholder-[#aaaaaa]"
              disabled
            />
            <button
              className="w-8 h-8 rounded-full bg-[#c084a0] flex items-center justify-center shrink-0 opacity-50 cursor-not-allowed"
              disabled
              aria-label="Send"
            >
              <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="22" y1="2" x2="11" y2="13" strokeLinecap="round" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" fill="white" stroke="none" />
              </svg>
            </button>
          </div>

          {/* Coming soon banner */}
          <div className="bg-[#fdf4f7] border-t border-[#f0d6e4] px-4 py-2.5 text-center">
            <p className="text-[11px] text-[#c084a0] font-medium">Live chat coming soon</p>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-14 h-14 rounded-full bg-navy shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
        aria-label="Chat with us"
      >
        {open ? (
          <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
            <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="22" height="22" fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

    </div>
  );
}
