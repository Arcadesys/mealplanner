import { NextResponse } from 'next/server';
import dummyData from '../../../data/dummyData.json';

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Return dummy data as if it were fetched from an API
  return NextResponse.json(dummyData);
}
