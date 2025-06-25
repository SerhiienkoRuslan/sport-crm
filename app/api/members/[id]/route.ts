import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const member = await prisma.member.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          }
        },
        bookings: {
          include: {
            class: true,
            trainer: {
              include: {
                user: {
                  select: {
                    name: true,
                  }
                }
              }
            }
          },
          orderBy: { date: 'desc' },
          take: 10
        },
        payments: {
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    })

    if (!member) {
      return NextResponse.json(
        { message: 'Member not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(member)
  } catch (error) {
    console.error('Error fetching member:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
      membershipType,
      isActive
    } = body

    // Check if member exists
    const existingMember = await prisma.member.findUnique({
      where: { id: params.id },
      include: { user: true }
    })

    if (!existingMember) {
      return NextResponse.json(
        { message: 'Member not found' },
        { status: 404 }
      )
    }

    // Update user and member in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Update user if name or email changed
      if (name || email) {
        await tx.user.update({
          where: { id: existingMember.userId },
          data: {
            ...(name && { name }),
            ...(email && { email }),
          }
        })
      }

      // Update member
      const updatedMember = await tx.member.update({
        where: { id: params.id },
        data: {
          ...(phoneNumber !== undefined && { phoneNumber }),
          ...(dateOfBirth !== undefined && { dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null }),
          ...(emergencyContact !== undefined && { emergencyContact }),
          ...(emergencyPhone !== undefined && { emergencyPhone }),
          ...(address !== undefined && { address }),
          ...(membershipType !== undefined && { membershipType }),
          ...(isActive !== undefined && { isActive }),
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

      return updatedMember
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error updating member:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if member exists
    const existingMember = await prisma.member.findUnique({
      where: { id: params.id }
    })

    if (!existingMember) {
      return NextResponse.json(
        { message: 'Member not found' },
        { status: 404 }
      )
    }

    // Delete member and user in a transaction
    await prisma.$transaction(async (tx) => {
      await tx.member.delete({
        where: { id: params.id }
      })

      await tx.user.delete({
        where: { id: existingMember.userId }
      })
    })

    return NextResponse.json(
      { message: 'Member deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting member:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
} 