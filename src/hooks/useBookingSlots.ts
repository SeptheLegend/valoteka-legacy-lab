import { useCallback, useEffect, useRef, useState } from 'react';

// Simple in-memory + localStorage backed slots map. Key: ISO string.
const STORAGE_KEY = 'valoteka_booked_slots_v1';

export function useBookingSlots() {
  const ref = useRef<Map<string, boolean>>(new Map());
  const [version, setVersion] = useState(0);

  // load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const arr = JSON.parse(raw) as string[];
        ref.current = new Map(arr.map((k) => [k, true]));
        setVersion((v) => v + 1);
      }
    } catch (e) {
      // ignore parse
    }
  }, []);

  const isBooked = useCallback((iso: string) => {
    return !!ref.current.get(iso);
  }, []);

  const bookSlot = useCallback((iso: string) => {
    if (ref.current.get(iso)) return false;
    ref.current.set(iso, true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(ref.current.keys())));
    } catch (e) {
      // ignore
    }
    setVersion((v) => v + 1);
    return true;
  }, []);

  const getBooked = useCallback(() => Array.from(ref.current.keys()), []);

  return {
    isBooked,
    bookSlot,
    getBooked,
    version,
  };
}
