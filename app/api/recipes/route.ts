import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';  // You'll need to set this up if you haven't

export async function GET() {
  const recipes = await prisma.recipe.findMany();
  return NextResponse.json(recipes);
}

export async function POST(request: Request) {
  const data = await request.json();
  
  const recipe = await prisma.recipe.create({
    data: {
      ...data,
      // Prisma will handle the ID for us, so we can remove the uuid generation
    }
  });
  
  return NextResponse.json(recipe);
}
