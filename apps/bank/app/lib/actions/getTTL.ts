'use server'
import { redis } from '../redis'

export const getTTL = async (token: string) => {
  const ttl = await redis.ttl(token)
  const amount: { amount: number; provider: string; userId: number } | null =
    await redis.get(token)

  return {
    valid: ttl > 0,
    amount: amount?.amount || 0,
    userId: amount?.userId || 0,
  }
}
