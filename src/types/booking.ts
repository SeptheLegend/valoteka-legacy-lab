export type BookingRequest = {
  firstName: string;
  email: string;
  company?: string;
  notes?: string;
  datetime: string; // ISO
  timezone?: string;
};

export type BookingResponse = {
  status: 201 | 409 | 500;
  message?: string;
};
