import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const HeroCTAs: React.FC = () => {
  return (
    <>
      <Button
        variant="default"
        size="lg"
        className="group"
        onClick={() => {
          document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        Join Early Access
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Button>
      <Button
        variant="outline"
        size="lg"
        onClick={() => {
          document.getElementById('case-study')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        See Example
      </Button>
    </>
  );
};

export default HeroCTAs;
