import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const membershipType = searchParams.get('membershipType') || ''
    const isActive = searchParams.get('isActive')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.OR = [
        { user: { name: { contains: search, mode: 'insensitive' } } },
        { user: { email: { contains: search, mode: 'insensitive' } } },
        { phoneNumber: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (membershipType) {
      where.membershipType = membershipType
    }

    if (isActive !== null && isActive !== undefined) {
      where.isActive = isActive === 'true'
    }

    const [members, total] = await Promise.all([
      prisma.member.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            }
          }
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.member.count({ where })
    ])

    return NextResponse.json({
      members,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching members:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      phoneNumber,
      dateOfBirth,
      emergencyContact,
      emergencyPhone,
      address,
      membershipType = 'BASIC'
    } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { message: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Create user and member in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          role: 'MEMBER',
        }
      })

      const member = await tx.member.create({
        data: {
          userId: user.id,
          phoneNumber,
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
          emergencyContact,
          emergencyPhone,
          address,
          membershipType,
          isActive: true,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            }
          }
        }
      })

      return member
    })

    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error('Error creating member:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
} 