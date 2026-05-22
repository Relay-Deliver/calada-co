import { useState } from 'react';
import './AnnouncementBar.css';

const messages = [
  '✦ free shipping on orders over $65 ✦',
  '✦ made with love, just for you ✦',
  '✦ new arrivals every week ✦',
];

export default function AnnouncementBar() {
  const [idx, setIdx] = useState(0);
  return (
    <div className="ann-bar">
      <button className="ann-arrow" onClick={() => setIdx((idx - 1 + messages.length) % messages.length)}>‹</button>
      <span>{messages[idx]}</span>
      <button className="ann-arrow" onClick={() => setIdx((idx + 1) % messages.length)}>›</button>
    </div>
  );
}
