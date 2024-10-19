import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai-edge';
import { Recipe } from '../../types/recipe';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(config);

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that generates recipes in a structured format.' },
        { role: 'user', content: prompt }
      ],
    });

    const content = await response.json();
    const generatedRecipes: Recipe[] = JSON.parse(content.choices[0].message.content);

    return NextResponse.json(generatedRecipes);
  } catch (error) {
    console.error('Error generating recipes:', error);
    return NextResponse.json({ error: 'Failed to generate recipes' }, { status: 500 });
  }
}
