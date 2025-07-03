'use server';

/**
 * @fileOverview Provides AI-driven mental health support, including strategies for managing stress, anxiety, and depression.
 *
 * - getMentalHealthSupport - A function that provides mental health support based on user input.
 * - MentalHealthSupportInput - The input type for the getMentalHealthSupport function.
 * - MentalHealthSupportOutput - The return type for the getMentalHealthSupport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MentalHealthSupportInputSchema = z.object({
  feeling: z
    .string()
    .describe(
      'The current feelings or emotions the user is experiencing. Be specific.'
    ),
  situation: z
    .string()
    .describe(
      'The situation or context contributing to these feelings. Be specific.'
    ),
  preference: z
    .string()
    .optional()
    .describe(
      'The preferred type of mental health support (e.g., meditation, healthy thinking tips).'
    ),
});
export type MentalHealthSupportInput = z.infer<typeof MentalHealthSupportInputSchema>;

const MentalHealthSupportOutputSchema = z.object({
  supportType: z.string().describe('The type of mental health support offered.'),
  suggestions: z
    .string()
    .describe('Specific suggestions or strategies for managing the user feelings.'),
});
export type MentalHealthSupportOutput = z.infer<typeof MentalHealthSupportOutputSchema>;

export async function getMentalHealthSupport(
  input: MentalHealthSupportInput
): Promise<MentalHealthSupportOutput> {
  return mentalHealthSupportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'mentalHealthSupportPrompt',
  input: {schema: MentalHealthSupportInputSchema},
  output: {schema: MentalHealthSupportOutputSchema},
  prompt: `You are a mental health support assistant.

You will provide support and strategies for managing the user's current feelings. Consider the situation they are in.

User is feeling: {{{feeling}}}
Situation: {{{situation}}}
Preferred support type: {{preference}}

Based on this information, provide appropriate and helpful suggestions.`,
});

const mentalHealthSupportFlow = ai.defineFlow(
  {
    name: 'mentalHealthSupportFlow',
    inputSchema: MentalHealthSupportInputSchema,
    outputSchema: MentalHealthSupportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
