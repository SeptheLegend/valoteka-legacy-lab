import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import BookingForm from './BookingForm';
import { useBooking } from '@/context/booking';

export const BookingModal: React.FC = () => {
  const { open, setOpen } = useBooking();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book a 15-Minute Demo</DialogTitle>
          <DialogDescription>
            Pick a date and time that works for you. A confirmation email will be sent to your inbox.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <BookingForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
