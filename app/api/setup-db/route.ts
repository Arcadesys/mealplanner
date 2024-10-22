import { NextResponse } from 'next/server';

import { sql } from '@vercel/postgres';

export async function GET(request: Request) {
  try {
    console.log('Starting database setup...');

    // First, create the users table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Users table created or verified');

    // Insert our default user with explicit ON CONFLICT handling
    await sql`
      INSERT INTO users (id)
      VALUES ('00000000-0000-0000-0000-000000000000'::uuid)
      ON CONFLICT (id) DO UPDATE SET id = EXCLUDED.id
      RETURNING id;
    `;
    console.log('Default user created or verified');

    // Let's verify the user exists
    const userCheck = await sql`
      SELECT id FROM users WHERE id = '00000000-0000-0000-0000-000000000000'::uuid;
    `;
    console.log('User check result:', userCheck.rows);

    // Verify the recipes table with additional fields
    await sql`
      CREATE TABLE IF NOT EXISTS recipes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        ingredients JSONB DEFAULT '[]'::jsonb,
        instructions JSONB DEFAULT '[]'::jsonb,
        prep_time INTEGER,
        cook_time INTEGER,
        servings INTEGER,
        meal_type VARCHAR(50),
        day VARCHAR(50),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Recipes table created or verified');

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
