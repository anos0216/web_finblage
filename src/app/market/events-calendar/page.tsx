// src/app/market/events-calendar/page.tsx
import React from 'react';
import EventsCalendarTab from '@/components/marketUI/EventsCalendarTab';
import { getEventsData } from '@/lib/market-data';

export default async function EventsCalendarPage() {
  const events = await getEventsData();
  return <EventsCalendarTab {...events} />;
}