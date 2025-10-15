export const metadata = { title: "Service & Impact" };

export default function ServicePage() {
  return (
    <div className="container-safe py-10 space-y-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Service & Impact</h1>
        <p className="text-gray-600 max-w-2xl">
          Live faith through meaningful service, missionary support, and shared
          reflections that uplift others.
        </p>
      </header>
      <section className="grid md:grid-cols-3 gap-6">
        {sections.map((s) => (
          <div
            key={s.title}
            className="card p-5 flex flex-col gap-3 card-hover"
          >
            <img
              src="/images/placeholder.svg"
              alt=""
              className="w-full h-28 rounded-md object-cover"
            />
            <h2 className="font-semibold text-gray-900">{s.title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{s.text}</p>
            <div className="mt-auto">
              <button className="text-sm font-medium text-rg-purple600 hover:text-rg-purple700 focus-ring">
                Details →
              </button>
            </div>
          </div>
        ))}
      </section>
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          Reflection Capture (Preview)
        </h2>
        <div className="card p-6 space-y-3">
          <p className="text-sm text-gray-700">
            Soon you will be able to share a short reflection after a project –
            strengthening discipleship and encouraging others. Moderation &
            safeguarding built in.
          </p>
          <button className="inline-flex items-center text-sm font-medium text-rg-purple600 hover:text-rg-purple700 focus-ring">
            See Sample Flow →
          </button>
        </div>
      </section>
    </div>
  );
}

const sections = [
  {
    title: "Project Directory",
    text: "Search service projects by cause, location, date, language, accessibility.",
  },
  {
    title: "Roles & Needs",
    text: "Transparent volunteer roles with remaining slot indicators and commitment flow.",
  },
  {
    title: "Reflections",
    text: "Capture spiritual insights & testimonies after serving; share with engagement feed.",
  },
  {
    title: "Templates",
    text: "Guided creation for local outreach, humanitarian support, and quick acts of kindness.",
  },
  {
    title: "Coordination",
    text: "Missionary + humanitarian contacts, travel & ride share, safety checklist.",
  },
  {
    title: "Impact Metrics",
    text: "High-level volunteer participation counters (privacy-first) – future.",
  },
];
