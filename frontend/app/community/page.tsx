export const metadata = { title: "Community" };

export default function CommunityPage() {
  return (
    <div className="container-safe py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Community & Connection
        </h1>
        <p className="text-gray-600 max-w-2xl">
          Find groups, share faith, learn, serve, and build uplifting
          friendships across Europe.
        </p>
      </header>
      <section className="grid md:grid-cols-3 gap-6">
        {communitySections.map((s) => (
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
                Explore →
              </button>
            </div>
          </div>
        ))}
      </section>
      <section className="space-y-4">
        <h2 className="text-sm font-semibold tracking-wide uppercase text-gray-500">
          Coming Soon
        </h2>
        <ul className="text-sm text-gray-600 list-disc pl-6 space-y-1">
          <li>Group discovery & filters</li>
          <li>Mentor & peer matching</li>
          <li>Safety & safeguarding workflows</li>
          <li>Reflection & testimony sharing</li>
        </ul>
      </section>
    </div>
  );
}

const communitySections = [
  {
    title: "Groups",
    text: "Discover faith-building and interest-based groups with language & accessibility filters.",
  },
  {
    title: "Mentoring",
    text: "Find mentors and peer support for discipleship, study, service, and life transitions.",
  },
  {
    title: "Meetups",
    text: "Coordinate small in-person or online gatherings rooted in faith and belonging.",
  },
  {
    title: "Matching",
    text: "Encouraging connections through shared interests, languages, and service goals.",
  },
  {
    title: "Accessibility & Inclusion",
    text: "Adjust preferences for language, readability, and accessibility considerations.",
  },
  {
    title: "Safeguarding",
    text: "Report a concern and access pastoral support resources in a safe, respectful space.",
  },
];
