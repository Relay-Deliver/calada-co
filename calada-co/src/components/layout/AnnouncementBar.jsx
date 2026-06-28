import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ITEMS = [
  { text: 'Free shipping on orders $65+', to: '/shop' },
  { text: 'Fresh family sets just landed', to: '/collections/family-sets' },
];

function Strip() {
  return (
    <div className="flex shrink-0 items-center">
      {ITEMS.map((item) => (
        <Link
          key={item.text}
          to={item.to}
          className="flex items-center whitespace-nowrap px-8 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85 transition-colors hover:text-white"
        >
          <span>{item.text}</span>
          <span className="ml-8 text-white/35">Shop now</span>
        </Link>
      ))}
    </div>
  );
}

export default function AnnouncementBar() {
  return (
    <div className="relative z-[70] overflow-hidden bg-black select-none">
      <motion.div
        className="flex w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
      >
        <Strip />
        <Strip />
      </motion.div>
    </div>
  );
}