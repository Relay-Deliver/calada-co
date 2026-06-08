export default function Preloader({ visible }) {
  return (
    <div
      className={`fixed inset-0 z-[9999] grid place-items-center bg-white transition-opacity duration-500 ${visible ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      role="status"
      aria-live="polite"
      aria-hidden={!visible}
    >
      <div className="flex items-center gap-2" aria-hidden="true">
        {[0, 1, 2].map((dot) => (
          <span
            key={dot}
            className="h-3 w-3 animate-bounce rounded-full bg-pink shadow-sm"
            style={{ animationDelay: `${dot * 120}ms` }}
          />
        ))}
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
}
