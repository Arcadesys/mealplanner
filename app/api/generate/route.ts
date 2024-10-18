import { Configuration, OpenAIApi } from 'openai-edge'
import { Recipe } from '../../types/recipe'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

export const runtime = 'edge'

export default async function handler(req: Request): Promise<Response> {
  const { prompt } = await req.json()

  const response = await openai.createChatCompletion({
    model: 'gpt-4-turbo', // Updated to the latest model
    messages: [
      { role: 'system', content: 'You are a helpful assistant that generates recipes in a structured format.' },
      { role: 'user', content: prompt }
    ],
  })

  const generatedRecipes: Recipe[] = JSON.parse(response.choices[0].message.content)

  return new Response(JSON.stringify(generatedRecipes), {
    headers: { 'Content-Type': 'application/json' }
  })
}
