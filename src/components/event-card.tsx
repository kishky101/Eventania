// src/components/EventCard.tsx

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
}

export default function EventCard({ event }: { event: Event }) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img
          src={event.image}
          alt={event.name}
          className="h-48 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{event.name}</h2>
        <p>
          {event.date} @ {event.time}
        </p>
        <p className="text-sm text-gray-500">
          {event.venue}, {event.city}, {event.country}
        </p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            // onClick={() => alert(`Event ID: ${event.id}`)}
          >
            View Details
          </button>
          {/* Uncomment the following line to enable the link to the event URL */}
          {/*
          View Event
            {/* <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              
            </a> */}
        </div>
      </div>
    </div>
  );
}
