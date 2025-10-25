'use server';

/**
 * @fileOverview AI Scholarship Finder flow.
 *
 * This file defines a Genkit flow for discovering global scholarships based on a student's field and profile.
 *
 * @file AIScholarshipFinder - A function that uses AI to find relevant scholarships.
 * @file ScholarshipFinderInput - The input type for the AIScholarshipFinder function.
 * @file ScholarshipFinderOutput - The return type for the AIScholarshipFinder function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ScholarshipFinderInputSchema = z.object({
  fieldOfStudy: z
    .string()
    .describe('The student\'s field of study (e.g., Computer Science, Biology).'),
  academicLevel: z
    .string()
    .describe(
      'The student\'s current academic level (e.g., Bachelor, Master, PhD).' + 
      'Can also be post-doctoral or early professional.'
    ),
  countryOfStudy: z
    .string()
    .describe('The country where the student wants to study (e.g., USA, Canada).'),
  keywords: z
    .string()
    .optional()
    .describe(
      'Keywords to refine the scholarship search (e.g., "full tuition", "research grant").'
    ),
});

export type ScholarshipFinderInput = z.infer<typeof ScholarshipFinderInputSchema>;

const ScholarshipFinderOutputSchema = z.object({
  scholarships: z.array(
    z.object({
      title: z.string().describe('The title of the scholarship.'),
      description: z.string().describe('A brief description of the scholarship.'),
      url: z.string().url().describe('The URL to the scholarship application page.'),
      eligibility: z.string().describe('The eligibility requirements for the scholarship')
    })
  ).describe('A list of scholarships matching the student\'s profile.'),
});

export type ScholarshipFinderOutput = z.infer<typeof ScholarshipFinderOutputSchema>;

export async function AIScholarshipFinder(
  input: ScholarshipFinderInput
): Promise<ScholarshipFinderOutput> {
  return scholarshipFinderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'scholarshipFinderPrompt',
  input: {schema: ScholarshipFinderInputSchema},
  output: {schema: ScholarshipFinderOutputSchema},
  prompt: `You are an AI assistant that helps students find scholarships for studying abroad.

  Given the following information about a student, find relevant scholarships and provide a list of scholarships with their title, description, URL, and eligibility criteria.  Make sure that the URL is a valid and working URL.

  Field of Study: {{{fieldOfStudy}}}
  Academic Level: {{{academicLevel}}}
  Country of Study: {{{countryOfStudy}}}
  Keywords: {{{keywords}}}
  `,
});

const scholarshipFinderFlow = ai.defineFlow(
  {
    name: 'scholarshipFinderFlow',
    inputSchema: ScholarshipFinderInputSchema,
    outputSchema: ScholarshipFinderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
