'use server';

/**
 * @fileOverview Exercise Planner AI agent.
 *
 * - exercisePlanner - A function that handles the exercise plan generation process.
 * - ExercisePlannerInput - The input type for the exercisePlanner function.
 * - ExercisePlannerOutput - The return type for the exercisePlanner function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExercisePlannerInputSchema = z.object({
  fitnessLevel: z
    .string()
    .describe(
      'Your current fitness level (e.g., beginner, intermediate, advanced)'
    ),
  goals: z
    .string()
    .describe('Your fitness goals (e.g., weight loss, muscle gain, endurance)'),
  physicalConditions: z
    .string()
    .describe(
      'Any physical conditions or limitations you have (e.g., knee pain, back problems)'
    ),
});
export type ExercisePlannerInput = z.infer<typeof ExercisePlannerInputSchema>;

const ExercisePlannerOutputSchema = z.object({
  workoutRoutine: z
    .string()
    .describe('A customized workout routine based on your input.'),
});
export type ExercisePlannerOutput = z.infer<typeof ExercisePlannerOutputSchema>;

export async function exercisePlanner(
  input: ExercisePlannerInput
): Promise<ExercisePlannerOutput> {
  return exercisePlannerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'exercisePlannerPrompt',
  input: {schema: ExercisePlannerInputSchema},
  output: {schema: ExercisePlannerOutputSchema},
  prompt: `You are a personal trainer who specializes in creating customized workout routines. I will provide your fitness level, goals, and any physical conditions. You will create a workout routine based on that information.

Fitness Level: {{{fitnessLevel}}}
Goals: {{{goals}}}
Physical Conditions: {{{physicalConditions}}}

Workout Routine:`,
});

const exercisePlannerFlow = ai.defineFlow(
  {
    name: 'exercisePlannerFlow',
    inputSchema: ExercisePlannerInputSchema,
    outputSchema: ExercisePlannerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
