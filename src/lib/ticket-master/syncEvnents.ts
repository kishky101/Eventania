// lib/syncEvents.ts
import { fetchEvents } from "./fetchApi";
import { pushData } from "../firebase/firebase.utils";

export const syncTicketmasterEvents = async (
  keyword: string,
  city?: string
) => {
  try {
    const events = await fetchEvents(keyword, city);

    const promises = events.map((event: any) => {
      const imageUrl = event.images?.[0]?.url ?? ""; // get first image if available

      const eventData = {
        id: event.id,
        name: event.name,
        url: event.url,
        imageUrl, // ✅ added image URL
        date: event.dates?.start?.localDate,
        time: event.dates?.start?.localTime,
        venue: event._embedded?.venues?.[0]?.name,
        city: event._embedded?.venues?.[0]?.city?.name,
        country: event._embedded?.venues?.[0]?.country?.name,
        lat: event._embedded?.venues?.[0]?.location?.latitude,
        lng: event._embedded?.venues?.[0]?.location?.longitude,
      };
      return pushData("events", eventData);
    });

    await Promise.all(promises);
    return { success: true };
  } catch (error) {
    console.error("Error syncing events:", error);
    return { success: false, error };
  }
};
