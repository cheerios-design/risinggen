import { events } from "@/lib/data/events";
import { EventCard } from "@/components/events/EventCard";
import { Suspense } from "react";
import Link from "next/link";

export const metadata = {
  title: "Activity Calendar",
};

export default function EventsPage() {
  return (
    <div className="container-safe py-10 space-y-10">
      <header className="space-y-2">
        <nav className="text-xs text-gray-500 mb-1">
          Home / <span className="text-gray-700">Activity Calendar</span>
        </nav>
        <h1 className="text-2xl font-bold tracking-tight">Activity Calendar</h1>
        <p className="text-gray-600 max-w-2xl text-sm">
          Official YSA activities across Europe.
        </p>
      </header>

      <CalendarSearch />

      <FeaturedStrip />

      <Suspense fallback={<p>Loading events…</p>}>
        <EventList />
      </Suspense>
    </div>
  );
}

function CalendarSearch() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        <input
          placeholder="Search by stake, country, or keyword…"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus-ring shadow-sm"
        />
        <div className="flex gap-2 flex-wrap">
          <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 focus-ring">
            Filters
          </button>
          <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 focus-ring">
            Save
          </button>
          <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 focus-ring">
            Share
          </button>
          <div className="hidden sm:flex rounded-md border border-gray-300 bg-white overflow-hidden">
            <button className="px-3 py-2 text-xs font-semibold bg-gray-100">
              Month
            </button>
            <button className="px-3 py-2 text-xs font-semibold">List</button>
          </div>
        </div>
        <div className="flex gap-2 ml-auto">
          <button className="hidden md:inline-flex rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 focus-ring">
            Comfortable
          </button>
          <button className="hidden md:inline-flex rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 focus-ring">
            Compact
          </button>
        </div>
      </div>
      <div className="text-xs text-gray-500">{events.length} activities</div>
    </div>
  );
}

function FeaturedStrip() {
  const featured = events.filter((e) => e.featured);
  if (!featured.length) return null;
  return (
    <div className="card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-sm tracking-wide text-gray-700">
          Featured Area Events
        </h2>
        <Link href="/events" className="text-xs font-medium text-rg-purple600">
          See all Area events →
        </Link>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {featured.map((ev) => (
          <EventCard key={ev.id} event={ev} />
        ))}
      </div>
    </div>
  );
}

function EventList() {
  // Group events by month
  const byMonth = events.reduce<Record<string, typeof events>>((acc, ev) => {
    const month = new Date(ev.date).toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
    (acc[month] ||= []).push(ev);
    return acc;
  }, {});
  const monthKeys = Object.keys(byMonth).sort(
    (a, b) =>
      new Date(byMonth[a][0].date).getTime() -
      new Date(byMonth[b][0].date).getTime()
  );

  return (
    <div className="space-y-10">
      {monthKeys.map((month) => (
        <div key={month} className="space-y-6">
          <h2 className="font-semibold text-sm tracking-wide uppercase text-gray-500">
            {month}
          </h2>
          <div className="grid gap-6">
            {byMonth[month].map((ev) => (
              <div key={ev.id} className="card p-4 flex items-center gap-6">
                <img
                  src="/images/placeholder.svg"
                  alt=""
                  className="hidden sm:block w-20 h-20 rounded-md object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-semibold text-gray-900 text-base">
                      {ev.title}
                    </h3>
                    <span className="tag-outline tag text-[11px] font-semibold">
                      {ev.type}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-gray-600 flex flex-wrap gap-3">
                    <span>
                      {new Date(ev.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </span>
                    {ev.startTime && (
                      <span>
                        {ev.startTime}
                        {ev.endTime ? ` – ${ev.endTime}` : ""}
                      </span>
                    )}
                    <span>
                      {ev.stake}, {ev.city}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                    {ev.description}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <div className="flex flex-wrap gap-1 justify-end">
                    {ev.languages.map((l) => (
                      <span
                        key={l}
                        className="tag text-[10px] tracking-wide font-semibold"
                      >
                        {l}
                      </span>
                    ))}
                  </div>
                  <button className="rounded-md bg-rg-purple600 text-white text-xs font-semibold px-4 py-2 shadow-sm-soft hover:bg-rg-purple700 focus-ring">
                    View Details
                  </button>
                  <div className="flex items-center gap-4 text-gray-400">
                    <button
                      aria-label="Favorite"
                      className="hover:text-gray-600"
                    >
                      ☆
                    </button>
                    <button aria-label="Share" className="hover:text-gray-600">
                      ↗
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
