import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { db } from '../../../../db'
import { users } from '../../../../db/schema'

export async function POST(request) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'This endpoint is not available in production' },
      { status: 403 }
    )
  }

  const { username, name, password } = await request.json()

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const [user] = await db
    .insert(users)
    .values({
      username,
      name,
      passwordHash,
    })
    .returning()

  return NextResponse.json(user)
}