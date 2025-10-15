import Link from "next/link";
import type { EventRecord } from "@/lib/data/events";
import { Calendar, MapPin, Clock } from "lucide-react";
import { TagList } from "./TagList";

export function EventCard({ event }: { event: EventRecord }) {
  const multiDay = event.endDate && event.endDate !== event.date;
  return (
    <div className="card card-hover p-4 flex flex-col gap-3">
      <img
        src="/images/placeholder.svg"
        alt="Event visual placeholder"
        className="aspect-video w-full rounded-md object-cover"
      />
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-4">
          <Link
            href={`/events/${event.id}`}
            className="font-semibold leading-tight text-gray-900 hover:text-rg-purple600 focus-ring"
          >
            {event.title}
          </Link>
          <span className="tag-accent tag whitespace-nowrap">{event.type}</span>
        </div>
        <div className="text-xs flex flex-wrap items-center gap-3 text-gray-600">
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />{" "}
            {multiDay ? `${event.date} → ${event.endDate}` : event.date}
          </span>
          {event.startTime && (
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {event.startTime}
              {event.endTime ? ` – ${event.endTime}` : ""}
            </span>
          )}
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> {event.city}
          </span>
        </div>
        <TagList event={event} compact />
      </div>
      <div>
        <p className="text-sm text-gray-700 line-clamp-3">
          {event.description}
        </p>
      </div>
      <div className="mt-auto pt-2">
        <Link
          href={`/events/${event.id}`}
          className="inline-flex items-center text-sm font-medium text-rg-purple600 hover:text-rg-purple700 focus-ring"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
