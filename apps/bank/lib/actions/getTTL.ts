'use server'
import { redis } from '../redis'

export const getTTL = async (token: string) => {
  const ttl = await redis.ttl(token)
  const data: { amount: number; provider: string; userId: number } | null =
    await redis.get(token)

  return {
    valid: ttl > 0,
    amount: data?.amount || 0,
    userId: data?.userId || 0,
  }
}
