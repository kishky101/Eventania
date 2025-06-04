"use client";

import { useEffect, useState } from "react";
import { ref, onValue, query, orderByChild } from "firebase/database";
import { db } from "../../lib/firebase/firebase.config";
import EventCard from "@/components/event-card";
import EventDetailSlider from "@/components/event-detail-slider";
import EventMap from "@/components/event-map";

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

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [limit, setLimit] = useState(6);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  useEffect(() => {
    const eventsRef = query(ref(db, "events"), orderByChild("date"));

    const unsubscribe = onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.values(data) as Event[];
        setEvents(list);
        setFilteredEvents(list);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleFilter = () => {
    const filtered = events.filter(
      (e) =>
        e.name.toLowerCase().includes(search.toLowerCase()) &&
        (city ? e.city.toLowerCase().includes(city.toLowerCase()) : true)
    );
    setFilteredEvents(filtered);
    setLimit(6);
  };

  return (
    <section className="p-4 lg:p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">All Events</h1>
      <div className="flex justify-end mb-4">
        <button
          className={`btn btn-sm mr-2 ${
            viewMode === "list" ? "btn-primary" : "btn-ghost"
          }`}
          onClick={() => setViewMode("list")}
        >
          List View
        </button>
        <button
          className={`btn btn-sm ${
            viewMode === "map" ? "btn-primary" : "btn-ghost"
          }`}
          onClick={() => setViewMode("map")}
        >
          Map View
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name"
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by city"
          className="input input-bordered w-full"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleFilter}>
          Apply Filters
        </button>
      </div>

      {/* Events Grid */}
      {
        loading ? (
          <p className="text-center">Loading events...</p>
        ) : filteredEvents.length === 0 ? (
          <p className="text-center text-gray-500">No events found</p>
        ) : viewMode === "list" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.slice(0, limit).map((event) => (
              <div key={event.id} onClick={() => setSelectedEvent(event)}>
                <EventCard event={event} />
              </div>
            ))}
          </div>
        ) : (
          <EventMap
            events={filteredEvents}
            onEventSelect={(event) => setSelectedEvent(event as Event)}
          />
        // <></>
        )

        // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        //   {filteredEvents.slice(0, limit).map((event) => (
        //     <div key={event.id} onClick={() => setSelectedEvent(event)}>
        //       <EventCard event={event} />
        //     </div>
        //   ))}
        // </div>
      }

      {/* Load More */}
      {filteredEvents.length > limit && (
        <div className="flex justify-center mt-6">
          <button
            className="btn btn-outline"
            onClick={() => setLimit((l) => l + 6)}
          >
            Load More
          </button>
        </div>
      )}

      {/* Slider Panel */}
      {selectedEvent && (
        <EventDetailSlider
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </section>
  );
}
