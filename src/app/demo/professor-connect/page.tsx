'use client';

import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {
  professorConnect,
  type ProfessorConnectInput,
  type ProfessorConnectOutput,
} from '@/ai/flows/professor-connect';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Loader2, UsersRound, Copy} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";


const formSchema = z.object({
  studyField: z.string().min(2, {message: 'Field of study is required.'}),
  countryOfInterest: z.string().min(2, {message: 'Country is required.'}),
  studentProfile: z.string().min(10, {message: 'Profile must be at least 10 characters.'}),
});

export default function ProfessorConnectPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProfessorConnectOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studyField: '',
      countryOfInterest: '',
      studentProfile: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const response = await professorConnect(values as ProfessorConnectInput);
      setResult(response);
    } catch (error) {
      console.error('Error connecting with professor:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard!" });
  };

  return (
    <div className="p-4 md:p-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Professor Connect</CardTitle>
          <CardDescription>
            Find relevant professors and generate personalized outreach emails.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="studyField"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Field of Study</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Artificial Intelligence" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="countryOfInterest"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Country of Interest</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Germany" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="studentProfile"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Your Profile & Research Interests</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={5}
                        placeholder="Describe your background, skills, and research interests."
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
                  <UsersRound className="mr-2 h-4 w-4" />
                )}
                Find Professor & Draft Email
              </Button>
            </form>
          </Form>

          {loading && (
            <div className="mt-8 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
              <p className="mt-2 text-muted-foreground">Searching for professors...</p>
            </div>
          )}

          {result && (
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-xl font-semibold">Professor Found</h3>
                <Card className="mt-2">
                  <CardContent className="pt-6">
                    <p><strong>Name:</strong> {result.professorName}</p>
                    <p><strong>University:</strong> {result.university}</p>
                    <p><strong>Email:</strong> {result.professorEmail}</p>
                  </CardContent>
                </Card>
              </div>
              <div>
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Generated Email Draft</h3>
                    <Button variant="ghost" size="icon" onClick={() => handleCopy(result.emailDraft)}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
                <Card className="mt-2">
                  <CardContent className="pt-6">
                    <p className="text-sm whitespace-pre-wrap">{result.emailDraft}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
