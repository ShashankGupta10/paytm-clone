import { prisma } from '@repo/db/db'
import { NextRequest, NextResponse } from 'next/server'

const handler = async (req: NextRequest) => {
  const { status, token, amount, secret, userId } = await req.json()
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  if (secret !== process.env.SECRET!)
    return NextResponse.json({ success: false, message: 'Invalid Secret' })
  if (status === 'success') {
    await prisma.onRampTransaction.update({
      where: { token },
      data: { status: 'Success' },
    })
    await prisma.balance.update({
      where: {
        userId: Number(userId),
      },
      data: {
        locked: {
          decrement: amount,
        },
        amount: {
          increment: amount,
        },
      },
    })
    return NextResponse.json({ success: true })
  } else {
    await prisma.onRampTransaction.update({
      where: { token },
      data: { status: 'Failure' },
    })
    await prisma.balance.update({
      where: {
        userId: Number(userId),
      },
      data: {
        locked: {
          decrement: amount,
        },
      },
    })
    return NextResponse.json({ success: true })
  }
}

export { handler as POST }
