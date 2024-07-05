import { randomUUID } from 'crypto'
import { redis } from '@/app/lib/redis'
import { NextRequest, NextResponse } from 'next/server'

interface Body {
  amount: number
  provider: string
}
const handler = async (req: NextRequest) => {
  const { amount, provider }: Body = await req.json()

  if (!amount || !provider) {
    return NextResponse.json({
      success: false,
      message: 'Missing Required fields',
    })
  }

  const token = randomUUID({
    disableEntropyCache: true,
  })
  const url = `http://localhost:3005?token=${token}`
  await redis.set(token, JSON.stringify({ amount, provider }), {
    ex: 30000,
    nx: true,
  }) // 5 mins expiry
  return NextResponse.json({ success: true, url })
}

export { handler as POST }
