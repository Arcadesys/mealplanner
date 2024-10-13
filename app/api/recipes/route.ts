import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Read the JSON file
  const jsonDirectory = path.join(process.cwd(), 'data');
  const fileContents = await fs.readFile(jsonDirectory + '/dummyData.json', 'utf8');
  const dummyData = JSON.parse(fileContents);
  
  return NextResponse.json(dummyData);
}
