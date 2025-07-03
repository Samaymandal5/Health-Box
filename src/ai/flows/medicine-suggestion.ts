'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting over-the-counter medicines based on a user's description of their health issues.
 *
 * - medicineSuggestion - A function that takes a description of health issues and returns suggested over-the-counter medicines.
 * - MedicineSuggestionInput - The input type for the medicineSuggestion function.
 * - MedicineSuggestionOutput - The output type for the medicineSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MedicineSuggestionInputSchema = z.object({
  healthIssueDescription: z
    .string()
    .describe("A description of the user's health issues."),
});
export type MedicineSuggestionInput = z.infer<typeof MedicineSuggestionInputSchema>;

const MedicineSuggestionOutputSchema = z.object({
  suggestedMedicines: z
    .string()
    .describe('Suggested over-the-counter medicines for the described health issues.'),
  disclaimer: z
    .string()
    .describe('A disclaimer that this is not a substitute for professional medical advice.'),
});
export type MedicineSuggestionOutput = z.infer<typeof MedicineSuggestionOutputSchema>;

export async function medicineSuggestion(input: MedicineSuggestionInput): Promise<MedicineSuggestionOutput> {
  return medicineSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'medicineSuggestionPrompt',
  input: {schema: MedicineSuggestionInputSchema},
  output: {schema: MedicineSuggestionOutputSchema},
  prompt: `You are a helpful AI assistant that suggests over-the-counter medicines based on a user's description of their health issues.

  Provide a list of suggested medicines. Include a disclaimer that this is not a substitute for professional medical advice.

  Health Issues Description: {{{healthIssueDescription}}}
  `,
});

const medicineSuggestionFlow = ai.defineFlow(
  {
    name: 'medicineSuggestionFlow',
    inputSchema: MedicineSuggestionInputSchema,
    outputSchema: MedicineSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
