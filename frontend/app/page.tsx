import Link from "next/link";
import { events } from "@/lib/data/events";
import { EventCard } from "@/components/events/EventCard";
import { Search } from "lucide-react";

export default function HomePage() {
  const featured = events.filter((e) => e.featured);
  return (
    <>
      <section className="gradient-hero text-white pt-16 pb-12 md:pt-24 md:pb-14 relative overflow-hidden">
        <div className="container-safe relative">
          <div className="max-w-4xl space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
                Connecting the Young Single Adults of Europe
              </h1>
              <p className="text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed">
                The official calendar for YSA activities—conferences, service
                projects, and local gatherings—across the Area.
              </p>
            </div>
            <div className="w-full">
              <div className="flex flex-col gap-3">
                <div className="bg-white/10 backdrop-blur rounded-xl border border-white/20 p-2 flex flex-col md:flex-row md:items-center gap-2">
                  <div className="flex items-center gap-2 flex-1 bg-white/5 rounded-lg px-3">
                    <Search className="h-4 w-4 text-white/60" />
                    <input
                      placeholder="Search activities by stake, country, or keyword…"
                      className="w-full bg-transparent placeholder:text-white/50 text-sm focus:outline-none py-2"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap md:flex-nowrap">
                    <button className="rounded-md bg-white/10 hover:bg-white/20 px-4 py-2 text-xs font-medium tracking-wide">
                      Country ▾
                    </button>
                    <button className="rounded-md bg-white/10 hover:bg-white/20 px-4 py-2 text-xs font-medium tracking-wide">
                      Language ▾
                    </button>
                    <button className="rounded-md bg-white/10 hover:bg-white/20 px-4 py-2 text-xs font-medium tracking-wide">
                      Type ▾
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-5 text-[11px] font-medium text-white/75 pt-2">
                  <span className="inline-flex items-center gap-1">
                    Official YSA Europe resource
                  </span>
                  <span className="inline-flex items-center gap-1">
                    Language support
                  </span>
                  <span className="inline-flex items-center gap-1">
                    Safeguarding ready
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 pt-6">
                <Link
                  href="/events"
                  className="rounded-md bg-white text-rg-purple600 font-semibold px-6 py-3 text-sm shadow-sm-soft hover:bg-gray-50 focus-ring"
                >
                  Open Activity Calendar
                </Link>
                <button className="rounded-md border border-white/30 bg-white/10 backdrop-blur px-6 py-3 text-sm font-medium hover:bg-white/20 focus-ring">
                  Leader Login & Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container-safe flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold tracking-tight">
            Upcoming Area and Stake Activities
          </h2>
          <Link
            href="/events"
            className="text-sm font-medium text-rg-purple600 hover:text-rg-purple700"
          >
            View Full Calendar →
          </Link>
        </div>
        <div className="container-safe grid gap-6 md:grid-cols-3">
          {featured.map((ev) => (
            <EventCard key={ev.id} event={ev} />
          ))}
        </div>
      </section>

      <section className="py-12 bg-white border-y border-gray-200/70">
        <div className="container-safe">
          <h2 className="text-center text-xl font-bold tracking-tight mb-10">
            A Unified Tool for Leaders
          </h2>
          <div className="grid gap-6 md:grid-cols-4">
            {leaderFeatures.map((f) => (
              <div
                key={f.title}
                className="card card-hover p-5 flex flex-col gap-3"
              >
                <img
                  src="/images/placeholder.svg"
                  alt=""
                  className="w-10 h-10 rounded-md object-cover"
                />
                <h3 className="font-semibold text-gray-900">{f.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {f.text}
                </p>
                <span className="mt-auto inline-block text-[10px] uppercase tracking-wide font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                  {f.badge}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-6 justify-center mt-10 text-xs font-medium text-gray-600">
            <span>Safeguarding workflow</span>
            <span>Inclusion & accessibility guidance</span>
            <span>Knowledge & best practices</span>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-safe max-w-4xl text-center space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">
            Strengthening Faith and Fostering Unity
          </h2>
          <p className="text-gray-700 leading-relaxed">
            RisingGen exists to draw Europe’s young adults to the Savior, foster
            belonging among members, enable inspired gatherings, and sustain
            faith-building connections across borders and languages. Together,
            we rise in faith and service.
          </p>
        </div>
      </section>
    </>
  );
}

const leaderFeatures = [
  {
    title: "Guided Creation",
    text: "Create and publish activities in minutes.",
    badge: "Coming soon",
  },
  {
    title: "Accurate Registration",
    text: "Collect the right details up front.",
    badge: "Coming soon",
  },
  {
    title: "Planning Milestones",
    text: "Follow a ministry-focused checklist.",
    badge: "Coming soon",
  },
  {
    title: "Unified Event Hub",
    text: "One place to discover and manage YSA events.",
    badge: "Coming soon",
  },
];
