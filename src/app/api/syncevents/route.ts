// pages/api/sync-events.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { syncTicketmasterEvents } from "../../../lib/ticket-master/syncEvnents";

// app/api/search-events/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
// import { database, ref, set } from "@/lib/firebase";
import { writeData } from "@/lib/firebase/firebase.utils";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword") || "tech";
  const countryCode = searchParams.get("countryCode") || "PL";

  const TICKETMASTER_API_KEY = process.env.NEXT_PUBLIC_TICKETMASTER_API_KEY!;
  const url = `https://app.ticketmaster.com/discovery/v2/events.json`;

  try {
    const response = await axios.get(url, {
      params: {
        apikey: TICKETMASTER_API_KEY,
        keyword,
        countryCode,
        size: 20,
        sort: "date,asc",
      },
    });

    const events = response.data._embedded?.events || [];

    // Write each event to Firebase using client SDK
    for (const event of events) {
      const eventData = {
        id: event.id,
        name: event.name,
        url: event.url,
        date: event.dates?.start?.localDate,
        time: event.dates?.start?.localTime,
        venue: event._embedded?.venues?.[0]?.name || "",
        city: event._embedded?.venues?.[0]?.city?.name || "",
        country: event._embedded?.venues?.[0]?.country?.name || "",
        location: {
          latitude: event._embedded?.venues?.[0]?.location?.latitude || null,
          longitude: event._embedded?.venues?.[0]?.location?.longitude || null,
        },
        image: event.images?.[0]?.url || "",
      };

      await writeData(`events/${event.id}`, eventData);
    }

    return NextResponse.json({ synced: events.length });
  } catch (error: any) {
    console.error("Error syncing events:", error.message);
    return NextResponse.json(
      { error: "Failed to sync events" },
      { status: 500 }
    );
  }
}
