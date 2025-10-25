'use server';
/**
 * @fileOverview An AI agent for refining application documents like Statements of Purpose (SoP), CVs, and Motivation Letters.
 *
 * - refineDocument - A function that handles the document refinement process.
 * - RefineDocumentInput - The input type for the refineDocument function.
 * - RefineDocumentOutput - The return type for the refineDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RefineDocumentInputSchema = z.object({
  documentText: z
    .string()
    .describe('The text content of the document to be refined (SoP, CV, etc.).'),
  instructions: z
    .string()
    .describe(
      'Specific instructions for refining the document (e.g., improve clarity, strengthen arguments, tailor to a specific program).'      
    ),
});
export type RefineDocumentInput = z.infer<typeof RefineDocumentInputSchema>;

const RefineDocumentOutputSchema = z.object({
  refinedDocument: z
    .string()
    .describe('The refined version of the input document, incorporating the provided instructions.'),
});
export type RefineDocumentOutput = z.infer<typeof RefineDocumentOutputSchema>;

export async function refineDocument(input: RefineDocumentInput): Promise<RefineDocumentOutput> {
  return refineDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'refineDocumentPrompt',
  input: {schema: RefineDocumentInputSchema},
  output: {schema: RefineDocumentOutputSchema},
  prompt: `You are an AI assistant specializing in refining application documents for students applying to study abroad.

  A student will provide you with a document (Statement of Purpose, CV, etc.) and instructions on how to refine it.
  Your goal is to improve the document based on the instructions provided. Maintain the original style and tone of the document while implementing the requested refinements.

  Document:
  {{documentText}}

  Instructions:
  {{instructions}}`,
});

const refineDocumentFlow = ai.defineFlow(
  {
    name: 'refineDocumentFlow',
    inputSchema: RefineDocumentInputSchema,
    outputSchema: RefineDocumentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
