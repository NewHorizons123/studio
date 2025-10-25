'use client';

import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {
  AIScholarshipFinder,
  type ScholarshipFinderInput,
  type ScholarshipFinderOutput,
} from '@/ai/flows/ai-scholarship-finder';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Loader2, Search, ExternalLink} from 'lucide-react';

const formSchema = z.object({
  fieldOfStudy: z.string().min(2, {message: 'Field of study is required.'}),
  academicLevel: z.string().min(2, {message: 'Academic level is required.'}),
  countryOfStudy: z.string().min(2, {message: 'Country of study is required.'}),
  keywords: z.string().optional(),
});

export default function ScholarshipFinderPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScholarshipFinderOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fieldOfStudy: '',
      academicLevel: '',
      countryOfStudy: '',
      keywords: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const response = await AIScholarshipFinder(values as ScholarshipFinderInput);
      setResult(response);
    } catch (error) {
      console.error('Error finding scholarships:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 md:p-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>AI Scholarship Finder</CardTitle>
          <CardDescription>
            Discover global scholarships tailored to your academic field and
            personal profile.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fieldOfStudy"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Field of Study</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Computer Science" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="academicLevel"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Academic Level</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Bachelor, Master, PhD" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="countryOfStudy"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Country of Study</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., USA, Canada" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="keywords"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Keywords (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., full tuition, research grant"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Search className="mr-2 h-4 w-4" />
                )}
                Find Scholarships
              </Button>
            </form>
          </Form>

          {loading && (
            <div className="mt-8 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
              <p className="mt-2 text-muted-foreground">Finding scholarships...</p>
            </div>
          )}

          {result && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold">Scholarship Results</h3>
              <div className="mt-4 space-y-4">
                {result.scholarships.map((scholarship, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {scholarship.title}
                        <a
                          href={scholarship.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{scholarship.description}</p>
                      <p className="text-sm mt-2"><strong>Eligibility:</strong> {scholarship.eligibility}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
