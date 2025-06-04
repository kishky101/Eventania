import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div data-theme="luxury" className="bg-base-100 text-base-content">
      {/* Hero Section */}
      <section
        className="relative h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      >
        <div className="absolute inset-0  bg-opacity-60" />
        <div className="relative z-10 text-center px-4 max-w-2xl">
          <h1 className="text-5xl font-bold text-white mb-6">
            Welcome to Eventania
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Discover and host the world's most exciting events.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/events">
              <button className="btn btn-primary">View All Events</button>
            </Link>
            <Link href="/event-form">
              <button className="btn btn-secondary">Register an Event</button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-base-200 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">About Eventania</h2>
          <p className="text-lg text-base-content">
            Eventania is your ultimate destination for discovering, exploring,
            and creating memorable events. Whether you're a music lover, tech
            enthusiast, or community organizer, we bring people together through
            unforgettable experiences.
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-6 bg-base-100 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Watch Our Featured Event</h2>
          <div className="h-[500px] aspect-w-16 aspect-h-16">
            <iframe
              className="w-full h-full rounded-2xl shadow-lg"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube event video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        className="relative h-screen bg-cover bg-center flex flex-col items-center justify-center"
        style={{ backgroundImage: "url('/hero-bg2.png')" }}
      >
        <h2 className="text-3xl font-semibold mb-6">
          Ready to join or host your own?
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/events">
            <button className="btn btn-primary">View All Events</button>
          </Link>
          <Link href="/event-form">
            <button className="btn btn-accent">Register an Event</button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer p-10 bg-neutral text-neutral-content">
        <nav>
          <h6 className="footer-title">Links</h6>
          <Link href="/events" className="link link-hover">
            All Events
          </Link>
          <Link href="/event-form" className="link link-hover">
            Register Event
          </Link>
        </nav>
        <aside className="flex items-start justify-between w-full">
          <h3 className="text-lg font-bold">Eventania</h3>
          <p>
            Connecting people through unforgettable events.
            <br />© {new Date().getFullYear()} Eventania. All rights reserved.
          </p>
        </aside>
      </footer>
    </div>
  );
}
