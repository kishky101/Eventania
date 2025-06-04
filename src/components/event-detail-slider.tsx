"use client";

import { X } from "lucide-react";
import { motion } from "framer-motion";

interface Event {
  id: string;
  name: string;
  url: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  country: string;
  image: string;
  location: { latitude: string | null; longitude: string | null };
}

export default function EventDetailSlider({
  event,
  onClose,
}: {
  event: Event;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 right-0 w-full sm:w-[480px] md:w-[600px] h-full bg-base-100 z-1000 shadow-lg overflow-y-auto"
    >
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-xl font-bold">{event.name}</h2>
        <button className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>
          <X />
        </button>
      </div>
      <div>
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-60 object-cover"
        />
        <div className="p-4 space-y-2">
          <p>
            <strong>Date:</strong> {event.date}
          </p>
          <p>
            <strong>Time:</strong> {event.time}
          </p>
          <p>
            <strong>Location:</strong> {event.venue}, {event.city},{" "}
            {event.country}
          </p>
          {event.location.latitude && (
            <iframe
              className="w-full h-60 rounded"
              loading="lazy"
              src={`https://maps.google.com/maps?q=${event.location.latitude},${event.location.longitude}&z=15&output=embed`}
            />
          )}
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full mt-4"
          >
            View on Ticketmaster
          </a>
        </div>
      </div>
    </motion.div>
  );
}
