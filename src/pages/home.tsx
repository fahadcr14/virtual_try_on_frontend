import { Hero } from '@/components/sections/hero';
import { CheckCircle2, Sparkles, Upload, Zap } from 'lucide-react';

export function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      
      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold">Core Features</h2>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-blue-100 p-4">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">AI-Powered Try-Ons</h3>
              <p className="mt-2 text-gray-600">
                Advanced AI technology that accurately shows how clothes will look on you
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-blue-100 p-4">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Real-Time Preview</h3>
              <p className="mt-2 text-gray-600">
                See instant results as you try different clothing items
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-blue-100 p-4">
                <Upload className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Easy Integration</h3>
              <p className="mt-2 text-gray-600">
                Seamlessly integrate with your existing wardrobe
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold">How It Works</h2>
          <div className="mt-16 grid gap-8 md:grid-cols-4">
            {[
              {
                step: '1',
                title: 'Upload Your Photo',
                description: 'Take or upload a photo of yourself',
              },
              {
                step: '2',
                title: 'Choose Clothing',
                description: 'Select from our catalog or upload your own items',
              },
              {
                step: '3',
                title: 'AI Processing',
                description: 'Our AI creates a realistic virtual try-on',
              },
              {
                step: '4',
                title: 'See Results',
                description: 'View and share your virtual outfit',
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold">What Our Users Say</h2>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Fashion Blogger',
                content:
                  "This virtual try-on technology has completely changed how I shop online. The accuracy is incredible!",
              },
              {
                name: 'Michael Chen',
                role: 'E-commerce Manager',
                content:
                  "We've seen a significant reduction in returns since implementing this on our store. Customers love it!",
              },
              {
                name: 'Emma Williams',
                role: 'Regular Shopper',
                content:
                  "I can now shop with confidence knowing exactly how clothes will look on me. It's like magic!",
              },
            ].map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-lg border bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  <p className="font-medium">{testimonial.name}</p>
                </div>
                <p className="mt-1 text-sm text-gray-600">{testimonial.role}</p>
                <p className="mt-4">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}