import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-rg-purple700 text-gray-200">
      <div className="container-safe py-12 text-sm grid md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-semibold text-white mb-3">Navigation</h3>
          <ul className="space-y-2">
            <li><Link href="/events" className="hover:text-white">Activity Calendar</Link></li>
            <li><span className="text-gray-400">My Registrations</span></li>
            <li><span className="text-gray-400">Information for Leaders</span></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-3">Resources</h3>
          <ul className="space-y-2">
            <li><span className="text-gray-400">Help Center</span></li>
            <li><span className="text-gray-400">Submit Feedback</span></li>
            <li><span className="text-gray-400">Privacy & Stewardship</span></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-3">Church Resources</h3>
          <ul className="space-y-2">
            <li><a href="https://churchofjesuschrist.org" target="_blank" rel="noreferrer" className="hover:text-white">ChurchofJesusChrist.org</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-3">About RisingGen</h3>
          <p className="text-gray-300 leading-relaxed">The official platform for Young Single Adult activities across Europe, fostering belonging and enabling inspired gatherings.</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-xs text-center text-gray-300">© 2025 RisingGen Europe • Faithful stewardship of member information and experiences</div>
    </footer>
  );
}
