import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import About from '@/components/landing/about';
import Features from '@/components/landing/features';
import HowItWorks from '@/components/landing/how-it-works';
import Team from '@/components/landing/team';
import Community from '@/components/landing/community';
import Contact from '@/components/landing/contact';
import Footer from '@/components/landing/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Features />
        <HowItWorks />
        <Team />
        <Community />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
