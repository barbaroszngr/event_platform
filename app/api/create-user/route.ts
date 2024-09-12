import { NextResponse } from 'next/server'
import { createUser } from '@/lib/actions/user.actions'
import { connectToDatabase } from '@/lib/database'

export async function POST(req: Request) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'This route is only available in development mode' }, { status: 403 })
  }

  try {
    const body = await req.json()
    await connectToDatabase()

    const newUser = await createUser(body)
    return NextResponse.json({ message: 'User created successfully', user: newUser })
  } catch (error) {
    console.error('Error in create-user route:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}