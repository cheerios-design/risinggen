export type EventType = 'Conference' | 'Service Project' | 'Social' | 'Institute Class' | 'Temple Trip' | 'Multi-Stake' | 'Ward Activity';
export type EventCostType = 'Free' | 'Donation' | 'Cost';

export interface EventRecord {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date for start
  endDate?: string; // optional multi-day
  startTime?: string; // HH:MM
  endTime?: string;
  stake: string;
  country: string;
  city: string;
  languages: string[];
  type: EventType;
  tags: string[];
  accessibility: { captions?: boolean; wheelchair?: boolean };
  costType: EventCostType;
  featured?: boolean;
  image?: string;
  registrationOpen?: boolean;
}

export const events: EventRecord[] = [
  {
    id: 'area-ysa-conference-2025',
    title: 'Area YSA Conference 2025',
    description: 'Annual multi-day conference uniting YSA across Europe in worship, service, and connection.',
    date: '2025-03-15',
    endDate: '2025-03-17',
    startTime: '09:00',
    endTime: '18:00',
    stake: 'Paris France Stake',
    country: 'France',
    city: 'Paris',
    languages: ['EN','FR'],
    type: 'Conference',
    tags: ['Conference'],
    accessibility: { wheelchair: true, captions: true },
    costType: 'Cost',
    featured: true,
    image: '/images/sample/event1.jpg'
  },
  {
    id: 'community-service-day-munich',
    title: 'Community Service Day',
    description: 'Serving together to bless local communities and build unity.',
    date: '2025-02-28',
    startTime: '14:00',
    endTime: '17:00',
    stake: 'Munich Germany Stake',
    country: 'Germany',
    city: 'Munich',
    languages: ['EN','DE'],
    type: 'Service Project',
    tags: ['Service'],
    accessibility: { wheelchair: true, captions: false },
    costType: 'Free',
    featured: true,
    image: '/images/sample/event2.jpg'
  },
  {
    id: 'multi-stake-social-evening-barcelona',
    title: 'Multi-Stake Social Evening',
    description: 'Cross-stake gathering for connection, games, music, and uplifting conversation.',
    date: '2025-03-08',
    startTime: '18:00',
    endTime: '22:00',
    stake: 'Barcelona Spain Stake',
    country: 'Spain',
    city: 'Barcelona',
    languages: ['EN','ES'],
    type: 'Social',
    tags: ['Multi-Stake'],
    accessibility: { wheelchair: true },
    costType: 'Donation',
    featured: true,
    image: '/images/sample/event3.jpg'
  },
  {
    id: 'institute-class-book-of-mormon-amsterdam',
    title: 'Institute Class: Book of Mormon',
    description: 'Weekly institute class focused on applying teachings to daily discipleship.',
    date: '2025-02-22',
    startTime: '19:00',
    endTime: '20:30',
    stake: 'Amsterdam Netherlands Stake',
    country: 'Netherlands',
    city: 'Amsterdam',
    languages: ['EN','NL'],
    type: 'Institute Class',
    tags: ['Institute Class'],
    accessibility: { captions: true },
    costType: 'Free',
    featured: false,
    image: '/images/sample/event4.jpg'
  },
  {
    id: 'temple-trip-bern',
    title: 'Temple Trip to Bern',
    description: 'Group visit to the temple focused on service and spiritual renewal.',
    date: '2025-03-14',
    startTime: '08:00',
    endTime: '19:00',
    stake: 'Multiple Stakes, Bern Switzerland',
    country: 'Switzerland',
    city: 'Bern',
    languages: ['EN','DE','FR','IT'],
    type: 'Temple Trip',
    tags: ['Temple Trip'],
    accessibility: { wheelchair: true },
    costType: 'Cost',
    featured: false,
    image: '/images/sample/event5.jpg'
  },
  {
    id: 'stake-activity-sports-day-rome',
    title: 'Stake Activity: Sports Day',
    description: 'Friendly sports competitions and inclusive physical activities.',
    date: '2025-03-01',
    startTime: '10:00',
    endTime: '16:00',
    stake: 'Rome Italy Stake',
    country: 'Italy',
    city: 'Rome',
    languages: ['EN','IT'],
    type: 'Ward Activity',
    tags: ['Ward Activity'],
    accessibility: {},
    costType: 'Free',
    featured: false,
    image: '/images/sample/event6.jpg'
  }
];

// Distinct helper (basic + safe for scalar fields or arrays)
export function distinct<K extends keyof EventRecord>(key: K) {
  const values: any[] = [];
  for (const ev of events) {
    const v: any = ev[key];
    if (Array.isArray(v)) {
      for (const item of v) values.push(item);
    } else if (v != null) {
      values.push(v);
    }
  }
  return Array.from(new Set(values));
}
