import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, UsersRound, FileText, CalendarCheck2, BotMessageSquare } from 'lucide-react';
import Link from 'next/link';

const features = [
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

export default function Features() {
  return (
    <section id="features" className="py-16 sm:py-24 bg-card/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
            Everything You Need to Succeed
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            ScholarMate provides a comprehensive suite of AI-powered tools to simplify your study abroad application process.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Link href={feature.href} key={index} className="flex">
              <Card className="flex flex-col items-center text-center p-6 shadow-md hover:shadow-lg transition-shadow duration-300 w-full">
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
  );
}
