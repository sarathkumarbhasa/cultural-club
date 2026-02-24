import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { Loader2 } from 'lucide-react';

// Aggressive Lazy Loading for all non-hero sections
const Countdown = lazy(() => import('./components/Countdown'));
const About = lazy(() => import('./components/About'));
const Events = lazy(() => import('./components/Events'));
const Registration = lazy(() => import('./components/Registration'));
const Footer = lazy(() => import('./components/Footer'));

function SectionLoading({ message = "Loading Component..." }) {
  return (
    <div className="py-20 md:py-32 px-4 md:px-6 bg-bg-primary flex flex-col items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-6">
        <Loader2 className="animate-spin text-accent-primary" size={32} />
        <span className="mono text-[9px] uppercase tracking-[0.4em] text-accent-primary/40 font-black">
          {message}
        </span>
      </div>
    </div>
  );
}

function App() {
  return (
    <main className="bg-bg-primary min-h-screen">
      <Navbar />
      <Hero />

      <Suspense fallback={<SectionLoading message="Syncing Timeline..." />}>
        <Countdown />
      </Suspense>

      <Suspense fallback={<SectionLoading message="Archiving Data..." />}>
        <About />
      </Suspense>

      <Suspense fallback={<SectionLoading message="Initializing Matrix..." />}>
        <Events />
      </Suspense>

      <Suspense fallback={<SectionLoading message="Accessing Node..." />}>
        <Registration />
      </Suspense>

      <Suspense fallback={<div className="h-20 bg-bg-primary" />}>
        <Footer />
      </Suspense>
    </main>
  );
}

export default App;
