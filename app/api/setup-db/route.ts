import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// Let's define our system user ID as a constant
const SYSTEM_USER_ID = '11111111-1111-1111-1111-111111111111';

export async function GET() {
  try {
    console.log('Starting database setup...');

    // Drop existing tables
    console.log('Dropping tables...');
    await sql`DROP TABLE IF EXISTS recipes CASCADE;`;
    await sql`DROP TABLE IF EXISTS users CASCADE;`;

    // Create users table
    console.log('Creating users table...');
    await sql`CREATE TABLE users (
      id UUID PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );`;

    // Create system user
    console.log('Creating system user...');
    await sql`INSERT INTO users (id) VALUES (${SYSTEM_USER_ID}::uuid);`;

    // Create recipes table
    console.log('Creating recipes table...');
    await sql`CREATE TABLE recipes (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title TEXT NOT NULL,
      description TEXT,
      ingredients TEXT[]
      instructions TEXT[],
      user_id UUID REFERENCES users(id),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );`;

    // Verify setup
    const { rows } = await sql`SELECT tablename FROM pg_tables WHERE schemaname = 'public';`;
    console.log('Current tables:', rows);

    return NextResponse.json({ 
      success: true,
      message: 'Database setup completed successfully',
      tables: rows
    });
  } catch (error) {
    console.error('Database setup error:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to setup database',
      details: error
    }, { status: 500 });
  }
}
