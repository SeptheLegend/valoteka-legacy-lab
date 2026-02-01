import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useBooking } from '@/context/booking';

export const HeroCTAs: React.FC = () => {
  const booking = useBooking();

  return (
    <>
      <Button variant="hero" size="xl" className="group" onClick={() => booking.openModal()}>
        Book free demo
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Button>
      <Button variant="hero-secondary" size="xl">
        <Sparkles className="w-5 h-5" />
        Watch Demo
      </Button>
    </>
  );
};

export default HeroCTAs;
