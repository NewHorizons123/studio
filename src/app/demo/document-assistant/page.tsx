'use client';

import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {
  refineDocument,
  type RefineDocumentInput,
  type RefineDocumentOutput,
} from '@/ai/flows/document-assistant';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Textarea} from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Loader2, FileText, Wand2, Copy} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  documentText: z.string().min(20, {message: 'Document text must be at least 20 characters.'}),
  instructions: z.string().min(5, {message: 'Instructions must be at least 5 characters.'}),
});

export default function DocumentAssistantPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RefineDocumentOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documentText: '',
      instructions: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const response = await refineDocument(values as RefineDocumentInput);
      setResult(response);
    } catch (error) {
      console.error('Error refining document:', error);
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
          <CardTitle>Document Assistant</CardTitle>
          <CardDescription>
            Refine your Statements of Purpose, CVs, and Motivation Letters with AI.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="documentText"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Your Document</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={10}
                        placeholder="Paste your Statement of Purpose, CV, or other application document here."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="instructions"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Refinement Instructions</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={3}
                        placeholder="e.g., 'Make it more concise', 'Strengthen the introduction', 'Tailor it for a PhD in AI at Oxford'"
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
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Refine Document
              </Button>
            </form>
          </Form>

          {loading && (
            <div className="mt-8 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
              <p className="mt-2 text-muted-foreground">Refining your document...</p>
            </div>
          )}

          {result && (
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Refined Document</h3>
                 <Button variant="ghost" size="icon" onClick={() => handleCopy(result.refinedDocument)}>
                    <Copy className="h-4 w-4" />
                 </Button>
              </div>
              <Card className="mt-2">
                <CardContent className="pt-6">
                  <p className="text-sm whitespace-pre-wrap">{result.refinedDocument}</p>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
