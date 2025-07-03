'use server';

/**
 * @fileOverview An AI chat assistant that provides preliminary medical guidance and support based on user-provided symptoms.
 *
 * - aiChatAssistant - A function that handles the chat assistant process.
 * - AIChatAssistantInput - The input type for the aiChatAssistant function.
 * - AIChatAssistantOutput - The return type for the aiChatAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatAssistantInputSchema = z.object({
  symptoms: z
    .string()
    .describe('The symptoms the user is experiencing.'),
  question: z
    .string()
    .describe('The question the user has about their symptoms.'),
});
export type AIChatAssistantInput = z.infer<typeof AIChatAssistantInputSchema>;

const AIChatAssistantOutputSchema = z.object({
  response: z.string().describe('The AI chat assistant response.'),
});
export type AIChatAssistantOutput = z.infer<typeof AIChatAssistantOutputSchema>;

export async function aiChatAssistant(input: AIChatAssistantInput): Promise<AIChatAssistantOutput> {
  return aiChatAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatAssistantPrompt',
  input: {schema: AIChatAssistantInputSchema},
  output: {schema: AIChatAssistantOutputSchema},
  prompt: `You are a helpful AI chat assistant that provides preliminary medical guidance and support based on user-provided symptoms.

  Symptoms: {{{symptoms}}}
  Question: {{{question}}}

  Provide a response that is informative and helpful, but also reminds the user that this is not a substitute for professional medical advice.
  `,
});

const aiChatAssistantFlow = ai.defineFlow(
  {
    name: 'aiChatAssistantFlow',
    inputSchema: AIChatAssistantInputSchema,
    outputSchema: AIChatAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
