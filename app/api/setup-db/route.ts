import { NextResponse } from 'next/server';

import { sql } from '@vercel/postgres';

// Let's define our system user ID as a constant
const SYSTEM_USER_ID = '11111111-1111-1111-1111-111111111111';

export async function GET(request: Request) {
  try {
    console.log('Starting database setup...');

    // Drop existing tables
    console.log('Dropping existing tables...');
    await sql`DROP TABLE IF EXISTS recipes;`;  // Drop recipes FIRST
    await sql`DROP TABLE IF EXISTS users;`;    // Then drop users

    // Create users table
    console.log('Creating users table...');
    await sql`
      CREATE TABLE users (
        id UUID PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Insert system user with explicit logging
    console.log('Attempting to create system user...');
    const systemUserResult = await sql`
      INSERT INTO users (id)
      VALUES (${SYSTEM_USER_ID}::uuid)
      RETURNING *;
    `;
    console.log('System user creation result:', systemUserResult.rows[0]);

    // Verify system user exists
    const verifyUser = await sql`
      SELECT * FROM users WHERE id = ${SYSTEM_USER_ID}::uuid;
    `;
    console.log('System user verification:', verifyUser.rows[0]);

    // Create recipes table
    console.log('Creating recipes table...');
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

    return NextResponse.json({ 
      message: 'Database setup completed successfully',
      systemUser: verifyUser.rows[0]
    });
  } catch (error) {
    console.error('Database setup error:', {
      message: error.message,
      code: error.code,
      detail: error.detail,
      hint: error.hint
    });
    return NextResponse.json({ 
      error: 'Database setup failed', 
      details: error.message 
    }, { status: 500 });
  }
}
