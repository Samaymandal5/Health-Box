'use server';

/**
 * @fileOverview Generates a personalized diet plan based on user input.
 *
 * - aiDietPlanner - A function that generates a diet plan.
 * - AiDietPlannerInput - The input type for the aiDietPlanner function.
 * - AiDietPlannerOutput - The return type for the aiDietPlanner function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiDietPlannerInputSchema = z.object({
  allergies: z.string().describe('Any allergies the user has, comma separated.'),
  height: z.number().describe('The user\'s height in centimeters.'),
  weight: z.number().describe('The user\'s weight in kilograms.'),
  preferences: z
    .string()
    .optional()
    .describe('Any dietary preferences or restrictions the user has.'),
});
export type AiDietPlannerInput = z.infer<typeof AiDietPlannerInputSchema>;

const AiDietPlannerOutputSchema = z.object({
  dietPlan: z.string().describe('A personalized diet plan for the user.'),
});
export type AiDietPlannerOutput = z.infer<typeof AiDietPlannerOutputSchema>;

export async function aiDietPlanner(input: AiDietPlannerInput): Promise<AiDietPlannerOutput> {
  return aiDietPlannerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiDietPlannerPrompt',
  input: {schema: AiDietPlannerInputSchema},
  output: {schema: AiDietPlannerOutputSchema},
  prompt: `You are a nutritionist who creates personalized diet plans for users based on their individual needs and preferences.\n\n  Consider the user's allergies, height, and weight when creating the diet plan. The diet plan should be easy to follow and include a variety of healthy foods.\n\n  Generate the diet plan and include any specific instructions or recommendations for the user.\n\n  Allergies: {{{allergies}}}\n  Height (cm): {{{height}}}\n  Weight (kg): {{{weight}}}\n  Preferences: {{{preferences}}}`,
});

const aiDietPlannerFlow = ai.defineFlow(
  {
    name: 'aiDietPlannerFlow',
    inputSchema: AiDietPlannerInputSchema,
    outputSchema: AiDietPlannerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
