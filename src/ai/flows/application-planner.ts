'use server';
/**
 * @fileOverview An AI agent for creating personalized application timelines and visa checklists.
 *
 * - applicationPlanner - A function that handles the application planning process.
 * - ApplicationPlannerInput - The input type for the applicationPlanner function.
 * - ApplicationPlannerOutput - The return type for the applicationPlanner function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ApplicationPlannerInputSchema = z.object({
  targetCountry: z.string().describe("The student's target country of study."),
  targetUniversity: z.string().describe("The student's target university."),
  programOfStudy: z.string().describe("The student's program of study."),
});
export type ApplicationPlannerInput = z.infer<typeof ApplicationPlannerInputSchema>;

const ApplicationPlannerOutputSchema = z.object({
  timeline: z.array(
    z.object({
      month: z.string().describe('The month for the task (e.g., "January 2025").'),
      task: z.string().describe('A key task or milestone for that month.'),
    })
  ).describe('A list of tasks and milestones for the application timeline.'),
  visaChecklist: z.array(
     z.object({
      item: z.string().describe('A required document or step for the visa application.'),
      details: z.string().describe('Brief details or notes about the checklist item.'),
    })
  ).describe('A checklist of required documents and steps for the visa application process.'),
});
export type ApplicationPlannerOutput = z.infer<typeof ApplicationPlannerOutputSchema>;

export async function applicationPlanner(input: ApplicationPlannerInput): Promise<ApplicationPlannerOutput> {
  return applicationPlannerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'applicationPlannerPrompt',
  input: {schema: ApplicationPlannerInputSchema},
  output: {schema: ApplicationPlannerOutputSchema},
  prompt: `You are an AI assistant that helps students create a personalized timeline and visa checklist for their study abroad application.

Given the following information, generate a concise, month-by-month application timeline and a detailed visa checklist. The timeline should start 12 months before the typical intake for the given country and program.

Target Country: {{{targetCountry}}}
Target University: {{{targetUniversity}}}
Program of Study: {{{programOfStudy}}}

Respond with a timeline and a visa checklist.
`,
});

const applicationPlannerFlow = ai.defineFlow(
  {
    name: 'applicationPlannerFlow',
    inputSchema: ApplicationPlannerInputSchema,
    outputSchema: ApplicationPlannerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
