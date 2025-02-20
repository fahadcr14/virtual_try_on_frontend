import { Button } from '@/components/ui/button';
import { GithubIcon, LinkedinIcon } from 'lucide-react';

const teamMembers = [
  {
    name: 'Irfan Ahmed',
    role: 'Team Lead',
    image: 'https://media.licdn.com/dms/image/v2/D5635AQE-29Lowx2UWA/profile-framedphoto-shrink_800_800/profile-framedphoto-shrink_800_800/0/1738424461068?e=1740636000&v=beta&t=P-E8ZAYu3Xt0g-4gaY97e0fnHAOwRgajmOCWH69jFZk',
    linkedin: 'https://www.linkedin.com/in/mirfan-ahmad/',
    github: '#',
  },
  {
    name: 'Fahad Hussain',
    role: 'Ml/AI Engineer',
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQExRAhcYLting/profile-displayphoto-shrink_800_800/B4DZRjs84iHIAg-/0/1736839516464?e=1745452800&v=beta&t=ACm-LbsQ40FfzSNh_kyUq8uJTyMpB120nWaUf1BqkyU',
    linkedin: '#',
    github: '#',
  },
  {
    name: 'Azkar Hussain',
    role: 'Ml Engineer',
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQEAnoQCXkUXWA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1709188740120?e=1745452800&v=beta&t=AlYTmnh3Nl4Le0o9OO___E6ZCX1Rz55rzGBdJKDSauM',
    linkedin: 'https://www.linkedin.com/in/azkar-hussain-84259a190/',
    github: 'https://github.com/fahadcr14',
  },
 
  {
    name: 'Muzammil Tariq',
    role: 'Data Engineer',
    image: '/public/muz.jpg',
    linkedin: 'https://www.linkedin.com/in/mirfan-ahmad/',
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
          <div className="mt-12 grid gap-8 md:grid-cols-2">
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