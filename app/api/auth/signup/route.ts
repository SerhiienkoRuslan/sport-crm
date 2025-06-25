import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      }
    })

    // Create role-specific profile
    if (role === 'MEMBER') {
      await prisma.member.create({
        data: {
          userId: user.id,
          membershipType: 'BASIC',
          isActive: true,
        }
      })
    } else if (role === 'TRAINER') {
      await prisma.trainer.create({
        data: {
          userId: user.id,
          isActive: true,
        }
      })
    } else if (role === 'ADMIN') {
      await prisma.admin.create({
        data: {
          userId: user.id,
          role: 'ADMIN',
        }
      })
    }

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
} 