import { events } from '@/lib/data/events';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface Props { params: { id: string } }

export function generateStaticParams() {
  return events.map(e => ({ id: e.id }));
}

export const dynamicParams = false;

export default function EventDetailPage({ params }: Props) {
  const event = events.find(e => e.id === params.id);
  if (!event) return notFound();
  return (
    <div className="container-safe py-10 space-y-8">
      <nav className="text-xs text-gray-500">Home / <Link href="/events" className="text-rg-purple600 hover:text-rg-purple700">Activity Calendar</Link> / <span className="text-gray-700">{event.title}</span></nav>
      <header className="space-y-4">
        <h1 className="text-3xl font-bold leading-tight tracking-tight">{event.title}</h1>
        <p className="text-gray-600 max-w-2xl">{event.description}</p>
        <div className="flex flex-wrap gap-2">
          {event.languages.map(l => <span key={l} className="tag text-[11px] font-semibold">{l}</span>)}
          {event.accessibility.wheelchair && <span className="tag text-[11px]">🦽 Wheelchair</span>}
          {event.accessibility.captions && <span className="tag text-[11px]">CC Captions</span>}
          <span className="tag text-[11px] font-semibold">{event.costType}</span>
        </div>
      </header>
      <section className="grid md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2 space-y-6">
          <article className="card p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">Overview</h2>
            <ul className="text-sm list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Stake:</strong> {event.stake}</li>
              <li><strong>Location:</strong> {event.city}, {event.country}</li>
              <li><strong>Date:</strong> {event.date}{event.endDate ? ` – ${event.endDate}` : ''}</li>
              {event.startTime && <li><strong>Time:</strong> {event.startTime}{event.endTime ? ` – ${event.endTime}` : ''}</li>}
              <li><strong>Type:</strong> {event.type}</li>
            </ul>
          </article>
          <article className="card p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">Purpose & Ministry Outcomes</h2>
            <p className="text-sm text-gray-700 leading-relaxed">This activity strengthens discipleship and belonging by gathering young adults for shared worship, service, learning, and connection. It aligns with the RisingGen pillars of Unity, Community, and Impact while honoring safeguarding and inclusion standards.</p>
          </article>
        </div>
        <aside className="space-y-6">
          <div className="card p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">Register / Interest</h2>
            <button className="w-full rounded-md bg-rg-purple600 text-white font-semibold text-sm px-4 py-2 shadow-sm-soft hover:bg-rg-purple700 focus-ring">Register Interest</button>
            <div className="text-xs text-gray-500 leading-relaxed">Full registration coming soon. Your expression of interest helps organizers plan with accurate numbers and accessibility needs.</div>
          </div>
          <div className="card p-6 space-y-3">
            <h2 className="font-semibold text-gray-900">Languages</h2>
            <p className="text-sm text-gray-700">{event.languages.join(', ')}. More translation and caption support is continually expanding.</p>
          </div>
        </aside>
      </section>
    </div>
  );
}
