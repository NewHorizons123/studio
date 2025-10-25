'use client';

import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {
  applicationPlanner,
  type ApplicationPlannerInput,
  type ApplicationPlannerOutput,
} from '@/ai/flows/application-planner';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Loader2, CalendarCheck2, CheckSquare, Calendar as CalendarIcon} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  targetCountry: z.string().min(2, {message: 'Target country is required.'}),
  targetUniversity: z.string().min(2, {message: 'Target university is required.'}),
  programOfStudy: z.string().min(2, {message: 'Program of study is required.'}),
});

export default function ApplicationPlannerPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApplicationPlannerOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      targetCountry: '',
      targetUniversity: '',
      programOfStudy: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const response = await applicationPlanner(values as ApplicationPlannerInput);
      setResult(response);
    } catch (error) {
      console.error('Error creating application plan:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 md:p-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Application Planner</CardTitle>
          <CardDescription>
            Get personalized timelines and visa checklists for your target countries and universities.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="targetCountry"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Target Country</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., United Kingdom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetUniversity"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Target University</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., University of Oxford" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="programOfStudy"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Program of Study</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., MSc in Computer Science" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <CalendarCheck2 className="mr-2 h-4 w-4" />
                )}
                Generate Plan
              </Button>
            </form>
          </Form>

          {loading && (
            <div className="mt-8 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
              <p className="mt-2 text-muted-foreground">Generating your personalized plan...</p>
            </div>
          )}

          {result && (
            <div className="mt-8 space-y-8">
              <div>
                <h3 className="text-xl font-semibold flex items-center">
                  <CalendarIcon className="mr-2 h-5 w-5 text-primary" />
                  Application Timeline
                </h3>
                <div className="mt-4 space-y-4">
                  {result.timeline.map((item, index) => (
                     <div key={index} className="flex items-start gap-4 pl-2">
                        <div className="flex flex-col items-center">
                          <div className="w-4 h-4 rounded-full bg-primary mt-1"></div>
                          {index < result.timeline.length - 1 && <div className="w-px h-12 bg-border"></div>}
                        </div>
                        <div>
                          <p className="font-semibold">{item.month}</p>
                          <p className="text-muted-foreground text-sm">{item.task}</p>
                        </div>
                     </div>
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="text-xl font-semibold flex items-center">
                  <CheckSquare className="mr-2 h-5 w-5 text-primary" />
                  Visa Checklist
                </h3>
                <div className="mt-4 space-y-3">
                  {result.visaChecklist.map((item, index) => (
                    <Card key={index} className="bg-muted/50">
                      <CardContent className="pt-4">
                        <p className="font-semibold">{item.item}</p>
                        <p className="text-sm text-muted-foreground mt-1">{item.details}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
