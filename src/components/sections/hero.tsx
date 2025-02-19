import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HeroCarousel } from './hero-carousel';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gray-50 py-24">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Revolutionize the Way You Shop
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Experience clothes virtually before you buy. Our AI-powered technology
              lets you see exactly how garments will look on you, making online
              shopping more confident and enjoyable.
            </p>
            <div className="mt-8 flex gap-4">
              <Link to="/try-room">
                <Button size="lg" className="gap-2">
                  Try Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <HeroCarousel />
        </div>
      </div>
    </section>
  );
}