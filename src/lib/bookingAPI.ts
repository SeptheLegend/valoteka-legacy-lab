import { BookingRequest, BookingResponse } from '@/types/booking';
import { useBookingSlots } from '@/hooks/useBookingSlots';

// A thin client-side mock of an API. We intentionally avoid network calls for MVP.
export async function postBooking(payload: BookingRequest): Promise<BookingResponse> {
  // Slight delay to simulate network
  await new Promise((r) => setTimeout(r, 600));

  // Use localStorage backed slots map (same logic as hook) to determine conflicts.
  const storageKey = 'valoteka_booked_slots_v1';
  try {
    const raw = localStorage.getItem(storageKey);
    const booked = raw ? new Set(JSON.parse(raw)) : new Set<string>();
    if (booked.has(payload.datetime)) {
      return { status: 409, message: 'Slot already taken' };
    }
    booked.add(payload.datetime);
    localStorage.setItem(storageKey, JSON.stringify(Array.from(booked.keys())));
    return { status: 201, message: 'Booked' };
  } catch (e) {
    return { status: 500, message: 'Server error' };
  }
}
