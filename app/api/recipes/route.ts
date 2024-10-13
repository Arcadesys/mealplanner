import { NextResponse } from 'next/server';
import dummyData from '../../../../data/dummyData.json';

export async function GET(request: Request) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return NextResponse.json(dummyData);
}
