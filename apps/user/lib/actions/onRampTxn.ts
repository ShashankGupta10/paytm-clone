'use server'

import { prisma } from '@repo/db/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth'
import { redirect } from 'next/navigation'
import axios from 'axios'

export const onRampTxn = async (amount: number, provider: string) => {
  const session = await getServerSession(authOptions)
  const response = await axios.post('http://localhost:3002/api/initTxn', {
    amount: amount,
    provider: provider,
    userId: session.user.id,
  })
  if (!response.data.success) {
    console.log('Invalid fields')
    return
  }
  // extract query params from url
  const url = response.data.url
  const token = url.split('/')[3]
  if (!token) throw new Error('Token not found in response')

  await prisma.onRampTransaction.create({
    data: {
      amount,
      provider,
      status: 'Processing',
      token: token,
      transactionType: 'Deposit',
      startTime: new Date(),
      user: {
        connect: {
          id: Number(session?.user?.id),
        },
      } as any,
    },
  })

  await prisma.balance.upsert({
    where: {
      userId: Number(session?.user?.id),
    },
    update: {
      locked: {
        increment: amount,
      },
    },
    create: {
      locked: amount,
      amount: 0,
      user: {
        connect: {
          id: Number(session?.user?.id),
        },
      },
    },
  })

  redirect(url)
}
