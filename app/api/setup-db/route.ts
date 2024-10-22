import { NextResponse } from 'next/server';

import { sql } from '@vercel/postgres';

// Let's define our system user ID as a constant
const SYSTEM_USER_ID = '11111111-1111-1111-1111-111111111111';

export async function GET(request: Request) {
  try {
    console.log('Starting database setup...');

    // Drop and recreate the users table (WARNING: This will delete existing users!)
    await sql`DROP TABLE IF EXISTS recipes;`; // Drop recipes first due to foreign key
    await sql`DROP TABLE IF EXISTS users;`;
    
    await sql`
      CREATE TABLE users (
        id UUID PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Users table created');

    // Insert our system user
    await sql`
      INSERT INTO users (id)
      VALUES (${SYSTEM_USER_ID}::uuid)
      RETURNING id;
    `;
    console.log('System user created');

    // Create recipes table
    await sql`
      CREATE TABLE recipes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        ingredients JSONB DEFAULT '[]'::jsonb,
        instructions JSONB DEFAULT '[]'::jsonb,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Recipes table created');

    return NextResponse.json({ 
      message: 'Database setup completed successfully' 
    });
  } catch (error) {
    console.error('Database setup error:', error);
    return NextResponse.json({ 
      error: 'Database setup failed', 
      details: error.message 
    }, { status: 500 });
  }
}
