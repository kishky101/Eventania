// lib/ticketmasterApi.ts
const BASE_URL = "https://app.ticketmaster.com/discovery/v2/events.json";

export const fetchEvents = async (keyword: string, city: string = "", size = 10) => {
  const url = new URL(BASE_URL);
  url.searchParams.append("apikey", process.env.NEXT_PUBLIC_TICKETMASTER_API_KEY!);
  url.searchParams.append("keyword", keyword);
  if (city) url.searchParams.append("city", city);
  url.searchParams.append("size", size.toString());

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch events");

  const data = await res.json();
  return data._embedded?.events || [];
};
