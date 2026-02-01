import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Demo from "./pages/Demo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

import { BookingProvider } from '@/context/booking';
import BookingModal from '@/components/sections/BookingModal';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BookingProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <BookingModal />
      </TooltipProvider>
    </BookingProvider>
  </QueryClientProvider>
);

export default App;
