export const metadata = { title: "Engagement" };

export default function EngagementPage() {
  return (
    <div className="container-safe py-10 space-y-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Engagement & Uplifting Content
        </h1>
        <p className="text-gray-600 max-w-2xl">
          Official updates, inspiring stories, and meaningful feedback – unified
          and ministry-focused.
        </p>
      </header>
      <section className="grid md:grid-cols-4 gap-6">
        {panels.map((p) => (
          <div
            key={p.title}
            className="card p-5 flex flex-col gap-3 card-hover"
          >
            <img
              src="/images/placeholder.svg"
              alt=""
              className="w-full h-24 rounded-md object-cover"
            />
            <h2 className="font-semibold text-gray-900">{p.title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{p.text}</p>
            <span className="text-[10px] uppercase tracking-wide font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded self-start">
              Planned
            </span>
          </div>
        ))}
      </section>
      <section className="space-y-4">
        <h2 className="text-sm font-semibold tracking-wide uppercase text-gray-500">
          Feedback & Surveys (Preview)
        </h2>
        <div className="card p-6 space-y-3">
          <p className="text-sm text-gray-700">
            A structured survey center will allow young adults to contribute
            insights that guide ministry planning. Anonymous mode & translation
            support included.
          </p>
          <button className="inline-flex items-center text-sm font-medium text-rg-purple600 hover:text-rg-purple700 focus-ring">
            Preview Example →
          </button>
        </div>
      </section>
    </div>
  );
}

const panels = [
  {
    title: "Announcements",
    text: "Area and multi-stake announcements in a scoped, noise-controlled feed.",
  },
  {
    title: "Stories",
    text: "Inspiring faith stories and experiences, translation & readability options.",
  },
  {
    title: "Surveys & Feedback",
    text: "Participate in structured surveys to improve gatherings and discipleship support.",
  },
  {
    title: "Highlights",
    text: "Curated uplifting content spanning service, study, and community impact.",
  },
];
