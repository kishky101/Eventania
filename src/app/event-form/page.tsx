"use client";

import { useState } from "react";
import { push, ref, set } from "firebase/database";
import { db } from "@/lib/firebase/firebase.config"; // make sure to export initialized `db` here

interface EventFormData {
  name: string;
  description: string;
  city: string;
  country: string;
  date: string;
  time: string;
  venue: string;
  latitude: string;
  longitude: string;
  image: string;
  url: string;
}

export default function EventForm() {
  const [formData, setFormData] = useState<EventFormData>({
    name: "",
    description: "",
    city: "",
    country: "",
    date: "",
    time: "",
    venue: "",
    latitude: "",
    longitude: "",
    image: "",
    url: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const eventRef = push(ref(db, "events"));
      await set(eventRef, {
        ...formData,
        location: {
          latitude: formData.latitude || null,
          longitude: formData.longitude || null,
        },
        id: eventRef.key,
      });

      setSuccessMsg("Event registered successfully!");
      setFormData({
        name: "",
        description: "",
        city: "",
        country: "",
        date: "",
        time: "",
        venue: "",
        latitude: "",
        longitude: "",
        image: "",
        url: "",
      });
    } catch (err) {
      console.error("Error registering event:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      //   data-theme="luxury"
      className="max-w-2xl mx-auto p-6 rounded-xl shadow-md "
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        Register a New Event
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        {[
          ["name", "Event Name"],
          ["description", "Description"],
          ["city", "City"],
          ["country", "Country"],
          ["date", "Date", "date"],
          ["time", "Time", "time"],
          ["venue", "Venue"],
          ["latitude", "Latitude (optional)"],
          ["longitude", "Longitude (optional)"],
          ["image", "Image URL"],
          ["url", "External URL (optional)"],
        ].map(([key, label, type = "text"]) => (
          <div key={key}>
            {key === "description" ? (
              <textarea
                name={key}
                value={(formData as any)[key]}
                onChange={handleChange}
                placeholder={label}
                className="w-full border px-3 py-2 rounded"
                required={
                  !["latitude", "longitude", "url"].includes(key as string)
                }
              />
            ) : (
              <input
                type={type}
                name={key}
                value={(formData as any)[key]}
                onChange={handleChange}
                placeholder={label}
                className="w-full border px-3 py-2 rounded"
                required={
                  key !== "latitude" && key !== "longitude" && key !== "url"
                }
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Event"}
        </button>

        {successMsg && <p className="text-green-600">{successMsg}</p>}
      </form>
    </div>
  );
}
