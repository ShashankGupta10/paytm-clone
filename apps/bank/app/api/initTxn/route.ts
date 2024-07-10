import { randomUUID } from 'crypto'
import { redis } from '@/lib/redis'
import { NextRequest, NextResponse } from 'next/server'

interface Body {
  amount: number
  provider: string
  userId: number
}
const handler = async (req: NextRequest) => {
  const { amount, provider, userId }: Body = await req.json()

  if (!amount || !provider) {
    return NextResponse.json({
      success: false,
      message: 'Missing Required fields',
    })
  }

  const token = randomUUID({
    disableEntropyCache: true,
  })
  const url = `http://localhost:3002/${token}`
  await redis.set(token, JSON.stringify({ amount, provider, userId }), {
    ex: 300,
    nx: true,
  }) // 5 mins expiry
  return NextResponse.json({ success: true, url })
}

export { handler as POST }
