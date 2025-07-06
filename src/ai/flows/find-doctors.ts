'use server';
/**
 * @fileOverview A flow to find nearby doctors and hospitals.
 *
 * - findDoctors - A function that finds medical services based on a problem and location.
 * - FindDoctorsInput - The input type for the findDoctors function.
 * - FindDoctorsOutput - The return type for the findDoctors function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

// Define the schema for a single medical service location
const MedicalServiceSchema = z.object({
  name: z.string().describe('The name of the doctor or hospital.'),
  address: z.string().describe('The full address of the location.'),
  googleMapsUrl: z.string().url().describe('A Google Maps URL for the location.'),
});

// Define the tool for finding medical services
const findMedicalServicesTool = ai.defineTool(
  {
    name: 'findMedicalServices',
    description: 'Finds doctors and hospitals based on a search query. The query should include the medical specialty and location.',
    inputSchema: z.object({
      query: z.string().describe("The search query, e.g., 'cardiologists in Springfield, IL' or 'hospitals near Chicago, IL'"),
    }),
    outputSchema: z.array(MedicalServiceSchema),
  },
  async ({query}) => {
    // In a real application, you would use an API like the Google Places API here.
    // For this example, we'll return mock data based on the query.
    console.log(`Searching for: ${query}`);
    if (query.toLowerCase().includes('springfield')) {
      return [
        {
          name: 'Springfield General Hospital',
          address: '123 Main St, Springfield, IL 62704',
          googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Springfield+General+Hospital',
        },
        {
          name: 'Dr. John Doe, Cardiologist',
          address: '456 Oak Ave, Springfield, IL 62701',
          googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dr+John+Doe+Cardiologist+Springfield',
        },
      ];
    }
    return [
        {
            name: 'General Clinic',
            address: '789 Pine St, Anytown, USA 12345',
            googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=General+Clinic+Anytown',
        }
    ];
  }
);


const FindDoctorsInputSchema = z.object({
  problem: z.string().describe("The user's health problem or required specialty (e.g., 'heart pain', 'pediatrician')."),
  town: z.string().describe('The town or area.'),
  city: z.string().describe('The city.'),
  state: z.string().describe('The state or province.'),
});
export type FindDoctorsInput = z.infer<typeof FindDoctorsInputSchema>;

const FindDoctorsOutputSchema = z.object({
  results: z.array(MedicalServiceSchema).describe('A list of found doctors and hospitals.'),
});
export type FindDoctorsOutput = z.infer<typeof FindDoctorsOutputSchema>;

const prompt = ai.definePrompt({
    name: 'findDoctorsPrompt',
    input: { schema: FindDoctorsInputSchema },
    output: { schema: FindDoctorsOutputSchema },
    tools: [findMedicalServicesTool],
    prompt: `Based on the user's problem and location, create a search query and use the findMedicalServices tool to find relevant doctors and hospitals.

    Problem: {{{problem}}}
    Location: {{{town}}}, {{{city}}}, {{{state}}}

    Return the results from the tool.`,
});

const findDoctorsFlow = ai.defineFlow(
  {
    name: 'findDoctorsFlow',
    inputSchema: FindDoctorsInputSchema,
    outputSchema: FindDoctorsOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
        throw new Error("Could not generate a response.");
    }
    // The model should call the tool and the result will be in the output.
    // If the model doesn't use the tool, it might try to make up data, so we check.
    // However, with structured output, it should use the tool to populate `results`.
    return output;
  }
);

export async function findDoctors(input: FindDoctorsInput): Promise<FindDoctorsOutput> {
  return findDoctorsFlow(input);
}
