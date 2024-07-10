'use server'

import { prisma } from '@repo/db/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth'
import { randomUUID } from 'crypto'

export const sendMoney = async (contact: string, amount: number) => {
  const session = await getServerSession(authOptions)

  const user = await prisma.user.findFirst({
    where: {
      number: contact,
    },
  })

  if (!user) {
    return { success: false, message: 'Recipient not found' }
  }

  const result = await prisma.$transaction(async (prisma) => {
    const senderBalance = await prisma.balance.findUnique({
      where: {
        userId: Number(session.user.id),
      },
      select: {
        amount: true,
      },
    })

    if (!senderBalance || senderBalance.amount < amount) {
      return { success: false, message: 'Insufficient balance' }
    }

    await prisma.onRampTransaction.create({
      data: {
        amount,
        provider: 'internal',
        status: 'Success',
        token: randomUUID(),
        transactionType: 'Withdraw',
        startTime: new Date(),
        user: {
          connect: {
            id: Number(session.user.id),
          },
        },
      },
    })

    await prisma.balance.update({
      where: {
        userId: Number(session.user.id),
      },
      data: {
        amount: {
          decrement: amount,
        },
      },
    })

    await prisma.balance.upsert({
      where: {
        userId: user.id,
      },
      update: {
        amount: {
          increment: amount,
        },
      },
      create: {
        amount: amount,
        locked: 0,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    })

    return { success: true }
  })

  return result
}
