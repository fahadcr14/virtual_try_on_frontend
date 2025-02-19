import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';

export function Contact() {
  return (
    <div className="flex flex-col">
      <section className="bg-gray-50 py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold">Contact Us</h1>
              <p className="mt-4 text-lg text-gray-600">
                Have questions? We'd love to hear from you. Send us a message and
                we'll respond as soon as possible.
              </p>
              <div className="mt-8 space-y-6">
                <div className="flex items-center space-x-4">
                  <MapPinIcon className="h-6 w-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">Office</h3>
                    <p className="text-gray-600">123 Innovation Drive, Tech City, TC 12345</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <MailIcon className="h-6 w-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600">contact@virtualtry.on</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <PhoneIcon className="h-6 w-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-lg border bg-white p-8">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <Input id="name" type="text" className="mt-1" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Input id="email" type="email" className="mt-1" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="mt-1 block w-full rounded-md border border-gray-200 p-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}