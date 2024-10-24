import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai-edge';
import { Recipe } from '../../types/mealPlanner';
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(config);

export const runtime = 'edge';

export async function POST(req: Request) {
  return NextResponse.json("hey there bozo!");
}
