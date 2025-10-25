import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';

export default function Community() {
  return (
    <section id="community" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
            Open Source &amp; Community Driven
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            ScholarMate is proudly open-source. We believe in the power of community to build amazing things. Whether you're a developer, a designer, or an education enthusiast, your contributions are welcome.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                Join us on GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
