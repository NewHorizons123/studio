'use server';
/**
 * @fileOverview A professor connection AI agent.
 *
 * - professorConnect - A function that handles the professor connection process.
 * - ProfessorConnectInput - The input type for the professorConnect function.
 * - ProfessorConnectOutput - The return type for the professorConnect function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProfessorConnectInputSchema = z.object({
  studyField: z.string().describe('The student\'s field of study.'),
  countryOfInterest: z.string().describe('The country where the student wants to study.'),
  studentProfile: z.string().describe('A description of the student\'s profile, including their background and research interests.'),
});
export type ProfessorConnectInput = z.infer<typeof ProfessorConnectInputSchema>;

const ProfessorConnectOutputSchema = z.object({
  professorName: z.string().describe('The name of the professor.'),
  professorEmail: z.string().describe('The email address of the professor.'),
  university: z.string().describe('The university where the professor works.'),
  emailDraft: z.string().describe('A draft of an email to send to the professor.'),
});
export type ProfessorConnectOutput = z.infer<typeof ProfessorConnectOutputSchema>;

export async function professorConnect(input: ProfessorConnectInput): Promise<ProfessorConnectOutput> {
  return professorConnectFlow(input);
}

const prompt = ai.definePrompt({
  name: 'professorConnectPrompt',
  input: {schema: ProfessorConnectInputSchema},
  output: {schema: ProfessorConnectOutputSchema},
  prompt: `You are an AI assistant helping students connect with professors for study abroad opportunities.

Given the following information about the student and their interests, find a relevant professor and generate a personalized outreach email.

Study Field: {{{studyField}}}
Country of Interest: {{{countryOfInterest}}}
Student Profile: {{{studentProfile}}}

Respond with the professor's name, email, university, and a draft of an email to send to the professor.
`,
});

const professorConnectFlow = ai.defineFlow(
  {
    name: 'professorConnectFlow',
    inputSchema: ProfessorConnectInputSchema,
    outputSchema: ProfessorConnectOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
