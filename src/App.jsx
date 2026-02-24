import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import About from './components/About';
import Registration from './components/Registration';
import Footer from './components/Footer';
import { Loader2 } from 'lucide-react';

// Lazy load the Events section
const Events = lazy(() => import('./components/Events'));

function EventsLoading() {
  return (
    <div className="py-32 px-6 bg-bg-primary flex flex-col items-center justify-center min-h-[600px]">
      <div className="flex flex-col items-center gap-6 animate-pulse">
        <Loader2 className="animate-spin text-accent-primary" size={48} />
        <span className="mono text-[10px] uppercase tracking-[0.5em] text-accent-primary/50 font-black">
          Initializing Event Matrix...
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
      <Countdown />
      <About />
      <Suspense fallback={<EventsLoading />}>
        <Events />
      </Suspense>
      <Registration />
      <Footer />
    </main>
  );
}

export default App;
