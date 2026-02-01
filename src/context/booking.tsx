import React, { createContext, useContext, useState } from 'react';

type BookingContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
  openModal: () => void;
  closeModal: () => void;
};

const BookingContext = createContext<BookingContextValue | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <BookingContext.Provider value={{ open, setOpen, openModal, closeModal }}>
      {children}
    </BookingContext.Provider>
  );
};

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}
