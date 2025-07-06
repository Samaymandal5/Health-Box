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
    // For this example, we'll generate dynamic mock data based on the query.
    console.log(`Generating mock data for query: ${query}`);

    // Basic parsing of the query to extract specialty and location.
    const queryParts = query.toLowerCase().split(' in ');
    const specialty = queryParts[0] || 'Medical'; // e.g., 'cardiologists'
    const location = queryParts[1] || 'Anytown, USA'; // e.g., 'springfield, il'

    const capitalize = (s: string) => s.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
    const specialtyCapitalized = capitalize(specialty);
    const locationCapitalized = capitalize(location.split(',')[0]);

    const mockResults = [
      {
        name: `${locationCapitalized} General Hospital`,
        address: `100 Health St, ${locationCapitalized}`,
        googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${locationCapitalized} General Hospital`)}`,
      },
      {
        name: `Dr. Evelyn Reed, ${specialtyCapitalized}`,
        address: `200 Wellness Way, ${locationCapitalized}`,
        googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Dr. Evelyn Reed, ${specialtyCapitalized}, ${locationCapitalized}`)}`,
      },
      {
        name: `The ${specialtyCapitalized} Clinic of ${locationCapitalized}`,
        address: `300 Care Blvd, ${locationCapitalized}`,
        googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`The ${specialtyCapitalized} Clinic of ${locationCapitalized}`)}`,
      }
    ];

    // Return a subset of the results to make it look more realistic.
    const numResults = Math.floor(Math.random() * 2) + 2; // Return 2 or 3 results
    return mockResults.slice(0, numResults);
  }
);


const FindDoctorsInputSchema = z.object({
  problem: z.string().describe("The user's health problem or required specialty (e.g., 'heart pain', 'pediatrician')."),
  town: z.string().describe('The town or area.'),
  city: z.string().describe('The city.'),
  state: z.string().describe('The state or province.'),
});
type FindDoctorsInput = z.infer<typeof FindDoctorsInputSchema>;

const FindDoctorsOutputSchema = z.object({
  results: z.array(MedicalServiceSchema).describe('A list of found doctors and hospitals.'),
});
type FindDoctorsOutput = z.infer<typeof FindDoctorsOutputSchema>;

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
