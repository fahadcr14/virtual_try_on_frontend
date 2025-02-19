import { Button } from '@/components/ui/button';
import { GithubIcon, LinkedinIcon } from 'lucide-react';

const teamMembers = [
  {
    name: 'Sarah Chen',
    role: 'Lead AI Engineer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    linkedin: '#',
    github: '#',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Full Stack Developer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
    linkedin: '#',
    github: '#',
  },
  {
    name: 'Emily Thompson',
    role: 'UX Designer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
    linkedin: '#',
    github: '#',
  },
];

export function About() {
  return (
    <div className="flex flex-col">
      <section className="bg-gray-50 py-24">
        <div className="container">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-600">
            We're revolutionizing online shopping through advanced AI technology.
            Our mission is to make shopping more confident, enjoyable, and
            sustainable by reducing returns and enhancing the try-before-you-buy
            experience.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <h2 className="text-3xl font-bold">Our Team</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center rounded-lg border bg-white p-6 text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-32 w-32 rounded-full object-cover"
                />
                <h3 className="mt-4 text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
                <div className="mt-4 flex space-x-4">
                  <Button variant="outline" size="sm">
                    <LinkedinIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <GithubIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}