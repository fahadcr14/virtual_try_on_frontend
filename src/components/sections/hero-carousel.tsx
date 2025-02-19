import { useEffect, useState } from 'react';

const IMAGES = [
  'https://humanaigc.github.io/outfit-anyone/content/teaser/t1.gif',
  'https://humanaigc.github.io/outfit-anyone/content/teaser/t2.gif',
  'https://humanaigc.github.io/outfit-anyone/content/gifs/s1.gif',
  'https://humanaigc.github.io/outfit-anyone/content/gifs/s2.gif'
];

const TRANSITION_DELAY = 5000; // 5 seconds

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % IMAGES.length);
    }, TRANSITION_DELAY);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-lg bg-white p-4 shadow-lg">
      {IMAGES.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`Virtual Try-on Demo ${index + 1}`}
          className={`absolute left-0 top-0 h-full w-full rounded-lg object-cover transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute bottom-6 left-6 rounded-lg bg-white/90 p-4 backdrop-blur">
        <p className="text-sm font-medium text-gray-900">
          Transform your look instantly with AI-powered virtual try-on
        </p>
      </div>
    </div>
  );
}