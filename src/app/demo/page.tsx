import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GraduationCap, UsersRound, FileText, BotMessageSquare, CalendarCheck2 } from 'lucide-react';
import Link from 'next/link';

const demoFeatures = [
  {
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
    title: 'AI Scholarship Finder',
    description: 'Discover global scholarships tailored to your academic field and personal profile.',
    href: '/demo/scholarship-finder',
  },
  {
    icon: <UsersRound className="h-8 w-8 text-primary" />,
    title: 'Professor Connect',
    description: 'Find relevant professors and generate personalized outreach emails to build your network.',
    href: '/demo/professor-connect',
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: 'Document Assistant',
    description: 'Let AI help you write and refine your Statements of Purpose, CVs, and Motivation Letters.',
    href: '/demo/document-assistant',
  },
    {
    icon: <CalendarCheck2 className="h-8 w-8 text-primary" />,
    title: 'Application Planner',
    description: 'Get personalized timelines and visa checklists for your target countries and universities.',
    href: '/demo/application-planner',
  },
  {
    icon: <BotMessageSquare className="h-8 w-8 text-primary" />,
    title: 'AI Mentor Chat',
    description: 'Ask anything, from "Find me cybersecurity scholarships in Finland" to "Critique my SoP".',
    href: '/demo/mentor-chat',
  },
];

export default function DemoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-headline text-lg font-semibold">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span>ScholarMate</span>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
                Explore ScholarMate Features
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Start your journey with our powerful AI tools. Click on any feature to try a live demo.
              </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {demoFeatures.map((feature, index) => (
                <Link href={feature.href} key={index}>
                  <Card className="flex flex-col items-center text-center p-6 shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
                    <CardHeader className="p-0">
                      <div className="bg-primary/10 p-4 rounded-full">
                        {feature.icon}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4 flex flex-col flex-grow">
                      <CardTitle className="font-headline text-lg font-semibold">{feature.title}</CardTitle>
                      <p className="mt-2 text-sm text-muted-foreground flex-grow">{feature.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
