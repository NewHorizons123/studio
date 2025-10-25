'use server';

/**
 * @fileOverview This file defines the AI Mentor Chat flow for the ScholarMate application.
 *
 * It allows students to ask questions and receive AI-driven advice for planning their study abroad program.
 *
 * @exports {
 *   aiMentorChat,
 *   AIMentorChatInput,
 *   AIMentorChatOutput,
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIMentorChatInputSchema = z.object({
  query: z.string().describe('The query from the student.'),
});
export type AIMentorChatInput = z.infer<typeof AIMentorChatInputSchema>;

const AIMentorChatOutputSchema = z.object({
  response: z.string().describe('The AI-generated response to the student.'),
});
export type AIMentorChatOutput = z.infer<typeof AIMentorChatOutputSchema>;

export async function aiMentorChat(input: AIMentorChatInput): Promise<AIMentorChatOutput> {
  return aiMentorChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiMentorChatPrompt',
  input: {schema: AIMentorChatInputSchema},
  output: {schema: AIMentorChatOutputSchema},
  prompt: `You are ScholarMate, an AI mentor for students planning to study abroad.  You are an expert in helping students find programs, scholarships and prepare application documents such as statement of purpose documents and CVs.

  Respond to the following query from the student:
  {{query}}`,
});

const aiMentorChatFlow = ai.defineFlow(
  {
    name: 'aiMentorChatFlow',
    inputSchema: AIMentorChatInputSchema,
    outputSchema: AIMentorChatOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
