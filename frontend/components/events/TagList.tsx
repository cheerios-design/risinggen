import type { EventRecord } from '@/lib/data/events';
import { Accessibility, Languages } from 'lucide-react';

export function TagList({ event, compact = false }: { event: EventRecord; compact?: boolean }) {
  const tags: string[] = [];
  tags.push(...event.languages.map(l => l.toUpperCase()));
  if (event.accessibility.wheelchair) tags.push('🦽 Wheelchair');
  if (event.accessibility.captions) tags.push('CC Captions');
  tags.push(event.costType);

  return (
    <div className={`flex flex-wrap gap-1 ${compact ? 'mt-1' : 'mt-2'}`}>
      {tags.map(t => (
        <span key={t} className="tag text-[10px] tracking-wide uppercase font-semibold">
          {t}
        </span>
      ))}
    </div>
  );
}
