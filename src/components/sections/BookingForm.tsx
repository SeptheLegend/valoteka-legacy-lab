import React, { useState } from 'react';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Calendar } from '@/components/ui/calendar';
import { postBooking } from '@/lib/bookingAPI';
import { useBookingSlots } from '@/hooks/useBookingSlots';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  email: z.string().email('Email is invalid'),
  company: z.string().optional(),
  notes: z.string().max(140).optional(),
  date: z.string().min(1, 'Pick a date'),
  time: z.string().min(1, 'Pick a time'),
});

export type BookingFormValues = z.infer<typeof schema>;

const TIMES = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

import { useBooking } from '@/context/booking';

export const BookingForm: React.FC = () => {
  const methods = useForm<BookingFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { firstName: '', email: '', company: '', notes: '', date: '', time: '' },
  });

  const { register, handleSubmit, control, setValue, watch, formState } = methods;
  const { errors } = formState;

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const { bookSlot, isBooked } = useBookingSlots();
  const booking = useBooking();

  const selectedDate = watch('date');
  const selectedTime = watch('time');

  const disabledDays = (date: Date) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    // disable past
    if (date < today) return true;
    // disable Sundays (0)
    if (date.getDay() === 0) return true;
    // disable > 21 days ahead
    const max = new Date();
    max.setDate(max.getDate() + 21);
    max.setHours(23,59,59,999);
    if (date > max) return true;
    return false;
  };

  const onSubmit = async (vals: BookingFormValues) => {
    setServerMessage(null);
    setLoading(true);
    try {
      // compose ISO datetime local
      const [hour, minute] = vals.time.split(':').map(Number);
      const dt = new Date(vals.date);
      dt.setHours(hour, minute, 0, 0);
      const iso = dt.toISOString();

      const res = await postBooking({
        firstName: vals.firstName,
        email: vals.email,
        company: vals.company,
        notes: vals.notes,
        datetime: iso,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });

      if (res.status === 201) {
        // reflect local booked state
        bookSlot(iso);
        setSuccess(true);
        setTimeout(() => {
          booking.closeModal();
        }, 4000);
      } else if (res.status === 409) {
        setServerMessage('That slot was just taken. Please pick another slot.');
      } else {
        setServerMessage('Sorry — we could not complete your booking. Please email hi@valoteka.com');
      }
    } catch (e) {
      setServerMessage('Unexpected error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Helper: check slot availability
  const isSlotTaken = (dateStr: string, timeStr: string) => {
    if (!dateStr || !timeStr) return false;
    const [hour, minute] = timeStr.split(':').map(Number);
    const d = new Date(dateStr);
    d.setHours(hour, minute, 0, 0);
    return isBooked(d.toISOString());
  };

  return (
    <Form {...methods}>
      {success ? (
        <Alert>
          <AlertTitle>Booked — check your email</AlertTitle>
          <AlertDescription>
            A confirmation email will be sent to you shortly. We look forward to speaking with you.
          </AlertDescription>
        </Alert>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input {...register('firstName')} aria-invalid={!!errors.firstName} />
              </FormControl>
              <FormMessage>{errors.firstName?.message as string}</FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...register('email')} type="email" aria-invalid={!!errors.email} />
              </FormControl>
              <FormMessage>{errors.email?.message as string}</FormMessage>
            </FormItem>
          </div>

          <FormItem>
            <FormLabel>Company</FormLabel>
            <FormControl>
              <Input {...register('company')} />
            </FormControl>
            <FormMessage>{errors.company?.message as string}</FormMessage>
          </FormItem>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Controller
                  control={control}
                  name="date"
                  render={({ field }) => (
                    <div>
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(d) => field.onChange(d ? d.toISOString().split('T')[0] : '')}
                        disabled={disabledDays}
                      />
                    </div>
                  )}
                />
              </FormControl>
              <FormMessage>{errors.date?.message as string}</FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Time</FormLabel>
              <FormControl>
                <select {...register('time')} className="w-full rounded-md border px-3 py-2">
                  <option value="">Select time</option>
                  {TIMES.map((t) => (
                    <option key={t} value={t} disabled={isSlotTaken(selectedDate, t)}>
                      {t} {isSlotTaken(selectedDate, t) ? ' — taken' : ''}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage>{errors.time?.message as string}</FormMessage>
            </FormItem>
          </div>

          <FormItem>
            <FormLabel>Notes (optional)</FormLabel>
            <FormControl>
              <Textarea {...register('notes')} rows={3} />
            </FormControl>
            <FormMessage>{errors.notes?.message as string}</FormMessage>
          </FormItem>

          {serverMessage && <p className="text-sm text-destructive">{serverMessage}</p>}

          <div className="flex items-center justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? 'Booking...' : 'Book Demo'}
            </Button>
          </div>
        </form>
      )}
    </Form>
  );
};

export default BookingForm;
