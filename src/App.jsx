import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Registration from './components/Registration';
import Footer from './components/Footer';

function App() {
  return (
    <main className="bg-bg-primary min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Events />
      <Registration />
      <Footer />
    </main>
  );
}

export default App;
